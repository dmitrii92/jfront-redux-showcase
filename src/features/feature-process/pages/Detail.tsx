import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Tab, TabPanel } from "@jfront/ui-core";
import {
  Toolbar,
  ToolbarButtonBase,
  ToolbarButtonCreate,
  ToolbarButtonDelete,
  ToolbarButtonFind,
  ToolbarButtonView,
  ToolbarSplitter,
} from "@jfront/ui-core";
import { Form } from "@jfront/ui-core";
import { FeatureProcess } from "../api/FeatureProcessInterface";
import { deleteFeatureProcess, getFeatureProcess } from "../api/FeatureProcessApi";
import { setState, Workstates } from "../../../app/WorkstateSlice";

const FeatureProcessDetailPage = () => {
  const { t } = useTranslation();
  const history = useHistory();
  let { featureId, featureProcessId } = useParams();
  const [mainTabSelected, setMainTabSelected] = useState<boolean>(false);
  const [featureProcess, setFeatureProcess] = useState<FeatureProcess>();
  const dispatch = useDispatch();

  useEffect(() => {
    if (featureId && featureProcessId) {
      getFeatureProcess(parseInt(featureId), featureProcessId).then((featureProcess) => {
        setFeatureProcess(featureProcess);
      });
      dispatch(setState(Workstates.FeatureProcessDetail));
    }
  }, []);

  return (
    <>
      <TabPanel>
        <Tab
          selected={mainTabSelected}
          onClick={() => {
            history.push(`/${featureId}/detail`);
          }}
        >
          {t("feature.header")}
        </Tab>
        <Tab selected={!mainTabSelected}>{t("feature-process.header")}</Tab>
      </TabPanel>
      <Toolbar>
        <ToolbarButtonCreate onClick={() => history.push(`/${featureId}/feature-process/create`)} />
        <ToolbarButtonDelete
          onClick={() => {
            if (featureId && featureProcessId) {
              deleteFeatureProcess(parseInt(featureId), parseInt(featureProcessId)).then(() => {
                history.push(`/${featureId}/feature-process`);
              });
            }
          }}
        />
        <ToolbarButtonView disabled={true} />
        <ToolbarSplitter />
        <ToolbarButtonBase
          onClick={() => {
            history.push(`/${featureId}/feature-process`);
          }}
        >
          {t("toolbar.list")}
        </ToolbarButtonBase>
        <ToolbarButtonFind disabled={true} />
        <ToolbarButtonBase disabled={true}>{t("toolbar.find")}</ToolbarButtonBase>
      </Toolbar>
      <Form>
        <Form.Field>
          <Form.Label>{t("feature-process.fields.featureStatusCode")}</Form.Label>
          <Form.Label>{featureProcess?.featureStatusName}</Form.Label>
        </Form.Field>
        <Form.Field>
          <Form.Label>{t("feature-process.fields.dateIns")}</Form.Label>
          <Form.Label>{featureProcess?.dateIns}</Form.Label>
        </Form.Field>
      </Form>
    </>
  );
};

export default FeatureProcessDetailPage;
