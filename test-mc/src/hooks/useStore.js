import { nanoid } from 'nanoid';
import { create } from 'zustand';
import { generateTerrain } from '../utils/terrain';

export const useStore = create((set) => ({
  // Game state
  isPlaying: false,
  startGame: () => set({ isPlaying: true }),
  
  // Texture state
  texture: 'dirt',
  setTexture: (texture) => set({ texture }),
  
  // Cubes state
  cubes: generateTerrain(),
  
  // Add cube
  addCube: (x, y, z, texture) => {
    set((state) => ({
      cubes: [
        ...state.cubes,
        {
          key: nanoid(),
          pos: [x, y, z],
          texture: texture || state.texture,
        },
      ],
    }));
  },
  
  // Remove cube
  removeCube: (x, y, z) => {
    set((state) => ({
      cubes: state.cubes.filter((cube) => {
        const [X, Y, Z] = cube.pos;
        return X !== x || Y !== y || Z !== z;
      }),
    }));
  },
  
  // Save world
  saveWorld: () => {
    set((state) => {
      const worldData = JSON.stringify(state.cubes);
      localStorage.setItem('minecraft-world', worldData);
      return state;
    });
  },
  
  // Load world
  loadWorld: () => {
    const worldData = localStorage.getItem('minecraft-world');
    if (worldData) {
      set({ cubes: JSON.parse(worldData) });
    }
  },
  
  // Reset world
  resetWorld: () => {
    set({ cubes: generateTerrain() });
  },
}));