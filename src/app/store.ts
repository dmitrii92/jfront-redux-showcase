import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
// import calculatorReducer from '../features/calculator/calculatorSlice';
import featureReducer from "../features/feature/featureSlice";

export const store = configureStore({
  reducer: {
    feature: featureReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
