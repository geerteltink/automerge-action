module.exports =
/******/ (function(modules, runtime) { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	__webpack_require__.ab = __dirname + "/";
/******/
/******/ 	// the startup function
/******/ 	function startup() {
/******/ 		// Load entry module and return exports
/******/ 		return __webpack_require__(676);
/******/ 	};
/******/
/******/ 	// run startup
/******/ 	return startup();
/******/ })
/************************************************************************/
/******/ ({

/***/ 676:
/***/ (function(__unusedmodule, __unusedexports, __webpack_require__) {

const core = __webpack_require__(990);
const { GitHub, context } = __webpack_require__(690);

const {
  GITHUB_TOKEN, GITHUB_ACTION, GITHUB_SHA, GITHUB_REF,
} = process.env;

async function run() {
  try {
    const github = new GitHub(GITHUB_TOKEN);
    const owner = context.repository.owner.login;
    const repo = context.repository.name;

    console.log(`owner: ${owner}/${repo}, GITHUB_ACTION: ${GITHUB_ACTION}, GITHUB_SHA: ${GITHUB_SHA}, GITHUB_REF: ${GITHUB_REF}`);

    const suites = await github.checks.listSuitesForRef({
      owner,
      repo,
      GITHUB_SHA,
    });

    console.log(JSON.stringify(suites, undefined, 2));

    /*
    if ('check_suite' in context && 'pull_request' in context.check_suite) {

    }
    */
  } catch (error) {
    core.setFailed(error.message);
  }
}

if (require.main === require.cache[eval('__filename')]) {
  run();
}


/***/ }),

/***/ 690:
/***/ (function() {

eval("require")("@actions/github");


/***/ }),

/***/ 990:
/***/ (function() {

eval("require")("@actions/core");


/***/ })

/******/ });