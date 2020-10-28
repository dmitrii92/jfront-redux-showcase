import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Tab, TabPanel } from "@jfront/ui-core";
import { selectState, Workstates } from "../../app/WorkstateSlice";
import { useHistory } from "react-router-dom";
import { Feature } from "../feature/api/FeatureInterface";
import { selectFeature } from "../feature/featureSlice";

const AppTabPanel = () => {
  const state: Workstates = useSelector(selectState);
  const { t } = useTranslation();
  const [mainTabSelected, setMainTabSelected] = useState<boolean>(true);
  const [featureProcessTabVisible, setFeatureProcessTabVisible] = useState<boolean>(false);
  const history = useHistory();
  const currentFeature: Feature = useSelector(selectFeature);

  useEffect(() => {
    switch (state) {
      case Workstates.FeatureCreate:
      case Workstates.FeatureList:
      case Workstates.FeatureSearch:
        setMainTabSelected(true);
        setFeatureProcessTabVisible(false);
        break;
      case Workstates.FeatureDetail:
      case Workstates.FeatureEdit:
        setMainTabSelected(true);
        setFeatureProcessTabVisible(true);
        break;
      case Workstates.FeatureProcessCreate:
      case Workstates.FeatureProcessDetail:
      case Workstates.FeatureProcessList:
      case Workstates.FeatureProcessSearch:
        setMainTabSelected(false);
        setFeatureProcessTabVisible(true);
        break;
      default:
        break;
    }
  }, [state]);

  return (
    <TabPanel>
      <Tab
        selected={mainTabSelected}
        onClick={() => {
          history.push(`/${currentFeature.featureId}/detail`);
        }}
      >
        {t("feature.header")}
      </Tab>
      {featureProcessTabVisible ? (
        <Tab
          selected={!mainTabSelected}
          onClick={() => {
            history.push(`/${currentFeature.featureId}/feature-process`);
          }}
        >
          {t("feature-process.header")}
        </Tab>
      ) : null}
    </TabPanel>
  );
};

export default AppTabPanel;
