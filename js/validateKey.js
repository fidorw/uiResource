"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.initDefaults = void 0;

var _deepEqual = _interopRequireDefault(require("deep-equal"));

var _autoupdateDefaults = _interopRequireDefault(require("./autoupdateDefaults"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var config = {
  ctx: undefined,
  defaults: {}
};

var initDefaults = function initDefaults(defaults, ctx) {
  typeof ctx === 'undefined' && (ctx = 'defctx');
  config.ctx = ctx;
  config.defaults[ctx] = defaults;
};

exports.initDefaults = initDefaults;

var _default = function _default(_ref) {
  var R = _ref.R,
      key = _ref.key,
      def = _ref.def,
      isDev = _ref.isDev,
      ctx = _ref.ctx;
  typeof ctx === 'undefined' && (ctx = 'defctx');
  if (_typeof(R) !== 'object') R = {};
  if (typeof key === 'number') key = key.toString();
  if (typeof key !== 'string') key = '';
  var value = R[key];
  var d = config.defaults[ctx];

  if (typeof d === 'undefined') {
    return {
      value: value,
      R: R,
      key: key,
      def: def
    };
  }

  if (key && typeof d[key] === 'undefined') {
    if (typeof def !== 'undefined') d[key] = def;else if (typeof R[key] !== 'undefined') d[key] = R[key];
    isDev && typeof d[key] !== 'undefined' && (0, _autoupdateDefaults["default"])(key, d[key], ctx);
  }

  if (isDev) {
    if (typeof d[key] === 'undefined') throw 'ERROR_NO_DEFAULT_DEFINED for ' + key;
    if (typeof def !== 'undefined' && !(0, _deepEqual["default"])(d[key], def)) throw 'ERROR_DEFAULT_CONFLICT in ' + key;
  }

  return {
    value: value,
    R: R,
    key: key,
    def: d[key]
  };
};

exports["default"] = _default;