import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
import { selectFeature } from "../featureSlice";
import { selectSearchResult } from "../featureSearchSlice";
import { Feature } from "../api/FeatureInterface";
import { selectState, Workstates } from "../../../app/WorkstateSlice";

const FeatureToolbar = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const state: Workstates = useSelector(selectState);
  const currentFeature: Feature = useSelector(selectFeature);
  const features: Array<Feature> = useSelector(selectSearchResult);

  const [buttonCreateEnabled, setButtonCreateEnabled] = useState(false);
  const [buttonEditEnabled, setButtonEditEnabled] = useState(false);
  const [buttonSaveEnabled, setButtonSaveEnabled] = useState(false);
  const [buttonDeleteEnabled, setButtonDeleteEnabled] = useState(false);
  const [buttonViewEnabled, setButtonViewEnabled] = useState(false);
  const [buttonListEnabled, setButtonListEnabled] = useState(false);
  const [buttonFindEnabled, setButtonFindEnabled] = useState(false);
  const [buttonSearchEnabled, setButtonSearchEnabled] = useState(false);

  useEffect(() => {
    switch (state) {
      case Workstates.FeatureCreate:
        setButtonCreateEnabled(true);
        break;
      case Workstates.FeatureDetail:
        setButtonCreateEnabled(true);
        break;
      case Workstates.FeatureEdit:
        setButtonCreateEnabled(true);
        break;
      case Workstates.FeatureList:
        setButtonCreateEnabled(true);
        break;
      case Workstates.FeatureSearch:
        setButtonCreateEnabled(true);
        break;
      case Workstates.FeatureProcessCreate:
        setButtonCreateEnabled(false);
        break;
      case Workstates.FeatureProcessDetail:
        setButtonCreateEnabled(false);
        break;
      case Workstates.FeatureProcessList:
        setButtonCreateEnabled(false);
        break;
      case Workstates.FeatureProcessSearch:
        setButtonCreateEnabled(false);
        break;
      default:
        break;
    }
  }, [state]);

  return (
    <Toolbar>
      <ToolbarButtonCreate
        disabled={!buttonCreateEnabled}
        onClick={() => history.push(`/create`)}
      />
      <ToolbarButtonSave disabled={!buttonSaveEnabled} />
      <ToolbarButtonEdit
        disabled={!currentFeature}
        onClick={() => history.push(`/${currentFeature?.featureId}/edit`)}
      />
      <ToolbarButtonDelete disabled={!buttonDeleteEnabled} />
      <ToolbarButtonView
        disabled={!currentFeature}
        onClick={() => history.push(`/${currentFeature?.featureId}/detail`)}
      />
      <ToolbarSplitter />
      <ToolbarButtonBase disabled={!buttonFindEnabled}>{t("toolbar.list")}</ToolbarButtonBase>
      <ToolbarButtonFind disabled={!buttonListEnabled} />
      <ToolbarButtonBase disabled={!buttonSearchEnabled}>{t("toolbar.find")}</ToolbarButtonBase>
    </Toolbar>
  );
};

export default FeatureToolbar;
