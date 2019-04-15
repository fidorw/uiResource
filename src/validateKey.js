import equal from 'deep-equal'
import validateKey from './validateKey'
import autoupdateDefaults from './autoupdateDefaults'

var config = {
	autoupdateUri: '',
	defaults: undefined
}

export const initDefaults = (defaults) => config.defaults = defaults

export const getValue = ({R, key, def, isDev}) => {
	var vckd = validateKey({R, key, def, isDev})
	return vckd.value
}

export default ({R, key, def, isDev}) => {
	if (typeof R !== 'object') R = {}
	if (typeof key === 'number') key = key.toString()
	if (typeof key !== 'string') key = ''

	var value = R[key]

	if (typeof config.defaults !== 'object') {
		return {value, R, key, def}
	}

	if (key && typeof config.defaults[key] === 'undefined') {
		if (typeof def !== 'undefined') config.defaults[key] = def
		else if (typeof R[key] !== 'undefined') config.defaults[key] = R[key]
		isDev && typeof config.defaults[key] !== 'undefined' && autoupdateDefaults(key,config.defaults[key])
	}

	if (isDev) {
		if (typeof config.defaults[key] === 'undefined') throw 'ERROR_NO_DEFAULT_DEFINED for '+key
		if (typeof def !== 'undefined' && ! equal(config.defaults[key],def)) throw 'ERROR_DEFAULT_CONFLICT in '+key
	}

	return {value, R, key, def:config.defaults[key]}
}
