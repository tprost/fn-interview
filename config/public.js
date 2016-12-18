module.exports = {
  lib: {
    "angular": "lib/angular/angular.js",
    "angular-route": "lib/angular-route/angular-route.js"
  },
  app: {
    "components": "js/**/!(*.spec|*.mock).js"
  },
  tests: {
    "mocking": "lib/angular-mocks/angular-mocks.js",
    "tests": "js/**/*.spec.js"
  }
};
