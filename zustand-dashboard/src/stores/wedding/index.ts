// crear el store
import { create } from "zustand";
import { createPeronSlice, PersonSlice } from "./person.slice";
import { createGuestCount, GuestSlice } from "./guest.slice";
import { createDateSlice, DateSlice } from "./date.slice";
import {
  createConfirmationSlice,
  ConfirmationSlice,
} from "./confirmation.slice";
import { devtools } from "zustand/middleware";

type ShareState = PersonSlice & GuestSlice & DateSlice & ConfirmationSlice;
//interface IStore extends PersonSlice, GuestSlice {}

export const useWeddingBoundStore = create<ShareState>()(
  devtools((...a) => ({
    ...createPeronSlice(...a),
    ...createGuestCount(...a),
    ...createDateSlice(...a),
    ...createConfirmationSlice(...a),
  }))
);
