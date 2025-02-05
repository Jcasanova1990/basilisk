/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _App_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.module.scss */ "./src/App.module.scss");
/* harmony import */ var react_responsive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-responsive */ "./node_modules/react-responsive/dist/esm/index.js");
/* harmony import */ var _components_ThreeCanvas__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/ThreeCanvas */ "./src/components/ThreeCanvas.js");




function App() {
  var isMobile = (0,react_responsive__WEBPACK_IMPORTED_MODULE_3__.useMediaQuery)({
    query: '(max-width: 600px)'
  });
  var gameRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (gameRef.current) {
      gameRef.current.startGame();
    }
  }, []);
  if (isMobile) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: _App_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].MobileMessage
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, "Sorry, this site is currently not available on mobile devices at this time. Please visit on a tablet, laptop, or desktop."));
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: _App_module_scss__WEBPACK_IMPORTED_MODULE_1__["default"].App
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_ThreeCanvas__WEBPACK_IMPORTED_MODULE_2__["default"], {
    ref: gameRef
  }));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);

/***/ }),

/***/ "./src/components/ThreeCanvas.js":
/*!***************************************!*\
  !*** ./src/components/ThreeCanvas.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }


var ThreeCanvas = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(function (props, ref) {
  var canvasRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    gameStarted = _useState2[0],
    setGameStarted = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    _useState4 = _slicedToArray(_useState3, 2),
    showPopup = _useState4[0],
    setShowPopup = _useState4[1]; // State for popup visibility
  var scene, camera, renderer;
  var snakeBody = [];
  var fruit, bomb;
  var snakeDirection = new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 0, 0); // No movement initially
  var score = 0;
  var gameOver = false;
  var gridSize = 20;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useImperativeHandle)(ref, function () {
    return {
      startGame: startGame
    };
  });
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var handleKeyDown = function handleKeyDown(event) {
      return handleArrowKeys(event);
    };
    window.addEventListener('keydown', handleKeyDown);
    return function () {
      return window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  function startGame() {
    if (gameStarted) return; // Prevent multiple starts
    setShowPopup(false); // Hide popup when game starts
    console.log("Starting Game...");
    setGameStarted(true);
    gameOver = false;
    score = 0;
    snakeBody = [];
    snakeDirection.set(0, 0, 0); // No initial movement

    if (!scene) {
      scene = new three__WEBPACK_IMPORTED_MODULE_1__.Scene();
      camera = new three__WEBPACK_IMPORTED_MODULE_1__.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      renderer = new three__WEBPACK_IMPORTED_MODULE_1__.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      if (canvasRef.current) {
        canvasRef.current.innerHTML = ''; // Clear old canvas
        canvasRef.current.appendChild(renderer.domElement);
      }
      camera.position.set(0, 0, 30);
    } else {
      // Clear previous objects
      while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
      }
    }
    createWalls(); // Add walls to the game
    createSnake();
    createFruit();
    createBomb();
    animate();

    // Display Start button in canvas if not started
    if (!gameStarted) {
      displayStartButton();
    }
  }
  function createWalls() {
    var wallMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshBasicMaterial({
      color: 0xffff00
    }); // Yellow color

    // Create walls along each side of the grid
    var wallThickness = 1; // Wall thickness
    var wallHeight = gridSize; // Height of the wall
    var wallWidth = gridSize;

    // Left Wall
    var leftWall = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(new three__WEBPACK_IMPORTED_MODULE_1__.BoxGeometry(wallThickness, wallHeight, wallThickness), wallMaterial);
    leftWall.position.set(-wallWidth / 2, 0, 0);
    scene.add(leftWall);

    // Right Wall
    var rightWall = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(new three__WEBPACK_IMPORTED_MODULE_1__.BoxGeometry(wallThickness, wallHeight, wallThickness), wallMaterial);
    rightWall.position.set(wallWidth / 2, 0, 0);
    scene.add(rightWall);

    // Top Wall
    var topWall = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(new three__WEBPACK_IMPORTED_MODULE_1__.BoxGeometry(wallWidth, wallThickness, wallThickness), wallMaterial);
    topWall.position.set(0, wallHeight / 2, 0);
    scene.add(topWall);

    // Bottom Wall
    var bottomWall = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(new three__WEBPACK_IMPORTED_MODULE_1__.BoxGeometry(wallWidth, wallThickness, wallThickness), wallMaterial);
    bottomWall.position.set(0, -wallHeight / 2, 0);
    scene.add(bottomWall);
  }
  function createSnake() {
    console.log("Creating Snake...");
    var snakeMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshBasicMaterial({
      color: 0x00ff00
    });
    for (var i = 0; i < 3; i++) {
      var cube = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(new three__WEBPACK_IMPORTED_MODULE_1__.BoxGeometry(1, 1, 1), snakeMaterial);
      cube.position.set(-i, 0, 0); // Ensuring body starts separate
      scene.add(cube);
      snakeBody.push(cube);
    }
  }
  function createFruit() {
    console.log("Creating Fruit...");
    fruit = createGameObject(0xff0000);
    setRandomPosition(fruit);
  }
  function createBomb() {
    console.log("Creating Bomb...");
    bomb = createGameObject(0x0000ff);
    setRandomPosition(bomb);
  }
  function createGameObject(color) {
    var material = new three__WEBPACK_IMPORTED_MODULE_1__.MeshBasicMaterial({
      color: color
    });
    var obj = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(new three__WEBPACK_IMPORTED_MODULE_1__.BoxGeometry(1, 1, 1), material);
    scene.add(obj);
    return obj;
  }
  function setRandomPosition(object) {
    var position;
    do {
      position = new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(Math.floor(Math.random() * gridSize) - gridSize / 2, Math.floor(Math.random() * gridSize) - gridSize / 2, 0);
    } while (snakeBody.some(function (segment) {
      return segment.position.equals(position);
    })); // Avoid spawn on snake
    object.position.copy(position);
  }
  function moveSnake() {
    if (gameOver || snakeDirection.length() === 0) return;
    var head = snakeBody[0];
    var newHeadPosition = head.position.clone().add(snakeDirection);

    // Check self-collision (ensure the head doesn't collide with the body)
    if (snakeBody.slice(1).some(function (segment) {
      return segment.position.equals(newHeadPosition);
    })) {
      console.log("Self-Collision! Game Over.");
      endGame();
      return;
    }

    // Check if snake eats fruit
    if (newHeadPosition.distanceTo(fruit.position) < 1) {
      score += 1;
      console.log("Ate Fruit! Score:", score);
      setRandomPosition(fruit);
      var newSegment = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(new three__WEBPACK_IMPORTED_MODULE_1__.BoxGeometry(1, 1, 1), new three__WEBPACK_IMPORTED_MODULE_1__.MeshBasicMaterial({
        color: 0x00ff00
      }));
      newSegment.position.copy(snakeBody[snakeBody.length - 1].position);
      snakeBody.push(newSegment);
      scene.add(newSegment);
    } else {
      // Move the body forward
      var tail = snakeBody.pop();
      scene.remove(tail);
    }

    // Check if snake hits bomb
    if (newHeadPosition.distanceTo(bomb.position) < 1) {
      score -= 1;
      console.log("Hit Bomb! Score:", score);
      setRandomPosition(bomb);
    }

    // Move head forward
    var newHead = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(new three__WEBPACK_IMPORTED_MODULE_1__.BoxGeometry(1, 1, 1), new three__WEBPACK_IMPORTED_MODULE_1__.MeshBasicMaterial({
      color: 0x00ff00
    }));
    newHead.position.copy(newHeadPosition);
    snakeBody.unshift(newHead);
    scene.add(newHead);
    checkGameOver();
  }
  function checkGameOver() {
    var head = snakeBody[0];

    // Check boundary collision
    if (head.position.x < -gridSize / 2 || head.position.x > gridSize / 2 || head.position.y < -gridSize / 2 || head.position.y > gridSize / 2) {
      console.log("Out of Bounds! Game Over.");
      endGame();
    }
  }
  function endGame() {
    gameOver = true;
    console.log("GAME OVER! Score:", score);
    setTimeout(function () {
      return displayGameOver();
    }, 200);
  }
  function handleArrowKeys(event) {
    if (gameOver) return;
    var key = event.key;
    if (key === 'ArrowUp' && snakeDirection.y !== -1) {
      snakeDirection.set(0, 1, 0);
    } else if (key === 'ArrowDown' && snakeDirection.y !== 1) {
      snakeDirection.set(0, -1, 0);
    } else if (key === 'ArrowLeft' && snakeDirection.x !== 1) {
      snakeDirection.set(-1, 0, 0);
    } else if (key === 'ArrowRight' && snakeDirection.x !== -1) {
      snakeDirection.set(1, 0, 0);
    }
  }
  function animate() {
    if (gameOver) return;
    moveSnake();
    renderer.render(scene, camera);
    setTimeout(function () {
      return requestAnimationFrame(animate);
    }, 200);
  }
  function displayGameOver() {
    console.log("Displaying Game Over Screen...");
    var gameOverDiv = document.createElement('div');
    gameOverDiv.innerHTML = "<h1>Game Over</h1><p>Score: ".concat(score, "</p><button id=\"restartButton\">Restart</button>");
    gameOverDiv.style.position = 'absolute';
    gameOverDiv.style.top = '50%';
    gameOverDiv.style.left = '50%';
    gameOverDiv.style.transform = 'translate(-50%, -50%)';
    gameOverDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    gameOverDiv.style.color = 'white';
    gameOverDiv.style.padding = '20px';
    gameOverDiv.style.borderRadius = '10px';
    document.body.appendChild(gameOverDiv);
    document.getElementById('restartButton').addEventListener('click', restartGame);
  }
  function restartGame() {
    document.body.innerHTML = '';
    setGameStarted(false);
    setShowPopup(true); // Show the popup again on restart
    startGame();
  }
  function displayStartButton() {
    var startButtonDiv = document.createElement('div');
    startButtonDiv.innerHTML = "<h1>Snake Game</h1><p>Press Start to Play</p><button id=\"startButton\">Start Game</button>";
    startButtonDiv.style.position = 'absolute';
    startButtonDiv.style.top = '50%';
    startButtonDiv.style.left = '50%';
    startButtonDiv.style.transform = 'translate(-50%, -50%)';
    startButtonDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    startButtonDiv.style.color = 'white';
    startButtonDiv.style.padding = '20px';
    startButtonDiv.style.borderRadius = '10px';
    if (canvasRef.current) {
      canvasRef.current.appendChild(startButtonDiv); // Attach to canvasRef
    }

    // Use the button directly from the div
    var startButton = startButtonDiv.querySelector('#startButton');
    if (startButton) {
      startButton.addEventListener('click', function () {
        console.log("Start button clicked"); // Log the click
        startGame();

        // Remove the start button message
        if (startButtonDiv.parentNode) {
          startButtonDiv.parentNode.removeChild(startButtonDiv); // Ensures removal of start screen
        }
      });
    } else {
      console.error('Start button not found!');
    }
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    ref: canvasRef
  });
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ThreeCanvas);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ "./node_modules/react-dom/client.js");
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App */ "./src/App.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/dist/index.js");
/* provided dependency */ var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");




var root = (0,react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot)(document.getElementById("app"));
root.render(/*#__PURE__*/React.createElement(react__WEBPACK_IMPORTED_MODULE_0__.StrictMode, null, /*#__PURE__*/React.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__.BrowserRouter, null, /*#__PURE__*/React.createElement(_App__WEBPACK_IMPORTED_MODULE_2__["default"], null))));

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[2].use[1]!./node_modules/sass-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/App.module.scss":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[2].use[1]!./node_modules/sass-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/App.module.scss ***!
  \********************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background-color: #000;
  color: #fff;
  overflow: hidden;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.A1FqdtKfmpKkHHHSjlUR {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  width: 300px;
}

.A1FqdtKfmpKkHHHSjlUR h1 {
  margin-bottom: 20px;
}

.A1FqdtKfmpKkHHHSjlUR p {
  margin-bottom: 20px;
}

.A1FqdtKfmpKkHHHSjlUR button {
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #28a745;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.A1FqdtKfmpKkHHHSjlUR button:hover {
  background-color: #218838;
}

#LEtvaLgNK55b49BnXHjV {
  width: 100%;
  height: 100%;
  position: relative;
}

#Raze93PQAmIOGCZSZHKY {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  width: 300px;
}

#Raze93PQAmIOGCZSZHKY h1 {
  font-size: 2rem;
  margin-bottom: 20px;
}

#Raze93PQAmIOGCZSZHKY p {
  font-size: 1.5rem;
}

#vHH2XJC2LMjOh4w3P_fA {
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

#vHH2XJC2LMjOh4w3P_fA:hover {
  background-color: #0056b3;
}`, "",{"version":3,"sources":["webpack://./src/App.module.scss"],"names":[],"mappings":"AAIA;EACE,SAAA;EACA,UAAA;EACA,sBAAA;AAHF;;AAMA;EACE,8BAAA;EACA,sBAAA;EACA,WAAA;EACA,gBAAA;EACA,aAAA;EACA,aAAA;EACA,uBAAA;EACA,mBAAA;AAHF;;AAOA;EACE,kBAAA;EACA,QAAA;EACA,SAAA;EACA,gCAAA;EACA,oCAAA;EACA,YAAA;EACA,aAAA;EACA,mBAAA;EACA,kBAAA;EACA,YAAA;AAJF;;AAOA;EACE,mBAAA;AAJF;;AAOA;EACE,mBAAA;AAJF;;AAOA;EACE,kBAAA;EACA,eAAA;EACA,WAAA;EACA,yBAAA;EACA,YAAA;EACA,kBAAA;EACA,eAAA;EACA,iCAAA;AAJF;;AAOA;EACE,yBAAA;AAJF;;AAQA;EACE,WAAA;EACA,YAAA;EACA,kBAAA;AALF;;AASA;EACE,kBAAA;EACA,QAAA;EACA,SAAA;EACA,gCAAA;EACA,oCAAA;EACA,YAAA;EACA,aAAA;EACA,mBAAA;EACA,kBAAA;EACA,YAAA;AANF;;AASA;EACE,eAAA;EACA,mBAAA;AANF;;AASA;EACE,iBAAA;AANF;;AASA;EACE,kBAAA;EACA,eAAA;EACA,WAAA;EACA,yBAAA;EACA,YAAA;EACA,kBAAA;EACA,eAAA;AANF;;AASA;EACE,yBAAA;AANF","sourcesContent":["\n// modules.scss\n\n// Global styles\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: Arial, sans-serif;\n  background-color: #000;\n  color: #fff;\n  overflow: hidden;\n  height: 100vh;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n// Popup styles\n.popup {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  background-color: rgba(0, 0, 0, 0.8);\n  color: white;\n  padding: 30px;\n  border-radius: 10px;\n  text-align: center;\n  width: 300px;\n}\n\n.popup h1 {\n  margin-bottom: 20px;\n}\n\n.popup p {\n  margin-bottom: 20px;\n}\n\n.popup button {\n  padding: 10px 20px;\n  font-size: 16px;\n  color: #fff;\n  background-color: #28a745;\n  border: none;\n  border-radius: 5px;\n  cursor: pointer;\n  transition: background-color 0.3s;\n}\n\n.popup button:hover {\n  background-color: #218838;\n}\n\n// Canvas container\n#threeCanvas {\n  width: 100%;\n  height: 100%;\n  position: relative;\n}\n\n// Game over styles\n#gameOver {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  background-color: rgba(0, 0, 0, 0.8);\n  color: white;\n  padding: 30px;\n  border-radius: 10px;\n  text-align: center;\n  width: 300px;\n}\n\n#gameOver h1 {\n  font-size: 2rem;\n  margin-bottom: 20px;\n}\n\n#gameOver p {\n  font-size: 1.5rem;\n}\n\n#restartButton {\n  padding: 10px 20px;\n  font-size: 16px;\n  color: #fff;\n  background-color: #007bff;\n  border: none;\n  border-radius: 5px;\n  cursor: pointer;\n}\n\n#restartButton:hover {\n  background-color: #0056b3;\n}\n"],"sourceRoot":""}]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"popup": `A1FqdtKfmpKkHHHSjlUR`,
	"threeCanvas": `LEtvaLgNK55b49BnXHjV`,
	"gameOver": `Raze93PQAmIOGCZSZHKY`,
	"restartButton": `vHH2XJC2LMjOh4w3P_fA`
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/App.module.scss":
/*!*****************************!*\
  !*** ./src/App.module.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_App_module_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[2].use[1]!../node_modules/sass-loader/dist/cjs.js!../node_modules/postcss-loader/dist/cjs.js!./App.module.scss */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[2].use[1]!./node_modules/sass-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/App.module.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_App_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_App_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_App_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_2_use_1_node_modules_sass_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_App_module_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


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
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"App": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkoni"] = self["webpackChunkoni"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_css-loader_dist_runtime_api_js-node_modules_css-loader_dist_runtime_sour-4803b3"], () => (__webpack_require__("./src/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=App.4cdac39c297eed7b333415afeefc7627.js.map