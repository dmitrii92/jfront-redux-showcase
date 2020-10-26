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
import { selectState, Workstates } from "../../../app/WorkstateSlice";

const FeatureProcessToolbar = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const state: Workstates = useSelector(selectState);

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
      <ToolbarButtonEdit disabled={!buttonEditEnabled} />
      <ToolbarButtonDelete disabled={!buttonDeleteEnabled} />
      <ToolbarButtonView disabled={!buttonViewEnabled} />
      <ToolbarSplitter />
      <ToolbarButtonBase disabled={!buttonFindEnabled}>{t("toolbar.list")}</ToolbarButtonBase>
      <ToolbarButtonFind disabled={!buttonListEnabled} />
      <ToolbarButtonBase disabled={!buttonSearchEnabled}>{t("toolbar.find")}</ToolbarButtonBase>
    </Toolbar>
  );
};

export default FeatureProcessToolbar;
