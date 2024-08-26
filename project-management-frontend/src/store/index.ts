import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./projectSlice";
import taskReducer from "./taskSlice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    projects: projectReducer,
    tasks: taskReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
