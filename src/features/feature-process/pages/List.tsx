import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Grid } from "@jfront/ui-core";
import { FeatureProcess } from "../api/FeatureProcessInterface";
import { findFeatureProcess } from "../api/FeatureProcessApi";
import { setState, Workstates } from "../../../app/WorkstateSlice";
import { setCurrentFeatureProcess } from "../featureProcessSlice";

const FeatureProcessListPage = () => {
  const location = useLocation();
  const history = useHistory();
  const [] = useState<boolean>(false);
  const [featureProcesses, setFeatureProcesses] = useState<FeatureProcess[]>();
  let { featureId } = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const find = () => {
    if (featureId) {
      findFeatureProcess(parseInt(featureId)).then((processes: FeatureProcess[]) => {
        setFeatureProcesses(processes);
      });
    }
  };

  useEffect(() => {
    find();
    dispatch(setState(Workstates.FeatureProcessList));
  }, [location]);

  return (
    <>
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
            dispatch(setCurrentFeatureProcess(selected[0]));
          } else {
            dispatch(setCurrentFeatureProcess(undefined));
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
