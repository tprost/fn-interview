process.env.NODE_ENV = 'test';
var config = require('../../');

module.exports = {
  src_folders: ["tests/e2e"],
  output_folder: "reports",
  globals_path: "config/tests/e2e/globals.js",

  selenium: {
    start_process: true,
    server_path: "node_modules/selenium-server-standalone-jar/jar/selenium-server-standalone-3.0.1.jar",
    host: "127.0.0.1",
    port: 4444,
    cli_args: {
      "phantomjs.binary.path": "node_modules/phantomjs/lib/phantom/bin/phantomjs",
      "webdriver.chrome.driver": "node_modules/chromedriver/lib/chromedriver/chromedriver"
    }
  },
  test_settings: {
    default: {
      launch_url: "http://localhost:" + config.port,
      selenium_port: 4444,
      selenium_host: "localhost",
      silent: true,
      desiredCapabilities: {
        browserName: "phantomjs"
      }
    },
    chrome: {
      desiredCapabilities: {
        browserName: "chrome"
      }
    },
    firefox: {
      desiredCapabilities: {
        browserName: "firefox"
      }
    }
  }
};
