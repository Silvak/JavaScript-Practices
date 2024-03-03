import { createJSONStorage, StateStorage } from "zustand/middleware";

const firebaseUrl = import.meta.env.VITE_FIREBASE_URL + "zustand";

// gravar info en sessionStorage con una customSessionStore
const storageApi: StateStorage = {
  getItem: async function (name: string): Promise<string | null> {
    try {
      const data = await fetch(`${firebaseUrl}/${name}.json`).then((res) =>
        res.json()
      );
      return JSON.stringify(data);
    } catch (error) {
      console.error(error);
    }
  },
  setItem: async function (name: string, value: string): Promise<void> {
    const data = await fetch(`${firebaseUrl}/${name}.json`, {
      method: "PUT",
      body: value,
    }).then((res) => res.json());
    return;
  },
  removeItem: function (name: string): void | Promise<void> {
    console.log("removeItem", { name });
  },
};

export const firebaseStorage = createJSONStorage(() => storageApi);
