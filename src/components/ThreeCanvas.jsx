import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html } from '@react-three/drei';

// Constants
const GAME_SIZE = 850; // Overall game size
const GRID_SIZE = 5;
const SPEED = 150;

// Custom boundary sizes for each side
const BOUNDARY_LEFT = -40;   // Left boundary
const BOUNDARY_RIGHT = 42;   // Right boundary
const BOUNDARY_TOP = 42;     // Top boundary
const BOUNDARY_BOTTOM = -40; // Bottom boundary

// Utility function to get random position
const getRandomPosition = () => ({
  x: Math.floor(Math.random() * (GAME_SIZE / GRID_SIZE)) * GRID_SIZE - GAME_SIZE / 2,
  y: Math.floor(Math.random() * (GAME_SIZE / GRID_SIZE)) * GRID_SIZE - GAME_SIZE / 2,
});

// The main SnakeGame component
const SnakeGame = React.forwardRef((props, ref) => {
  const [snake, setSnake] = useState([{ x: 0, y: 0 }]);
  const [direction, setDirection] = useState({ x: GRID_SIZE, y: 0 });
  const [fruit, setFruit] = useState(getRandomPosition());
  const [bomb, setBomb] = useState(getRandomPosition());
  const [score, setScore] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);  // Track if game has started
  const gameLoop = useRef(null);

  // Handle key press for snake movement
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (!isGameStarted) {
        setIsGameStarted(true);  // Start the game when any key is pressed
      }

      if (event.key === "ArrowUp" && direction.y === 0) setDirection({ x: 0, y: GRID_SIZE });
      if (event.key === "ArrowDown" && direction.y === 0) setDirection({ x: 0, y: -GRID_SIZE });
      if (event.key === "ArrowLeft" && direction.x === 0) setDirection({ x: -GRID_SIZE, y: 0 });
      if (event.key === "ArrowRight" && direction.x === 0) setDirection({ x: GRID_SIZE, y: 0 });
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [direction, isGameStarted]);

  // Main game loop for updating the snake
  useEffect(() => {
    if (!isGameStarted) return;  // Only start the game loop once a key has been pressed

    gameLoop.current = setInterval(() => {
      setSnake((prevSnake) => {
        let newHead = {
          x: prevSnake[0].x + direction.x,
          y: prevSnake[0].y + direction.y,
        };

        // Wall collision (Game Over) - Custom boundaries for each side
        if (
          newHead.x < BOUNDARY_LEFT || newHead.x >= BOUNDARY_RIGHT ||
          newHead.y < BOUNDARY_BOTTOM || newHead.y >= BOUNDARY_TOP
        ) {
          console.log("Hit boundary - Game Over!");
          resetGame();
          return [{ x: 0, y: 0 }];
        }

        // Self collision
        if (prevSnake.some((seg) => seg.x === newHead.x && seg.y === newHead.y)) {
          resetGame();
          return [{ x: 0, y: 0 }];
        }

        let newSnake = [newHead, ...prevSnake];

        // Fruit collision (Grow snake, +1 point)
        if (newHead.x === fruit.x && newHead.y === fruit.y) {
          setFruit(getRandomPosition());
          setScore((s) => s + 1);
        } else {
          newSnake.pop(); // Keep snake length constant unless it grows
        }

        // Bomb collision (Shrink snake, -1 point, game over if score reaches -1)
        if (newHead.x === bomb.x && newHead.y === bomb.y) {
          setBomb(getRandomPosition());
          setScore((s) => s - 1);
          if (newSnake.length > 1) {
            newSnake.pop(); // Shrink snake
          } else {
            resetGame(); // Game Over
            return [{ x: 0, y: 0 }];
          }
        }

        return newSnake;
      });
    }, SPEED);

    return () => clearInterval(gameLoop.current);
  }, [direction, fruit, bomb, isGameStarted]);

  // Reset game when game over occurs
  const resetGame = () => {
    alert("Game Over!");
    setSnake([{ x: 0, y: 0 }]);
    setDirection({ x: GRID_SIZE, y: 0 });
    setFruit(getRandomPosition());
    setBomb(getRandomPosition());
    setScore(0);
    setIsGameStarted(false);  // Stop game until a key is pressed again
  };

  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h2 style={{ color: "white" }}>Score: {score}</h2>
      <Canvas
        style={{
          background: `url('/img/grass.png') no-repeat center center / cover`,
          width: GAME_SIZE,
          height: GAME_SIZE,
        }}
        orthographic
        camera={{ zoom: 10, position: [0, 0, 100] }}
      >
        {/* Render Snake */}
        {snake.map((segment, index) => (
          <mesh key={index} position={[segment.x, segment.y, 0]}>
            <boxGeometry args={[GRID_SIZE, GRID_SIZE, GRID_SIZE]} />
            <meshStandardMaterial color={index === 0 ? "limegreen" : "green"} />
          </mesh>
        ))}

        {/* Render Fruit */}
        <mesh position={[fruit.x, fruit.y, 0]}>
          <sphereGeometry args={[GRID_SIZE / 2, 16, 16]} />
          <meshStandardMaterial color="red" />
        </mesh>

        {/* Render Bomb */}
        <mesh position={[bomb.x, bomb.y, 0]}>
          <sphereGeometry args={[GRID_SIZE / 2, 16, 16]} />
          <meshStandardMaterial color="purple" />
        </mesh>

        {/* Lighting */}
        <ambientLight />
      </Canvas>
    </div>
  );
});

export default SnakeGame;
