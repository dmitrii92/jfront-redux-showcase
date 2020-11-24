import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import {
  Toolbar,
  ToolbarButtonBase,
  ToolbarButtonCreate,
  ToolbarButtonDelete,
  ToolbarButtonEdit,
  ToolbarButtonFind,
  ToolbarButtonSave,
  ToolbarButtonView,
  ToolbarSplitter,
} from "@jfront/ui-core";
import { selectFeature, submitSaveOnCreate, submitSaveOnEditFeature } from "../featureSlice";
import {
  selectSearchPage,
  selectSearchPageSize,
  selectSearchResult,
  submitSearch,
} from "../featureSearchSlice";
import { Feature } from "../api/FeatureInterface";
import { selectState, Workstates } from "../../../app/WorkstateSlice";

const FeatureToolbar = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const state: Workstates = useSelector(selectState);
  const currentFeature: Feature = useSelector(selectFeature);
  const features: Array<Feature> = useSelector(selectSearchResult);
  const searchPage: number = useSelector(selectSearchPage);
  const searchPageSize: number = useSelector(selectSearchPageSize);

  return (
    <Toolbar>
      <ToolbarButtonCreate
        disabled={state === Workstates.FeatureCreate}
        onClick={() => history.push(`/create`)}
      />
      <ToolbarButtonSave
        disabled={Workstates.FeatureCreate !== state && Workstates.FeatureEdit !== state}
        onClick={() => {
          
          if (Workstates.FeatureCreate === state) {
            console.log("submitSaveOnCreate");
            dispatch(submitSaveOnCreate());
          } else if (Workstates.FeatureEdit == state) {
            console.log("submitSaveOnEdit");
            dispatch(submitSaveOnEditFeature());
          }
        }}
      />
      <ToolbarButtonEdit
        disabled={!currentFeature}
        onClick={() => {
          history.push(`/${currentFeature?.featureId}/edit`);
        }}
      />
      <ToolbarButtonDelete disabled={!currentFeature} />
      <ToolbarButtonView
        disabled={!currentFeature || Workstates.FeatureDetail === state}
        onClick={() => history.push(`/${currentFeature?.featureId}/detail`)}
      />
      <ToolbarSplitter />
      <ToolbarButtonBase
        disabled={Workstates.FeatureList !== state && features ? features.length === 0 : true}
        onClick={() => history.push(`/list/?pageSize=${searchPageSize}&page=${searchPage}`)}
      >
        {t("toolbar.list")}
      </ToolbarButtonBase>
      <ToolbarButtonFind
        disabled={state === Workstates.FeatureSearch}
        onClick={() => history.push(`/`)}
      />
      <ToolbarButtonBase
        disabled={state !== Workstates.FeatureSearch}
        type="submit"
        onClick={() => {
          dispatch(submitSearch(true));
        }}
      >
        {t("toolbar.find")}
      </ToolbarButtonBase>
    </Toolbar>
  );
};

export default FeatureToolbar;
