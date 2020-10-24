import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Tab, TabPanel } from "@jfront/ui-core";
import { selectState, Workstates } from "../../app/WorkstateSlice";

const AppTabPanel = () => {
  const state: Workstates = useSelector(selectState);
  const { t } = useTranslation();
  const [mainTabSelected, setMainTabSelected] = useState<boolean>(true);

  return (
    <TabPanel>
      <Tab
        selected={mainTabSelected}
        onClick={() => {
          setMainTabSelected(true);
        }}
      >
        {t("feature.header")}
      </Tab>
      {state === Workstates.FeatureDetail ? (
        <Tab
          selected={!mainTabSelected}
          onClick={() => {
            setMainTabSelected(false);
          }}
        >
          {t("feature-process.header")}
        </Tab>
      ) : null}
    </TabPanel>
  );
};

export default AppTabPanel;
