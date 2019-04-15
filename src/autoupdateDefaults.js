import post from 'pubcore-http'

var	newDefaults = {},
	config = {
		postUri: ''
	}

var postDefaults = () => post(config.postUri, newDefaults).then(() => newDefaults = {})

export const initAutoupdateDefaults = c => {
	config = {...config, ...c}
}

export default (key,spec) => {
	if (typeof config.postUri==='string' && config.postUri.length > 0) {
		newDefaults[key] = spec
		postDefaults()
	}
}
