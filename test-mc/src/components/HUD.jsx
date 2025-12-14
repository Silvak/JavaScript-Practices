import React from 'react';
import { useStore } from '../hooks/useStore';
import * as textures from '../textures';

const HUD = () => {
  const activeTexture = useStore((state) => state.texture);
  const setTexture = useStore((state) => state.setTexture);

  // List of available textures
  const texturesList = Object.keys(textures).filter(texture => 
    texture.includes('Texture')
  ).map(texture => texture.replace('Texture', ''));

  return (
    <div className="hud">
      {/* Crosshair */}
      <div className="crosshair">
        +
      </div>
      
      {/* Texture selector */}
      <div className="texture-selector">
        {texturesList.map(texture => {
          return (
            <div 
              key={texture} 
              className={`texture-item ${activeTexture === texture ? 'active' : ''}`}
              onClick={() => setTexture(texture)}
            >
              <img 
                src={`/textures/${texture}.svg`} 
                alt={texture} 
              />
            </div>
          );
        })}
      </div>
      
      {/* Instructions */}
      <div className="instructions">
        <p>Left click: Remove block</p>
        <p>Right click: Place block</p>
        <p>WASD: Move</p>
        <p>Space: Jump</p>
        <p>1-9: Select block type</p>
        <p>ESC: Pause</p>
      </div>
    </div>
  );
};

export default HUD;