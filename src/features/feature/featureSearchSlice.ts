import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Feature, FeatureSearchTemplate } from "./api/FeatureInterface";
import { getResultSetSize, postSearchRequest, searchFeatures } from "./api/FeatureSearchApi";
import { AppThunk, RootState } from "./../../app/store";
import { SearchRequest } from "../../app/common/types";

interface FeatureSearchState {
  searchTemplate: FeatureSearchTemplate;
  error: string;
  isLoading: boolean;
  searchResult: Array<Feature>;
}

const initialState: FeatureSearchState = {
  searchTemplate: null,
  error: null,
  isLoading: false,
  searchResult: [],
};

export const featureSearchSlice = createSlice({
  name: "featureSearch",
  initialState,
  reducers: {
    setSearchTemplate(state, action) {
      state.searchTemplate = action.payload;
    },
    searchError(state, action) {
      state.error = action.payload;
      state.searchTemplate = null;
      state.searchResult = [];
    },
    isLoading(state, action) {
      state.isLoading = action.payload;
    },
    searchSuccess(state, action: PayloadAction<Array<Feature>>) {
      console.log("searchSuccess: ");
      console.log(action.payload);
      state.searchResult = action.payload;
    },
  },
});

export const { setSearchTemplate } = featureSearchSlice.actions;
export const { searchError } = featureSearchSlice.actions;
export const { isLoading } = featureSearchSlice.actions;
export const { searchSuccess } = featureSearchSlice.actions;

export const selectSearchResult = (state: RootState) => state.featureSearch.searchResult;
export const selectError = (state: RootState) => state.featureSearch.error;
export const selectIsLoading = (state: RootState) => state.featureSearch.isLoading;

export const fetchSearchFeatures = (
  searchRequest: SearchRequest<FeatureSearchTemplate>,
  pageSize,
  page
): AppThunk => async (dispatch) => {
  try {
    dispatch(isLoading(true));
    postSearchRequest(searchRequest).then((searchId) => {
      getResultSetSize(searchId).then((resultSize) => {
        if (resultSize > 0) {
          if (searchId) {
            searchFeatures(searchId, pageSize, page).then((features) => {
              dispatch(searchSuccess(features));
              dispatch(isLoading(false));
            });
          }
        } else {
          alert("Search empty!");
          dispatch(isLoading(false));
        }
      });
    });
  } catch (err) {
    dispatch(isLoading(false));
    dispatch(searchError(err));
  }
};

export default featureSearchSlice.reducer;
