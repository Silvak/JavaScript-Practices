// crear el store
import { create } from "zustand";
import { createPeronSlice, PersonSlice } from "./person.slice";
import { createGuestCount, GuestSlice } from "./guest.slice";
import { createDateSlice, DateSlice } from "./date.slice";
import { devtools, persist } from "zustand/middleware";

type ShareState = PersonSlice & GuestSlice & DateSlice;
//interface IStore extends PersonSlice, GuestSlice {}

export const useWeddingBoundStore = create<ShareState>()(
  devtools((...a) => ({
    ...createPeronSlice(...a),
    ...createGuestCount(...a),
    ...createDateSlice(...a),
  }))
);
