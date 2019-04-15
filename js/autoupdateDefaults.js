"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.initAutoupdateDefaults = void 0;

var _pubcoreHttp = _interopRequireDefault(require("pubcore-http"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var newDefaults = {},
    config = {
  postUri: ''
};

var postDefaults = function postDefaults() {
  return (0, _pubcoreHttp.default)(config.postUri, newDefaults).then(function () {
    return newDefaults = {};
  });
};

var initAutoupdateDefaults = function initAutoupdateDefaults(c) {
  config = _objectSpread({}, config, c);
};

exports.initAutoupdateDefaults = initAutoupdateDefaults;

var _default = function _default(key, spec) {
  if (typeof config.postUri === 'string' && config.postUri.length > 0) {
    newDefaults[key] = spec;
    postDefaults();
  }
};

exports.default = _default;