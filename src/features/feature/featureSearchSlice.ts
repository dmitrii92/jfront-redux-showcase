import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import queryString from "query-string";
import { Feature, FeatureSearchTemplate } from "./api/FeatureInterface";
import { getResultSetSize, postSearchRequest, searchFeatures } from "./api/FeatureSearchApi";
import { AppThunk, RootState } from "./../../app/store";
import { SearchRequest } from "../../app/common/types";

interface FeatureSearchState {
  searchTemplate: string;
  error: string;
  isLoading: boolean;
  searchResult: Array<Feature>;
  pageSize: number;
  page: number;
  submit: boolean;
}

const initialState: FeatureSearchState = {
  searchTemplate: null,
  error: null,
  isLoading: false,
  searchResult: [],
  pageSize: 25,
  page: 1,
  submit: false,
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
      state.searchResult = action.payload;
    },
    submitSearch(state, action) {
      state.submit = action.payload;
    },
  },
});

export const { setSearchTemplate } = featureSearchSlice.actions;
export const { searchError } = featureSearchSlice.actions;
export const { isLoading } = featureSearchSlice.actions;
export const { searchSuccess } = featureSearchSlice.actions;
export const { submitSearch } = featureSearchSlice.actions;

export const selectSearchResult = (state: RootState) => state.featureSearch.searchResult;
export const selectError = (state: RootState) => state.featureSearch.error;
export const selectIsLoading = (state: RootState) => state.featureSearch.isLoading;
export const selectSearchTemplate = (state: RootState) => state.featureSearch.searchTemplate;
export const selectSearchPageSize = (state: RootState) => state.featureSearch.pageSize;
export const selectSearchPage = (state: RootState) => state.featureSearch.page;
export const selectSearchSubmit = (state: RootState) => state.featureSearch.submit;

export const fetchSearchFeatures = (
  searchRequestString: string,
  pageSize,
  page
): AppThunk => async (dispatch) => {
  try {
    let searchTemplate = queryString.parse(searchRequestString);
    if (searchTemplate.page) {
      delete searchTemplate.page;
    }
    if (searchTemplate.pageSize) {
      delete searchTemplate.pageSize;
    }
    let searchRequest: SearchRequest<FeatureSearchTemplate> = {
      template: searchTemplate,
    };

    dispatch(isLoading(true));
    postSearchRequest(searchRequest).then((searchId) => {
      getResultSetSize(searchId).then((resultSize) => {
        if (resultSize > 0) {
          if (searchId) {
            searchFeatures(searchId, pageSize, page).then((features) => {
              dispatch(searchSuccess(features));
              dispatch(setSearchTemplate(searchRequestString));
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
