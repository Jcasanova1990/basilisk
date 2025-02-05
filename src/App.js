import React, { useEffect, useRef } from 'react';
import styles from './App.module.scss';
import { useMediaQuery } from 'react-responsive';
import ThreeCanvas from './components/ThreeCanvas';

function App() {
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' });
  const gameRef = useRef(null);

  useEffect(() => {
    if (gameRef.current) {
      gameRef.current.startGame();
    }
  }, []);

  if (isMobile) {
    return (
      <div className={styles.MobileMessage}>
        <p>Sorry, this site is currently not available on mobile devices at this time. Please visit on a tablet, laptop, or desktop.</p>
      </div>
    );
  }

  return (
    <div className={styles.App}>
      <ThreeCanvas ref={gameRef} />
    </div>
  );
}

export default App;
