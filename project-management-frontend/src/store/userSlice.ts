import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: number | null;
  name: string | null;
  email: string | null;
}

interface UserState {
  user: User;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  user: {
    id: null,
    name: null,
    email: null,
  },
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.user = initialState.user;
      state.isAuthenticated = false;
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
  },
});

export const { login, logout, setUser } = userSlice.actions;
export default userSlice.reducer;
