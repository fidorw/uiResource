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
exports.default = exports.initEnvIsDev = void 0;

var _validateKey = require("./validateKey");

var _autoupdateDefaults = require("./autoupdateDefaults");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var isDev = false;

var initEnvIsDev = function initEnvIsDev(envIsDev) {
  return isDev = envIsDev;
};

exports.initEnvIsDev = initEnvIsDev;

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