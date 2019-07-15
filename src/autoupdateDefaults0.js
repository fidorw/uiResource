import post from 'pubcore-http'

var	newDefaults,
	config = {
		postUri: ''
	}

typeof newDefaults === 'undefined' && (newDefaults = {})

var postDefaults = () => post(config.postUri, newDefaults[config.postUri]).then(() => newDefaults[config.postUri] = {})

export const initAutoupdateDefaults = c => {
	config = {...config, ...c}
}

export default (key,spec) => {
	if (typeof config.postUri==='string' && config.postUri.length > 0) {
		typeof newDefaults[config.postUri] === 'undefined' && (newDefaults[config.postUri] = {}) 
		newDefaults[config.postUri][key] = spec
		postDefaults()
	}
}
