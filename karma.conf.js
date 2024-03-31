
module.exports = function (config) {
  config.set({
    client: {
      captureConsole: true,
      mocha: {
        bail: true
      }
    },
    plugins: [require("karma-firefox-launcher")],
    browsers: [
      /*'Chrome'*/,
      "Firefox",
      "FirefoxDeveloper",
      "FirefoxAurora",
      "FirefoxNightly",
    ],
  });
};