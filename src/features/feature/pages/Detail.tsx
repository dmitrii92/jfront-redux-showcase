import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "@jfront/ui-core";
import { Feature } from "../api/FeatureInterface";
import { fetchFeature, selectError, selectFeature } from "../featureSlice";
import { setState, Workstates } from "../../../app/WorkstateSlice";

const DetailPage = () => {
  let { featureId } = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentFeature: Feature = useSelector(selectFeature);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(setState(Workstates.FeatureDetail));
    dispatch(fetchFeature(featureId));
  }, []);

  return (
    <>
      {error ? <div>{error}</div> : null}
      <Form>
        <Form.Field>
          <Form.Label>{t("feature.fields.featureId")}:</Form.Label>
          <Form.Label style={{ width: "350px", justifyContent: "flex-start" }}>
            {currentFeature?.featureId}
          </Form.Label>
        </Form.Field>
        <Form.Field>
          <Form.Label>{t("feature.fields.featureStatus")}:</Form.Label>
          <Form.Label
            style={{
              width: "350px",
              justifyContent: "flex-start",
            }}
          >
            {currentFeature?.featureStatus?.name}
          </Form.Label>
        </Form.Field>
        <Form.Field>
          <Form.Label>{t("feature.fields.featureName")}:</Form.Label>
          <Form.Label style={{ width: "350px", justifyContent: "flex-start" }}>
            {currentFeature?.featureName}
          </Form.Label>
        </Form.Field>
        <Form.Field>
          <Form.Label>{t("feature.fields.featureNameEn")}:</Form.Label>
          <Form.Label style={{ width: "350px", justifyContent: "flex-start" }}>
            {currentFeature?.featureNameEn}
          </Form.Label>
        </Form.Field>
        <Form.Field>
          <Form.Label>{t("feature.fields.dateIns")}:</Form.Label>
          <Form.Label style={{ width: "350px", justifyContent: "flex-start" }}>
            {currentFeature
              ? currentFeature?.dateIns.toString()
                ? new Date(currentFeature?.dateIns.toString()).toLocaleDateString()
                : ""
              : null}
          </Form.Label>
        </Form.Field>
        <Form.Field>
          <Form.Label>{t("feature.fields.description")}:</Form.Label>
          <Form.Label style={{ width: "350px", justifyContent: "flex-start" }}>
            {currentFeature?.description}
          </Form.Label>
        </Form.Field>
        <Form.Field>
          <Form.Label>{t("feature.fields.author")}:</Form.Label>
          <Form.Label style={{ width: "350px", justifyContent: "flex-start" }}>
            {currentFeature?.author?.name}
          </Form.Label>
        </Form.Field>
        <Form.Field>
          <Form.Label>Порядок выполнения:</Form.Label>
          <Form.Label />
        </Form.Field>
        <Form.Field>
          <Form.Label>{t("feature.fields.responsible")}:</Form.Label>
          <Form.Label
            style={{
              width: "350px",
              justifyContent: "flex-start",
            }}
          >
            {currentFeature?.responsible?.name}
          </Form.Label>
        </Form.Field>
      </Form>
    </>
  );
};

export default DetailPage;
