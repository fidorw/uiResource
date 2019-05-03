import {getValue} from './validateKey'
import vk from './validateKey'

var isDev = false

export const initEnvIsDev = envIsDev => (isDev = envIsDev)
export const envIsDev = () => isDev
export {initDefaults} from './validateKey'
export {initAutoupdateDefaults} from './autoupdateDefaults'
export const validateKey = vk

export default (R, key, def) => {
	if (isDev) {
		if (typeof R !== 'object') throw 'ERROR_R_IS_NOT_AN_OBJECT'
		if (typeof key !== 'string') throw 'ERROR_KEY_IS_NOT_A_STRING'
	}
	return getValue({R, key, def, isDev})
}
