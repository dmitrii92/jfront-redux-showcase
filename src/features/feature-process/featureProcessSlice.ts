import { FeatureProcess } from "./api/FeatureProcessInterface";
import { createSlice } from "@reduxjs/toolkit";
// import { Feature, FeatureCreate } from "./api/FeatureInterface";
import { AppThunk, RootState } from "./../../app/store";
// import { getFeature, createFeatureApi } from "./api/FeatureApi";

interface FeatureState {
  currentFeatureProcess: FeatureProcess;
  error: string;
  saveOnCreateFeatureProcess: boolean;
  // onFeatureCreated: boolean;
}

const initialState: FeatureState = {
  currentFeatureProcess: null,
  error: null,
  saveOnCreateFeatureProcess: false,
};

export const featureProcessSlice = createSlice({
  name: "featureProcess",
  initialState,
  reducers: {
    setSaveOnCreateFeatureProcess(state, action) {
      state.saveOnCreateFeatureProcess = action.payload;
    },
    setCurrentFeatureProcess(state, action) {
      state.currentFeatureProcess = action.payload;
    },
    getFeatureError(state, action) {
      state.error = action.payload;
      state.currentFeatureProcess = null;
    },
  },
});

export const { setCurrentFeatureProcess } = featureProcessSlice.actions;
export const { getFeatureError } = featureProcessSlice.actions;
export const { setSaveOnCreateFeatureProcess } = featureProcessSlice.actions;

export const selectFeatureProcess = (state: RootState) =>
  state.featureProcess.currentFeatureProcess;
export const selectError = (state: RootState) => state.featureProcess.error;
export const selectSaveOnCreateFeatureProcess = (state: RootState) =>
  state.featureProcess.saveOnCreateFeatureProcess;

// export const fetchFeature = (featureId: string): AppThunk => async (dispatch) => {
//   try {
//     getFeature(featureId).then((feature) => {
//       dispatch(setCurrentFeature(feature));
//     });
//   } catch (error) {
//     dispatch(getFeatureError(error));
//   }
// };

// export const createFeature = (feature: FeatureCreate): AppThunk => async (dispatch) => {
//   try {
//     createFeatureApi(feature).then((feature) => {
//       dispatch(setCurrentFeature(feature));
//       // dispatch(setCreateFeature(true));
//     });
//   } catch (error) {
//     dispatch(getFeatureError(error));
//   }
// };

export const submitSaveOnCreateFeatureProcess = (): AppThunk => async (dispatch) => {
  dispatch(setSaveOnCreateFeatureProcess(true));
};

export const submitSavedOnCreateFeatureProcess = (): AppThunk => async (dispatch) => {
  dispatch(setSaveOnCreateFeatureProcess(false));
};


export default featureProcessSlice.reducer;
