import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { useStore } from '../hooks/useStore';

const FPSControls = () => {
  const { camera } = useThree();
  const { isPlaying } = useStore();

  useEffect(() => {
    // Lock pointer when game is playing
    const handleClick = () => {
      if (isPlaying) {
        document.body.requestPointerLock();
      }
    };

    // Handle pointer lock change
    const handlePointerLockChange = () => {
      if (document.pointerLockElement === document.body) {
        console.log('Pointer locked');
      } else {
        console.log('Pointer unlocked');
      }
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('pointerlockchange', handlePointerLockChange);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('pointerlockchange', handlePointerLockChange);
    };
  }, [isPlaying]);

  useEffect(() => {
    // Handle mouse movement for camera rotation with throttling
    let lastTime = 0;
    const throttleMs = 10; // Throttle to 10ms
    const sensitivity = 500; // Sensitivity factor
    
    const handleMouseMove = (e) => {
      // Skip if pointer is not locked
      if (document.pointerLockElement !== document.body) return;
      
      // Throttle updates
      const now = performance.now();
      if (now - lastTime < throttleMs) return;
      lastTime = now;
      
      // Adjust camera rotation based on mouse movement
      camera.rotation.y -= e.movementX / sensitivity;
      
      // Limit vertical rotation to prevent camera flipping
      const newRotationX = camera.rotation.x - e.movementY / sensitivity;
      if (newRotationX < Math.PI / 2 && newRotationX > -Math.PI / 2) {
        camera.rotation.x = newRotationX;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [camera]);

  return null;
};

export default FPSControls;