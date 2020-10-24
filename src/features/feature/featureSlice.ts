import { createSlice } from "@reduxjs/toolkit";
import { Feature } from "./api/FeatureInterface";
import { AppThunk, RootState } from "./../../app/store";
import { getFeature } from "./api/FeatureApi";

interface FeatureState {
  currentFeature: Feature;
  error: string;
}

const initialState: FeatureState = {
  currentFeature: null,
  error: null,
};

export const featureSlice = createSlice({
  name: "feature",
  initialState,
  reducers: {
    setCurrentFeature(state, action) {
      state.currentFeature = action.payload;
    },
    getFeatureError(state, action) {
      state.error = action.payload;
      state.currentFeature = null;
    },
  },
});

export const { setCurrentFeature } = featureSlice.actions;
export const { getFeatureError } = featureSlice.actions;

export const selectFeature = (state: RootState) => state.feature.currentFeature;
export const selectError = (state: RootState) => state.feature.error;

export const fetchFeature = (featureId: string): AppThunk => async (dispatch) => {
  try {
    getFeature(featureId).then((feature) => {
      dispatch(setCurrentFeature(feature));
    });
  } catch (error) {
    dispatch(getFeatureError(error));
  }
};

export default featureSlice.reducer;
