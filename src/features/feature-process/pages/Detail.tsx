import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "@jfront/ui-core";
import { getFeatureProcess } from "../api/FeatureProcessApi";
import { setState, Workstates } from "../../../app/WorkstateSlice";
import { setCurrentFeatureProcess, selectFeatureProcess } from "../featureProcessSlice";

const FeatureProcessDetailPage = () => {
  const { t } = useTranslation();
  let { featureId, featureProcessId } = useParams();
  const [] = useState<boolean>(false);
  // const [featureProcess, setFeatureProcess] = useState<FeatureProcess>();
  const dispatch = useDispatch();
  const featureProcess = useSelector(selectFeatureProcess);

  useEffect(() => {
    if (featureId && featureProcessId) {
      getFeatureProcess(parseInt(featureId), featureProcessId).then((featureProcess) => {
        dispatch(setCurrentFeatureProcess(featureProcess));
      });
      dispatch(setState(Workstates.FeatureProcessDetail));
    }
  }, []);

  return (
    <>
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
