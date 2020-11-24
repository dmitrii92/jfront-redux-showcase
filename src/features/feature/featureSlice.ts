import { createSlice } from "@reduxjs/toolkit";
import { Feature, FeatureCreate } from "./api/FeatureInterface";
import { AppThunk, RootState } from "./../../app/store";
import { getFeature, createFeatureApi } from "./api/FeatureApi";

interface FeatureState {
  currentFeature: Feature;
  error: string;
  saveOnCreateFeature: boolean;
  saveOnEditFeature: boolean;
  // onFeatureCreated: boolean;
}

const initialState: FeatureState = {
  currentFeature: null,
  error: null,
  saveOnCreateFeature: false,
  saveOnEditFeature: false,
};

export const featureSlice = createSlice({
  name: "feature",
  initialState,
  reducers: {
    setCreateFeature(state, action) {
      state.saveOnCreateFeature = action.payload;
    },
    setSaveOnEditFeature(state, action) {
      state.saveOnEditFeature = action.payload;
    },
    // setFeatureCreated(state, action) {
    //   state.saveOnCreateFeature = action.payload;
    // },
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
export const { setCreateFeature } = featureSlice.actions;
export const { setSaveOnEditFeature } = featureSlice.actions;

export const selectFeature = (state: RootState) => state.feature.currentFeature;
export const selectError = (state: RootState) => state.feature.error;
export const selectSaveOnCreateFeature = (state: RootState) => state.feature.saveOnCreateFeature;
export const selectSaveOnEditFeature = (state: RootState) => state.feature.saveOnEditFeature;
// export const selectOnFeatureCreated = (state: RootState) => state.feature.onFeatureCreated;

export const fetchFeature = (featureId: string): AppThunk => async (dispatch) => {
  try {
    getFeature(featureId).then((feature) => {
      dispatch(setCurrentFeature(feature));
    });
  } catch (error) {
    dispatch(getFeatureError(error));
  }
};

export const createFeature = (feature: FeatureCreate): AppThunk => async (dispatch) => {
  try {
    createFeatureApi(feature).then((feature) => {
      dispatch(setCurrentFeature(feature));
      // dispatch(setCreateFeature(true));
    });
  } catch (error) {
    dispatch(getFeatureError(error));
  }
};

export const submitSaveOnCreate = (): AppThunk => async (dispatch) => {
  dispatch(setCreateFeature(true));
};

export const submitSavedOnCreate = (): AppThunk => async (dispatch) => {
  dispatch(setCreateFeature(false));
};

export const submitSaveOnEditFeature = (): AppThunk => async (dispatch) => {
  dispatch(setSaveOnEditFeature(true));
};

export const submitSavedOnEditFeature = (): AppThunk => async (dispatch) => {
  dispatch(setSaveOnEditFeature(false));
};

export default featureSlice.reducer;
