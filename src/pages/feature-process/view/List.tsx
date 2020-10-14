import React, { useEffect, useState } from "react";
import {
  Toolbar,
  ToolbarButtonBase,
  ToolbarButtonCreate,
  ToolbarButtonDelete,
  ToolbarButtonFind,
  ToolbarButtonView,
  ToolbarSplitter,
} from "@jfront/ui-core";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Tab, TabPanel } from "@jfront/ui-core";
import { Grid } from "@jfront/ui-core";
import { FeatureProcess } from "../../../api/feature-process/FeatureProcessInterface";
import {
  deleteFeatureProcess,
  findFeatureProcess,
} from "../../../api/feature-process/FeatureProcessApi";
import { useTranslation } from "react-i18next";

const FeatureProcessListPage = () => {
  const location = useLocation();
  const history = useHistory();
  const [mainTabSelected, setMainTabSelected] = useState<boolean>(false);
  const [featureProcesses, setFeatureProcesses] = useState<FeatureProcess[]>();
  const [current, setCurrent] = useState<FeatureProcess>();
  let { featureId } = useParams();
  const { t } = useTranslation();

  const find = () => {
    if (featureId) {
      findFeatureProcess(parseInt(featureId)).then((processes: FeatureProcess[]) => {
        setFeatureProcesses(processes);
      });
    }
  };

  useEffect(() => {
    find();
  }, [location]);

  console.log("Render");

  return (
    <>
      <TabPanel>
        <Tab
          selected={mainTabSelected}
          onClick={() => {
            setMainTabSelected(true);
            history.push(`/${featureId}/detail`);
          }}
        >
          {t("feature.header")}
        </Tab>
        <Tab
          selected={!mainTabSelected}
          onClick={() => {
            setMainTabSelected(false);
          }}
        >
          {t("feature-process.header")}
        </Tab>
      </TabPanel>
      <Toolbar>
        <ToolbarButtonCreate onClick={() => history.push(`/${featureId}/feature-process/create`)} />
        <ToolbarButtonDelete
          disabled={!current}
          onClick={() => {
            if (current?.featureId && current.featureProcessId) {
              deleteFeatureProcess(current?.featureId, current?.featureProcessId).then(() => {
                find();
              });
            }
          }}
        />
        <ToolbarButtonView
          disabled={!current}
          onClick={() =>
            history.push(
              `/${current?.featureId}/feature-process/${current?.featureProcessId}/detail`
            )
          }
        />
        <ToolbarSplitter />
        <ToolbarButtonBase disabled={true}>{t("toolbar.list")}</ToolbarButtonBase>
        <ToolbarButtonFind
          disabled={true}
          onClick={() => history.push(`/${featureId}/feature-process/search`)}
        />
        <ToolbarButtonBase disabled={true}>{t("toolbar.find")}</ToolbarButtonBase>
      </Toolbar>
      <Grid
        id="table"
        columns={[
          {
            Header: t("feature-process.fields.featureStatusName"),
            accessor: "featureStatusName",
          },
          {
            Header: t("feature-process.fields.dateIns"),
            accessor: "dateIns",
          },          
        ]}
        data={featureProcesses ? featureProcesses : []} //todo: bug in library
        onSelection={(selected) => {
          console.log(selected);
          if (selected.length === 1) {
            setCurrent(selected[0]);
          } else {
            setCurrent(undefined);
          }
        }}
        onDoubleClick={(featureProcess) => {
          history.push(
            `/${featureProcess.featureId}/feature-process/${featureProcess.featureProcessId}/detail`
          );
        }}
      />      
    </>
  );
};

export default FeatureProcessListPage;
