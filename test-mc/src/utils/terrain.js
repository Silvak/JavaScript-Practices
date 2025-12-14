import { nanoid } from 'nanoid';
import { createNoise2D } from 'simplex-noise';

// Create a new simplex noise instance
const noise2D = createNoise2D();

// Generate a flat terrain with some hills
export const generateTerrain = () => {
  const terrain = [];
  
  // Size of the terrain (reduced for performance)
  const size = 10;
  const height = 10;
  
  // Generate terrain using simplex noise
  for (let x = -size; x <= size; x++) {
    for (let z = -size; z <= size; z++) {
      // Generate height using simplex noise
      const elevation = Math.floor(
        noise2D(x * 0.1, z * 0.1) * 2 + 
        noise2D(x * 0.2, z * 0.2) * 1
      );
      
      // Base height
      const y = elevation;
      
      // Add ground blocks
      terrain.push({
        key: nanoid(),
        pos: [x, y, z],
        texture: 'grass',
      });
      
      // Add dirt blocks below the surface
      for (let i = 0; i < 3; i++) {
        terrain.push({
          key: nanoid(),
          pos: [x, y - i - 1, z],
          texture: 'dirt',
        });
      }
      
      // Add stone blocks at the bottom (reduced for performance)
      for (let i = 0; i < 3; i++) {
        terrain.push({
          key: nanoid(),
          pos: [x, y - i - 4, z],
          texture: 'stone',
        });
      }
      
      // Randomly add trees (reduced probability for performance)
      if (Math.random() < 0.005) {
        // Tree trunk
        for (let i = 0; i < 5; i++) {
          terrain.push({
            key: nanoid(),
            pos: [x, y + i + 1, z],
            texture: 'log',
          });
        }
        
        // Tree leaves (simplified for performance)
        for (let lx = -1; lx <= 1; lx++) {
          for (let ly = 0; ly <= 1; ly++) {
            for (let lz = -1; lz <= 1; lz++) {
              // Skip the center where the trunk is
              if (lx === 0 && lz === 0 && ly < 1) continue;
              
              terrain.push({
                key: nanoid(),
                pos: [x + lx, y + 5 + ly, z + lz],
                texture: 'leaves',
              });
            }
          }
        }
      }
    }
  }
  
  return terrain;
};

// Generate a flat world for testing
export const generateFlatWorld = () => {
  const terrain = [];
  
  // Size of the terrain
  const size = 20;
  
  // Generate a flat terrain
  for (let x = -size; x <= size; x++) {
    for (let z = -size; z <= size; z++) {
      terrain.push({
        key: nanoid(),
        pos: [x, 0, z],
        texture: 'grass',
      });
      
      // Add dirt below
      for (let i = 0; i < 3; i++) {
        terrain.push({
          key: nanoid(),
          pos: [x, -i - 1, z],
          texture: 'dirt',
        });
      }
      
      // Add stone at the bottom
      for (let i = 0; i < 3; i++) {
        terrain.push({
          key: nanoid(),
          pos: [x, -i - 4, z],
          texture: 'stone',
        });
      }
    }
  }
  
  return terrain;
};