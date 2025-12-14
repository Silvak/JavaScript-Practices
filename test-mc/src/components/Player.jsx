import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useSphere } from '@react-three/cannon';
import * as THREE from 'three';
import { Vector3 } from 'three';
import { useKeyboard } from '../hooks/useKeyboard';
import { useStore } from '../hooks/useStore';

const JUMP_FORCE = 5;
const SPEED = 5;
const GRAVITY = 20; // Minecraft-like gravity

const Player = (props) => {
  const { camera } = useThree();
  const { moveForward, moveBackward, moveLeft, moveRight, jump } = useKeyboard();
  const { addCube, removeCube } = useStore();
  
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: 'Dynamic',
    position: [0, 5, 0],
    ...props
  }));

  // Player velocity
  const velocity = useRef([0, 0, 0]);
  useEffect(() => {
    api.velocity.subscribe((v) => (velocity.current = v));
  }, [api.velocity]);

  // Player position
  const position = useRef([0, 0, 0]);
  useEffect(() => {
    api.position.subscribe((p) => (position.current = p));
  }, [api.position]);

  // Handle player movement (optimized)
  useFrame((state, delta) => {
    // Update camera position
    camera.position.copy(new Vector3(position.current[0], position.current[1], position.current[2]));

    // Calculate movement direction
    const direction = new Vector3();
    
    if (moveForward || moveBackward) {
      direction.z = moveBackward ? 1 : (moveForward ? -1 : 0);
    }
    
    if (moveLeft || moveRight) {
      direction.x = moveLeft ? -1 : (moveRight ? 1 : 0);
    }

    // Only normalize and apply if there's actual movement
    if (direction.length() > 0) {
      direction.normalize()
        .multiplyScalar(SPEED)
        .applyEuler(camera.rotation);
      
      // Apply horizontal movement while preserving vertical velocity
      api.velocity.set(direction.x, velocity.current[1], direction.z);
    } else if (!moveForward && !moveBackward && !moveLeft && !moveRight) {
      // Stop horizontal movement when no keys are pressed
      api.velocity.set(0, velocity.current[1], 0);
    }

    // Handle jumping - only when on ground
    const isOnGround = Math.abs(velocity.current[1]) < 0.05;
    
    if (jump && isOnGround) {
      api.velocity.set(velocity.current[0], JUMP_FORCE, velocity.current[2]);
    }
    
    // Apply gravity when in air
    if (!isOnGround) {
      // Apply gravity but don't override existing horizontal velocity
      api.velocity.set(
        velocity.current[0],
        Math.max(velocity.current[1] - GRAVITY * delta, -20), // Limit fall speed
        velocity.current[2]
      );
    }
  });

  // Use a simpler approach for cube placement and removal (optimized)
  // In a real implementation, you would use raycasting with proper scene references
  useEffect(() => {
    // Create reusable vectors to avoid creating new objects on each click
    const direction = new Vector3();
    const pos = new Vector3();
    const targetPos = new Vector3();
    
    const handleClick = (e) => {
      // Throttle clicks to prevent excessive updates
      if (e._isProcessed) return;
      e._isProcessed = true;
      
      // Get the direction the camera is facing
      camera.getWorldDirection(direction);
      
      // Use current camera position
      pos.copy(camera.position);
      
      // For removing cubes (left click)
      if (e.button === 0) {
        // Try to remove a cube 3 units in front of the camera
        targetPos.copy(pos).addScaledVector(direction, 3);
        removeCube(
          Math.round(targetPos.x),
          Math.round(targetPos.y),
          Math.round(targetPos.z)
        );
      }
      // For adding cubes (right click)
      else if (e.button === 2) {
        // Add a cube 4 units in front of the camera
        targetPos.copy(pos).addScaledVector(direction, 4);
        addCube(
          Math.round(targetPos.x),
          Math.round(targetPos.y),
          Math.round(targetPos.z),
          null // Use the currently selected texture
        );
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [addCube, removeCube, camera]);

  return <mesh ref={ref} />
};

export default Player;