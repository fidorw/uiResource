"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.initAutoupdateDefaults = void 0;

var _pubcoreHttp = _interopRequireDefault(require("pubcore-http"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var config = {
  newDefaults: {},
  postUri: undefined
};

var postDefaults = function postDefaults(ctx) {
  return (0, _pubcoreHttp["default"])(config[ctx].postUri, config[ctx].newDefaults).then(function () {
    return config[ctx].newDefaults = {};
  });
};

var initAutoupdateDefaults = function initAutoupdateDefaults(c, ctx) {
  typeof ctx === 'undefined' && (ctx = 'defctx');
  config[ctx] = {
    newDefaults: {},
    postUri: c.postUri
  };
};

exports.initAutoupdateDefaults = initAutoupdateDefaults;

var _default = function _default(key, spec, ctx) {
  typeof ctx === 'undefined' && (ctx = 'defctx');
  var postUri = config[ctx].postUri;

  if (typeof postUri === 'string' && postUri.length > 0) {
    typeof config[ctx].newDefaults === 'undefined' && (config[ctx].newDefaults = {});
    config[ctx].newDefaults[key] = spec;
    postDefaults(ctx);
  }
};

exports["default"] = _default;