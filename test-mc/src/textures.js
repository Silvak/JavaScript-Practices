import { TextureLoader, NearestFilter, RepeatWrapping } from 'three';

// Create texture loader
const loader = new TextureLoader();

// Function to create a texture with the correct settings
const createTexture = (path) => {
  const texture = loader.load(path);
  texture.magFilter = NearestFilter; // Pixelated look
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  return texture;
};

// Export textures
export const grassTexture = createTexture('/textures/grass.svg');
export const dirtTexture = createTexture('/textures/dirt.svg');
export const logTexture = createTexture('/textures/log.svg');
export const woodTexture = createTexture('/textures/wood.svg');
export const glassTexture = createTexture('/textures/glass.svg');
export const stoneTexture = createTexture('/textures/stone.svg');
export const leavesTexture = createTexture('/textures/leaves.svg');