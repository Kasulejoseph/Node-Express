"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _hbs = _interopRequireDefault(require("hbs"));

var _forecast = _interopRequireDefault(require("./utils/forecast"));

var _geocode = _interopRequireDefault(require("./utils/geocode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var port = process.env.PORT || 3000; // Define path for express config

var publicDirPath = _path["default"].join(__dirname, '../public');

var viewPath = _path["default"].join(__dirname, '../templates/views');

var partialPath = _path["default"].join(__dirname, '../templates/partials'); // sETUP HANDLEBARS ENGINE and view location


app.set('view engine', 'hbs');
app.set('views', viewPath);

_hbs["default"].registerPartials(partialPath); // setup static directory to serve


app.use(_express["default"]["static"](publicDirPath));
app.get('/', function (req, res) {
  res.render('index', {
    title: 'Weather app',
    name: 'Kasule Joe',
    desc: 'Get started with this amazing weather app'
  });
}); // app.get('/help', (req, res) => {
//     res.send({
//         name: 'Andrew',
//         age: 29
//     })
// })

app.get('/about', function (req, res) {
  res.render('about', {
    title: 'About me',
    name: 'Kasule Joe'
  });
});
app.get('/help', function (req, res) {
  res.render('help', {
    title: "Let's help you...",
    message: 'Having trouble connecting to the WIFI, download kasule!',
    name: 'Kasule Joe'
  });
});
app.get('/weather', function (req, res) {
  if (!req.query.address) {
    return res.send({
      error: 'No query params provided'
    });
  }

  (0, _geocode["default"])(req.query.address, function (error) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        Latitude = _ref.Latitude,
        Longtitude = _ref.Longtitude,
        location = _ref.location;

    if (error) {
      return res.send({
        error: error
      });
    }

    (0, _forecast["default"])(Latitude, Longtitude, function (error, forecastData) {
      if (error) {
        return res.send({
          error: error
        });
      }

      return res.send({
        location: location,
        forecast: forecastData
      });
    });
  });
});
app.get('/help/*', function (req, res) {
  res.render('404', {
    title: "404...",
    error404: 'Help article not found',
    name: 'Kasule Joe'
  });
});
app.get('*', function (req, res) {
  res.render('404', {
    title: "404...",
    error404: '404, page not found.',
    name: 'Kasule Joe'
  });
});
app.listen(port, function () {
  console.log("Server is running at port ".concat(port));
});
var _default = app;
exports["default"] = _default;
//# sourceMappingURL=index.js.map