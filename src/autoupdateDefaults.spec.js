import {expect} from 'chai'
import FakeXMLHTTPRequests from 'fakexmlhttprequest'
import autoupdateDefaults, {initAutoupdateDefaults} from './autoupdateDefaults'

var requests = []
global.XMLHttpRequest = function () {
	var r = new FakeXMLHTTPRequests(arguments)
	requests.push(r)
	return r
}

describe('autoupdateDefaults, ' + new Date(), () => {
	beforeEach(() => {
		requests = []
	})

	it('test if post defaults works', () => {
		initAutoupdateDefaults({
			postUri:'/core/service/defaults.php?resource=unittest&component=unittest'
		})
		autoupdateDefaults('unittest',{unittest:'unittest'})
		expect(requests.length).to.equal(1)
		expect(requests[0].requestBody).to.equal('{"unittest":{"unittest":"unittest"}}')
	})
	it('test if post defaults is off', () => {
		initAutoupdateDefaults({
			postUri:''
		})
		autoupdateDefaults('unittest',{unittest:'unittest'})
		expect(requests.length).to.equal(0)
	})
	it('test if post defaults is off', () => {
		initAutoupdateDefaults({
			postUri:null
		})
		autoupdateDefaults('unittest',{unittest:'unittest'})
		expect(requests.length).to.equal(0)
	})
})
