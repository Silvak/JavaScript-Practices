import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sky, PointerLockControls } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import { useStore } from '../hooks/useStore';
import Player from './Player';
import Terrain from './Terrain';
import FPSControls from './FPSControls';
import HUD from './HUD';

const MinecraftGame = () => {
  const controlsRef = useRef();
  const { isPlaying, startGame } = useStore();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Escape') {
        document.exitPointerLock();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      {!isPlaying ? (
        <div className="menu">
          <h1>Minecraft Clone</h1>
          <button onClick={startGame}>Start Game</button>
        </div>
      ) : (
        <>
          <Canvas shadows={false}>
            <Sky sunPosition={[100, 100, 20]} />
            <ambientLight intensity={0.5} />
            <directionalLight 
              position={[10, 10, 5]} 
              intensity={0.8} 
            />
            <Physics>
              <Player position={[0, 5, 0]} />
              <Terrain />
            </Physics>
            <FPSControls />
            <PointerLockControls ref={controlsRef} />
          </Canvas>
          <HUD />
        </>
      )}
    </div>
  );
};

export default MinecraftGame;