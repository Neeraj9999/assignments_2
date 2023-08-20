import { createSlice } from "@reduxjs/toolkit";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  status: boolean;
};
type CounterState = {
  user: {
    id: string | null;
    firstName: string | null;
    lastName: string | null;
    status: boolean | null;
  }[];
};

const initialState: CounterState = {
  user: [],
};

export const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, { payload }: { payload: User }) => {
      state.user.push(payload);
    },
    deleteUser: (state, { payload }: { payload: string }) => {
      state.user = state.user.filter((user) => user.id !== payload);
    },
    updateUser: (state, { payload }: { payload: User }) => {
      const index = state.user.findIndex(
        (user) => user.id === payload.id
      );
      if (index > -1) {
        state.user = [
          ...state.user.slice(0, index),
          payload,
          ...state.user.slice(index + 1),
        ];
      }
    },
  },
});

export const { addUser, updateUser, deleteUser } = counterSlice.actions;
export const selectUser = (state: any) => state.user.user;

export default counterSlice.reducer;
