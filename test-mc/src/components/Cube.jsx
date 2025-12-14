import React, { useState } from 'react';
import { useBox } from '@react-three/cannon';
import { useStore } from '../hooks/useStore';
import * as textures from '../textures';

const Cube = ({ position, texture }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [ref] = useBox(() => ({
    type: 'Static',
    position,
  }));
  const addCube = useStore((state) => state.addCube);
  const removeCube = useStore((state) => state.removeCube);
  const activeTexture = useStore((state) => state.texture);

  const handleClick = (e) => {
    e.stopPropagation();
    
    const clickedFace = Math.floor(e.faceIndex / 2);
    const { x, y, z } = ref.current.position;
    
    if (e.button === 0) { // Left click - remove cube
      removeCube(x, y, z);
      return;
    }
    
    if (e.button === 2) { // Right click - add cube
      // Calculate the position for the new cube based on the clicked face
      const positions = [
        [x + 1, y, z], // right
        [x - 1, y, z], // left
        [x, y + 1, z], // top
        [x, y - 1, z], // bottom
        [x, y, z + 1], // front
        [x, y, z - 1], // back
      ];
      
      const newPosition = positions[clickedFace];
      addCube(...newPosition, activeTexture);
    }
  };

  // Get the texture for the cube
  const currentTexture = textures[texture + 'Texture'];

  return (
    <mesh 
      ref={ref} 
      onPointerMove={(e) => {
        e.stopPropagation();
        setIsHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setIsHovered(false);
      }}
      onClick={handleClick}
      onContextMenu={handleClick}
    >
      <boxGeometry />
      <meshStandardMaterial 
        map={currentTexture} 
        color={isHovered ? 'grey' : 'white'} 
        transparent={true}
        opacity={texture === 'glass' ? 0.7 : 1}
      />
    </mesh>
  );
};

export default Cube;