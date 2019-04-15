"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.getValue = exports.initDefaults = void 0;

var _deepEqual = _interopRequireDefault(require("deep-equal"));

var _validateKey = _interopRequireDefault(require("./validateKey"));

var _autoupdateDefaults = _interopRequireDefault(require("./autoupdateDefaults"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var config = {
  autoupdateUri: '',
  defaults: undefined
};

var initDefaults = function initDefaults(defaults) {
  return config.defaults = defaults;
};

exports.initDefaults = initDefaults;

var getValue = function getValue(_ref) {
  var R = _ref.R,
      key = _ref.key,
      def = _ref.def,
      isDev = _ref.isDev;
  var vckd = (0, _validateKey.default)({
    R: R,
    key: key,
    def: def,
    isDev: isDev
  });
  return vckd.value;
};

exports.getValue = getValue;

var _default = function _default(_ref2) {
  var R = _ref2.R,
      key = _ref2.key,
      def = _ref2.def,
      isDev = _ref2.isDev;
  if (_typeof(R) !== 'object') R = {};
  if (typeof key === 'number') key = key.toString();
  if (typeof key !== 'string') key = '';
  var value = R[key];

  if (_typeof(config.defaults) !== 'object') {
    return {
      value: value,
      R: R,
      key: key,
      def: def
    };
  }

  if (key && typeof config.defaults[key] === 'undefined') {
    if (typeof def !== 'undefined') config.defaults[key] = def;else if (typeof R[key] !== 'undefined') config.defaults[key] = R[key];
    isDev && typeof config.defaults[key] !== 'undefined' && (0, _autoupdateDefaults.default)(key, config.defaults[key]);
  }

  if (isDev) {
    if (typeof config.defaults[key] === 'undefined') throw 'ERROR_NO_DEFAULT_DEFINED for ' + key;
    if (typeof def !== 'undefined' && !(0, _deepEqual.default)(config.defaults[key], def)) throw 'ERROR_DEFAULT_CONFLICT in ' + key;
  }

  return {
    value: value,
    R: R,
    key: key,
    def: config.defaults[key]
  };
};

exports.default = _default;