"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _request = _interopRequireDefault(require("request"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config(); // mapnox.com for lat/log cordinates


var forecast = function forecast(lat, log, callback) {
  var url = "".concat(process.env.FORECASTURL).concat(lat, ",").concat(log, "?units=si");
  (0, _request["default"])({
    url: url,
    json: true
  }, function (error, _ref) {
    var body = _ref.body;

    if (error) {
      callback('Unable to connect to the weather service!', undefined);
    } else if (body.error) {
      callback(body.error, undefined);
    } else {
      callback(undefined, body.daily.summary + 'It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.');
    }
  });
};

var _default = forecast;
exports["default"] = _default;
//# sourceMappingURL=forecast.js.map