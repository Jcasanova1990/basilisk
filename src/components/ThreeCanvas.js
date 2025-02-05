import React, { useEffect, useRef, forwardRef, useImperativeHandle, useState } from 'react';
import * as THREE from 'three';

const ThreeCanvas = forwardRef((props, ref) => {
  const canvasRef = useRef(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [showPopup, setShowPopup] = useState(true); // State for popup visibility
  let scene, camera, renderer;
  let snakeBody = [];
  let fruit, bomb;
  let snakeDirection = new THREE.Vector3(0, 0, 0); // No movement initially
  let score = 0;
  let gameOver = false;

  const gridSize = 20;

  useImperativeHandle(ref, () => ({
    startGame
  }));

  useEffect(() => {
    const handleKeyDown = (event) => handleArrowKeys(event);
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      renderer = new THREE.WebGLRenderer();
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
    const wallMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 }); // Yellow color
    
    // Create walls along each side of the grid
    const wallThickness = 1; // Wall thickness
    const wallHeight = gridSize; // Height of the wall
    const wallWidth = gridSize;

    // Left Wall
    const leftWall = new THREE.Mesh(new THREE.BoxGeometry(wallThickness, wallHeight, wallThickness), wallMaterial);
    leftWall.position.set(-wallWidth / 2, 0, 0);
    scene.add(leftWall);

    // Right Wall
    const rightWall = new THREE.Mesh(new THREE.BoxGeometry(wallThickness, wallHeight, wallThickness), wallMaterial);
    rightWall.position.set(wallWidth / 2, 0, 0);
    scene.add(rightWall);

    // Top Wall
    const topWall = new THREE.Mesh(new THREE.BoxGeometry(wallWidth, wallThickness, wallThickness), wallMaterial);
    topWall.position.set(0, wallHeight / 2, 0);
    scene.add(topWall);

    // Bottom Wall
    const bottomWall = new THREE.Mesh(new THREE.BoxGeometry(wallWidth, wallThickness, wallThickness), wallMaterial);
    bottomWall.position.set(0, -wallHeight / 2, 0);
    scene.add(bottomWall);
  }

  function createSnake() {
    console.log("Creating Snake...");
    const snakeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    for (let i = 0; i < 3; i++) {
      const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), snakeMaterial);
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
    const material = new THREE.MeshBasicMaterial({ color });
    const obj = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);
    scene.add(obj);
    return obj;
  }

  function setRandomPosition(object) {
    let position;
    do {
      position = new THREE.Vector3(
        Math.floor(Math.random() * gridSize) - gridSize / 2,
        Math.floor(Math.random() * gridSize) - gridSize / 2,
        0
      );
    } while (snakeBody.some(segment => segment.position.equals(position))); // Avoid spawn on snake
    object.position.copy(position);
  }

  function moveSnake() {
    if (gameOver || snakeDirection.length() === 0) return;

    const head = snakeBody[0];
    const newHeadPosition = head.position.clone().add(snakeDirection);

    // Check self-collision (ensure the head doesn't collide with the body)
    if (snakeBody.slice(1).some(segment => segment.position.equals(newHeadPosition))) {
      console.log("Self-Collision! Game Over.");
      endGame();
      return;
    }

    // Check if snake eats fruit
    if (newHeadPosition.distanceTo(fruit.position) < 1) {
      score += 1;
      console.log("Ate Fruit! Score:", score);
      setRandomPosition(fruit);
      const newSegment = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
      newSegment.position.copy(snakeBody[snakeBody.length - 1].position);
      snakeBody.push(newSegment);
      scene.add(newSegment);
    } else {
      // Move the body forward
      const tail = snakeBody.pop();
      scene.remove(tail);
    }

    // Check if snake hits bomb
    if (newHeadPosition.distanceTo(bomb.position) < 1) {
      score -= 1;
      console.log("Hit Bomb! Score:", score);
      setRandomPosition(bomb);
    }

    // Move head forward
    const newHead = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
    newHead.position.copy(newHeadPosition);
    snakeBody.unshift(newHead);
    scene.add(newHead);

    checkGameOver();
  }

  function checkGameOver() {
    const head = snakeBody[0];

    // Check boundary collision
    if (
      head.position.x < -gridSize / 2 || head.position.x > gridSize / 2 ||
      head.position.y < -gridSize / 2 || head.position.y > gridSize / 2
    ) {
      console.log("Out of Bounds! Game Over.");
      endGame();
    }
  }

  function endGame() {
    gameOver = true;
    console.log("GAME OVER! Score:", score);
    setTimeout(() => displayGameOver(), 200);
  }

  function handleArrowKeys(event) {
    if (gameOver) return;
    const { key } = event;
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
    setTimeout(() => requestAnimationFrame(animate), 200);
  }

  function displayGameOver() {
    console.log("Displaying Game Over Screen...");
    const gameOverDiv = document.createElement('div');
    gameOverDiv.innerHTML = `<h1>Game Over</h1><p>Score: ${score}</p><button id="restartButton">Restart</button>`;
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
    const startButtonDiv = document.createElement('div');
    startButtonDiv.innerHTML = `<h1>Snake Game</h1><p>Press Start to Play</p><button id="startButton">Start Game</button>`;
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
    const startButton = startButtonDiv.querySelector('#startButton');
    if (startButton) {
      startButton.addEventListener('click', () => {
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
  
  
  
  
  return (
    <div ref={canvasRef}></div>
  );
});

export default ThreeCanvas;
