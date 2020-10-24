import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import featureReducer from "../features/feature/featureSlice";
import featureSearchReducer from "../features/feature/featureSearchSlice";
import WorkstateReducer from "./WorkstateSlice";

export const store = configureStore({
  reducer: {
    feature: featureReducer,
    featureSearch: featureSearchReducer,
    Workstate: WorkstateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
