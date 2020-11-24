import React, { useEffect, useState } from "react";
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
import { selectState, Workstates } from "../../../app/WorkstateSlice";
import { selectFeature } from "../../feature/featureSlice";
import { Feature } from "../../feature/api/FeatureInterface";
import { selectFeatureProcess, submitSaveOnCreateFeatureProcess } from "../featureProcessSlice";
import { deleteFeatureProcess } from "../api/FeatureProcessApi";

const FeatureProcessToolbar = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const state: Workstates = useSelector(selectState);
  const currentFeatureProcess = useSelector(selectFeatureProcess);
  const currentFeature: Feature = useSelector(selectFeature);

  return (
    <Toolbar>
      <ToolbarButtonCreate
        disabled={Workstates.FeatureProcessCreate === state}
        onClick={() => history.push(`feature-process/create`)}
      />
      <ToolbarButtonSave
        disabled={Workstates.FeatureProcessCreate !== state}
        onClick={() => {
          if (Workstates.FeatureProcessCreate === state) {
            console.log("submitSaveOnCreate");
            dispatch(submitSaveOnCreateFeatureProcess());
          }
        }}
      />
      <ToolbarButtonDelete
        disabled={!currentFeatureProcess}
        onClick={() => {
          if (currentFeature.featureId && currentFeatureProcess.featureProcessId) {
            deleteFeatureProcess(
              parseInt(currentFeature.featureId.toString()),
              parseInt(currentFeatureProcess.featureProcessId)
            ).then(() => {
              history.push(`/${currentFeature.featureId}/feature-process`);
            });
          }
        }}
      />
      <ToolbarButtonView
        disabled={!currentFeatureProcess || Workstates.FeatureProcessDetail === state}
        onClick={() =>
          history.push(
            `/${currentFeature?.featureId}/feature-process/${currentFeatureProcess?.featureProcessId}/detail`
          )
        }
      />
      <ToolbarSplitter />
      <ToolbarButtonBase
        disabled={Workstates.FeatureProcessList === state}
        onClick={() => {
          history.push(`/${currentFeature.featureId}/feature-process`);
        }}
      >
        {t("toolbar.list")}
      </ToolbarButtonBase>
      {/* <ToolbarButtonFind disabled={!currentFeatureProcess} /> */}
      {/* <ToolbarButtonBase disabled={!currentFeatureProcess}>{t("toolbar.find")}</ToolbarButtonBase> */}
    </Toolbar>
  );
};

export default FeatureProcessToolbar;
