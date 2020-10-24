import React from "react";
import { useSelector } from "react-redux";
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
import { selectFeature } from "../feature/featureSlice";
import { selectSearchResult } from "../feature/featureSearchSlice";
import { Feature } from "../feature/api/FeatureInterface";

const AppToolbar = () => {
  const currentFeature: Feature = useSelector(selectFeature);
  const features: Array<Feature> = useSelector(selectSearchResult);
  return (
    <Toolbar>
      <ToolbarButtonCreate />
      <ToolbarButtonSave />
      <ToolbarButtonEdit />
      <ToolbarButtonDelete />
      <ToolbarButtonView />
      <ToolbarSplitter />
      <ToolbarButtonBase></ToolbarButtonBase>
      <ToolbarButtonFind />
      <ToolbarButtonBase></ToolbarButtonBase>
    </Toolbar>
  );
};

export default AppToolbar;
