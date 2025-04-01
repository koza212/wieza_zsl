/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scripts_core_game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scripts/core/game */ \"./src/scripts/core/game.js\");\n \r\n\r\nlet game;\r\n\r\nwindow.startPlay = () => {\r\n    const titleScreen = document.getElementById(\"1\");\r\n    const settingsScreen = document.getElementById(\"2\");\r\n    const footer = document.getElementById(\"footer\");\r\n\r\n    titleScreen.style.display = \"none\";\r\n    settingsScreen.style.display = \"none\";\r\n    footer.style.display = \"none\";\r\n\r\n    const gameScreen = document.getElementById(\"gameScreen\");\r\n    gameScreen.style.display = \"block\";\r\n\r\n    const canvas = document.getElementById(\"gameCanvas\");\r\n    \r\n    if(!game){\r\n        game = new _scripts_core_game__WEBPACK_IMPORTED_MODULE_0__.Game(canvas);\r\n    }\r\n};\n\n//# sourceURL=webpack://wieza_zsl-main/./src/index.js?");

/***/ }),

/***/ "./src/scripts/core/game.js":
/*!**********************************!*\
  !*** ./src/scripts/core/game.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Game: () => (/* binding */ Game)\n/* harmony export */ });\n/* harmony import */ var _map_map_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../map/map.js */ \"./src/scripts/map/map.js\");\n  \r\n\r\nclass Game {\r\n    constructor(canvas) {\r\n        this.canvas = canvas;\r\n        this.ctx = this.canvas.getContext(\"2d\");\r\n        this.canvas.width = 840;\r\n        this.canvas.height = 840;\r\n\r\n        this.map = new _map_map_js__WEBPACK_IMPORTED_MODULE_0__.Map(\"../../../assets/map.png\");\r\n\r\n        this.viewport = {\r\n            y: 0,\r\n            width: this.canvas.width,\r\n            height: this.canvas.height,\r\n        };\r\n\r\n        this.init();\r\n    }\r\n\r\n    async init() {\r\n        await this.map.load();\r\n        this.addScrollControls()\r\n        requestAnimationFrame(() => this.gameLoop());\r\n    }\r\n\r\n    addScrollControls() {\r\n        this.canvas.addEventListener(\"wheel\", (e) => {\r\n            const scrollSpeed = 50; \r\n            if (e.deltaY > 0) {\r\n                this.viewport.y += scrollSpeed; \r\n            } else {\r\n                this.viewport.y -= scrollSpeed; \r\n            }\r\n\r\n            // Making srue viewport dont go too high or low\r\n            this.viewport.y = Math.max(0, Math.min(this.viewport.y, this.map.height - this.viewport.height));\r\n        });\r\n    }\r\n\r\n\r\n    gameLoop() {\r\n        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\r\n        this.map.draw(this.ctx, this.viewport);\r\n\r\n        requestAnimationFrame(() => this.gameLoop());\r\n    }\r\n}\n\n//# sourceURL=webpack://wieza_zsl-main/./src/scripts/core/game.js?");

/***/ }),

/***/ "./src/scripts/map/map.js":
/*!********************************!*\
  !*** ./src/scripts/map/map.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Map: () => (/* binding */ Map)\n/* harmony export */ });\nclass Map {\r\n    constructor(imagePath) {\r\n        this.imagePath = imagePath;\r\n        this.width = 0;\r\n        this.height = 0;\r\n        this.pixelGrid = [];\r\n    }\r\n\r\n    async load() {\r\n        const imageData = await this.loadImageData(this.imagePath);\r\n        this.width = imageData.width;\r\n        this.height = imageData.height;\r\n        this.pixelGrid = this.processImage(imageData);\r\n    }\r\n\r\n\r\n    draw(ctx, viewport) {\r\n        const startRow = Math.max(0, Math.floor(viewport.y));\r\n        const endRow = Math.min(this.pixelGrid.length, Math.ceil(viewport.y + viewport.height));\r\n        const startCol = 0; \r\n        const endCol = Math.min(this.pixelGrid[0].length, Math.ceil(viewport.width));\r\n        \r\n        for (let row = startRow; row < endRow; row++) {\r\n            for (let col = startCol; col < endCol; col++) {\r\n                const surface = this.pixelGrid[row][col];\r\n    \r\n                if (surface.type === \"empty\") continue; \r\n                if (surface.type === \"wall\") ctx.fillStyle = \"red\";\r\n                else if (surface.type === \"platform\") ctx.fillStyle = \"blue\";\r\n                else if (surface.type === \"slopeRight\") ctx.fillStyle = \"green\";\r\n                else if (surface.type === \"slopeLeft\") ctx.fillStyle = \"yellow\";\r\n    \r\n                ctx.fillRect(col, row - viewport.y, 1, 1); \r\n            }\r\n        }\r\n    }\r\n    getSurfaceType(color) {\r\n        if (color.r === 255 && color.g === 0 && color.b === 0) return { type: \"wall\", angle: 90 };\r\n        if (color.r === 0 && color.g === 0 && color.b === 255) return { type: \"platform\", angle: 0 };\r\n        if (color.r === 0 && color.g === 255 && color.b === 0) return { type: \"slopeRight\", angle: 45 };\r\n        if (color.r === 255 && color.g === 255 && color.b === 0) return { type: \"slopeLeft\", angle: -45 };\r\n        return { type: \"empty\", angle: null };\r\n    }\r\n\r\n    loadImageData(imagePath) {\r\n        const img = new Image();\r\n        img.src = imagePath;\r\n        \r\n        return new Promise((resolve, reject) => {\r\n            img.onload = () => {\r\n                // Temporary canvas used just to take data from image\r\n                const canvas = document.createElement(\"canvas\");\r\n                const ctx = canvas.getContext(\"2d\");\r\n                \r\n                canvas.width = img.width;\r\n                canvas.height = img.height;\r\n                ctx.drawImage(img, 0, 0);\r\n                \r\n                resolve(ctx.getImageData(0, 0, img.width, img.height));\r\n            };\r\n            img.onerror = reject;\r\n        });\r\n    }\r\n\r\n    processImage(imageData) {\r\n        const width = imageData.width;\r\n        const height = imageData.height;\r\n        const data = imageData.data;\r\n\r\n        const grid = [];\r\n\r\n        for (let y = 0; y < height; y++) {\r\n            let row = [];\r\n            for (let x = 0; x < width; x++) {\r\n                const i = (y * width + x) * 4;\r\n                const color = { r: data[i], g: data[i + 1], b: data[i + 2] };\r\n                row.push(this.getSurfaceType(color));\r\n            }\r\n            grid.push(row);\r\n        }\r\n        return grid;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://wieza_zsl-main/./src/scripts/map/map.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;