"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _request = _interopRequireDefault(require("request"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var geoCode = function geoCode(location, callback) {
  var url = "".concat(process.env.GEOCODINGURL) + location + '.json?access_token=' + process.env.ACCESSTOKEN;
  (0, _request["default"])({
    url: url,
    json: true
  }, function (error, _ref) {
    var body = _ref.body;

    if (error) {
      callback('Unable to connect to the geo location service!', undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find location, try again with different search location!', undefined);
    } else {
      var mapObject = body.features[1];
      callback(undefined, {
        'Longtitude': mapObject.center[0],
        'Latitude': mapObject.center[1],
        'location': mapObject.place_name
      });
    }
  });
};

var _default = geoCode;
exports["default"] = _default;
//# sourceMappingURL=geocode.js.map