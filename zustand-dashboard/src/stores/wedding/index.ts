// crear el store
import { create } from "zustand";
import { createPeronSlice, PersonSlice } from "./person.slice";
import { createGuestCount, GuestSlice } from "./guest.slice";
import { devtools } from "zustand/middleware";

type ShareState = PersonSlice & GuestSlice;
//interface IStore extends PersonSlice, GuestSlice {}

export const useWeddingBoundStore = create<ShareState>()(
  devtools((...a) => ({
    ...createPeronSlice(...a),
    ...createGuestCount(...a),
  }))
);
