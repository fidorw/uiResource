"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "initDefaults", {
  enumerable: true,
  get: function get() {
    return _validateKey.initDefaults;
  }
});
Object.defineProperty(exports, "initAutoupdateDefaults", {
  enumerable: true,
  get: function get() {
    return _autoupdateDefaults.initAutoupdateDefaults;
  }
});
exports.default = exports.validateKey = exports.envIsDev = exports.initEnvIsDev = void 0;

var _validateKey = _interopRequireWildcard(require("./validateKey"));

var _autoupdateDefaults = require("./autoupdateDefaults");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var isDev = false;

var initEnvIsDev = function initEnvIsDev(envIsDev) {
  return isDev = envIsDev;
};

exports.initEnvIsDev = initEnvIsDev;

var envIsDev = function envIsDev() {
  return isDev;
};

exports.envIsDev = envIsDev;
var validateKey = _validateKey.default;
exports.validateKey = validateKey;

var _default = function _default(R, key, def) {
  if (isDev) {
    if (_typeof(R) !== 'object') throw 'ERROR_R_IS_NOT_AN_OBJECT';
    if (typeof key !== 'string') throw 'ERROR_KEY_IS_NOT_A_STRING';
  }

  return (0, _validateKey.getValue)({
    R: R,
    key: key,
    def: def,
    isDev: isDev
  });
};

exports.default = _default;