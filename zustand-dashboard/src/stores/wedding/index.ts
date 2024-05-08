// crear el store
import { create } from "zustand";
import { createPeronSlice, PersonSlice } from "./person.slice";
import { devtools } from "zustand/middleware";

type ShareState = PersonSlice;

export const useWeddingBoundStore = create<ShareState>()(
  devtools((...a) => ({
    ...createPeronSlice(...a),
  }))
);
