import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import newsListSlice from "./NewsSlice";

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

const rootReducer = combineReducers({
  newsList: newsListSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
