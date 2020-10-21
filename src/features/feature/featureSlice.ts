import { Feature } from "./api/FeatureInterface";
import { AppThunk, RootState } from "./../../app/store";
import { createSlice } from "@reduxjs/toolkit";

interface FeatureState {
  currentFeature: Feature;
}

const initialState: FeatureState = {
  currentFeature: null,
};

export const featureSlice = createSlice({
  name: "feature",
  initialState,
  reducers: {
    setCurrentFeature(state, action) {
      state.currentFeature = action.payload;
    },
  },
});

export const { setCurrentFeature } = featureSlice.actions;

export const selectFeature = (state: RootState) => state.feature.currentFeature;

export const fetchFeature = (): AppThunk => async (dispatch) => {
  try {
  } catch (err) {}
};

export default featureSlice.reducer;
