import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api";

const reducers = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: process.env.NODE_ENV !== "production",
  });
};

export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
