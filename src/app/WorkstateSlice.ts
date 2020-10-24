import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface WorkState {
  state: Workstates;
}

export enum Workstates {
  FeatureDetail,
  FeatureEdit,
  FeatureCreate,
  FeatureSearch,
  FeatureList,
  FeatureProcessDetail,
  FeatureProcessCreate,
  FeatureProcessSearch,
  FeatureProcessList,
}

const initialState: WorkState = {
  state: null,
};

export const WorkstateSlice = createSlice({
  name: "workstate",
  initialState,
  reducers: {
    setState(state, action) {
      state.state = action.payload;
    },
  },
});

export const { setState } = WorkstateSlice.actions;
export const selectState = (state: RootState) => state.Workstate.state;

export default WorkstateSlice.reducer;
