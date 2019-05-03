import {expect} from 'chai'
import uiResource, {initEnvIsDev,envIsDev,initDefaults,initAutoupdateDefaults,validateKey} from './uiResource'

describe('uiResource, ' + new Date(), () => {
	it('get valid configuration object {a:1}', () => {
		expect(uiResource({a:{a:1}},'a')).to.deep.equal({a:1})
	})
	it('get valid configuration object {b:2}', () => {
		initEnvIsDev(true)
		expect(uiResource({b:{b:2}},'b')).to.deep.equal({b:2})
	})
	it('get valid configuration object {c:3}', () => {
		expect(uiResource({c:{c:3}},'c',{c:3})).to.deep.equal({c:3})
	})
	it('get valid configuration object {d:4}', () => {
		initAutoupdateDefaults({postUri:'someuri'})
		expect(uiResource({d:{d:4}},'d',{d:4})).to.deep.equal({d:4})
	})
	it('get valid configuration string {e:5}', () => {
		initDefaults({e:'{e:5}'})
		initAutoupdateDefaults({postUri:'someuri'})
		expect(uiResource({e:'{e:5}'},'e','{e:5}')).to.deep.equal('{e:5}')
	})
	it('throw ERROR_R_IS_NOT_AN_OBJECT', () => {
		expect(()=>uiResource('string','key')).to.throw('ERROR_R_IS_NOT_AN_OBJECT')
	})
	it('throw ERROR_KEY_IS_NOT_A_STRING', () => {
		expect(()=>uiResource({},3)).to.throw('ERROR_KEY_IS_NOT_A_STRING')
	})
	it('get valid configuration object {f:6}', () => {
		initEnvIsDev(false)
		expect(uiResource({f:{f:6}},'f',{g:7})).to.deep.equal({f:6})
	})
	it('get undefined configuration object {h:8}', () => {
		initEnvIsDev(true)
		initAutoupdateDefaults({postUri:'some'})
		expect(uiResource({},'h',{h:8})).to.deep.equal(undefined)
	})
	it('get undefined configuration object {h:8}', () => {
		initEnvIsDev(false)
		initAutoupdateDefaults({postUri:''})
		expect(uiResource({},'h',{h:8})).to.deep.equal(undefined)
	})
	it('envIsDev true', () => {
		initEnvIsDev(true)
		expect(envIsDev()).to.be.true
	})

	//validateKey
	it('get undefined configuration', () => {
		initDefaults(undefined)
		expect(validateKey({R:{},key:'a'})).to.deep.equal({value:undefined,R:{},key:'a',def:undefined})
	})
	it('get object {b:2}, because default is set', () => {
		initDefaults(undefined)
		expect(validateKey({R:{},key:'b',def:{b:2}})).to.deep.equal({value:undefined,R:{},key:'b',def:{b:2}})
	})
	it('get object {c:3} default is different', () => {
		initDefaults(undefined)
		expect(validateKey({R:{c:{c:3}},key:'c',def:{d:4}})).to.deep.equal({value:{c:3},R:{c:{c:3}},key:'c',def:{d:4}})
	})
	it('get default object {e:5} even if wrong resource, because it works in production mode', () => {
		initDefaults(undefined)
		expect(validateKey({R:'wrong',key:'e',def:{e:5}})).to.deep.equal({value:undefined,R:{},key:'e',def:{e:5}})
	})
	it('get default object {e:5} even if wrong resource, because it works in production mode', () => {
		initDefaults({})
		expect(validateKey({R:{},key:'f',def:{f:6}})).to.deep.equal({value:undefined,R:{},key:'f',def:{f:6}})
	})
	it('get default object {e:5} even if wrong resource, because it works in production mode', () => {
		initDefaults({})
		expect(validateKey({R:{},key:'f',def:{f:6},isDev:true})).to.deep.equal({value:undefined,R:{},key:'f',def:{f:6}})
	})
	it('throw exception in DEV mode', () => {
		initDefaults({f:{f:7}})
		expect(() => validateKey({R:{},key:'f',def:{f:6},isDev:true})).to.throw('ERROR_DEFAULT_CONFLICT in f')
	})
	it('throw exception in DEV mode', () => {
		initDefaults({})
		expect(() => validateKey({R:{},key:'f',isDev:true})).to.throw('ERROR_NO_DEFAULT_DEFINED for f')
	})
	it('if key is integer and production mode is active then value should string one and def too' , () => {
		initDefaults({})
		expect(validateKey({R:{1:'one'},key:1})).to.deep.equal({value:'one',R:{1:'one'},key:'1',def:'one'})
	})
	it('if key is integer and production mode is active then value should string one and def too' , () => {
		initDefaults({})
		expect(validateKey({R:{},key:{'object':'is not allowed'}})).to.deep.equal({value:undefined,R:{},key:'',def:undefined})
	})
})
