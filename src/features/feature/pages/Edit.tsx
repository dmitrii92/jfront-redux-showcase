import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Form } from "@jfront/ui-core";
import { TextInput } from "@jfront/ui-core";
import { selectFeature, setCurrentFeature } from "../featureSlice";
import { getFeature, updateFeature } from "../api/FeatureApi";
import { Feature, FeatureUpdate } from "../api/FeatureInterface";
import { setState, Workstates } from "../../../app/WorkstateSlice";

const EditPage = () => {
  const history = useHistory();
  let { featureId } = useParams();
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const currentFeature: Feature = useSelector(selectFeature);

  const onSubmit = (data: FeatureUpdate) => {
    if (featureId) {
      updateFeature(featureId.toString(), data).then(() => {
        history.push(`/${featureId}/detail`);
      });
    }
  };

  useEffect(() => {
    dispatch(setState(Workstates.FeatureEdit));
    getFeature(featureId).then((feature) => {
      dispatch(setCurrentFeature(feature));
    });
  }, []);

  const formik = useFormik<FeatureUpdate>({
    initialValues: {
      featureName: currentFeature?.featureName ? currentFeature?.featureName : "",
      featureNameEn: currentFeature?.featureNameEn ? currentFeature?.featureNameEn : "",
      description: currentFeature?.description ? currentFeature?.description : "",
    },
    onSubmit: (values: FeatureUpdate) => {
      onSubmit(values);
    },
    enableReinitialize: true,
  });

  return (
    <>
      <Form id="edit-form" onSubmit={formik.handleSubmit}>
        <Form.Field>
          <Form.Label>{t("feature.fields.featureId")}:</Form.Label>
          <Form.Label style={{ width: "350px", textAlign: "left" }}>
            {currentFeature?.featureId}
          </Form.Label>
        </Form.Field>
        <Form.Field>
          <Form.Label>{t("feature.fields.featureStatus")}:</Form.Label>
          <Form.Label
            style={{
              width: "350px",
              textAlign: "left",
            }}
          >
            {currentFeature?.featureStatus?.name}
          </Form.Label>
        </Form.Field>
        <Form.Field>
          <Form.Label>{t("feature.fields.featureName")}:</Form.Label>
          <TextInput
            style={{ width: "350px", textAlign: "left" }}
            defaultValue={currentFeature?.featureName}
            name="featureName"
            value={formik.values.featureName}
            onChange={formik.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Form.Label>{t("feature.fields.featureNameEn")}:</Form.Label>
          <TextInput
            style={{ width: "350px", textAlign: "left" }}
            defaultValue={currentFeature?.featureNameEn}
            name="featureNameEn"
            value={formik.values.featureNameEn}
            onChange={formik.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Form.Label>{t("feature.fields.dateIns")}:</Form.Label>
          <Form.Label
            style={{
              width: "350px",
              textAlign: "left",
            }}
          >
            {currentFeature?.dateIns.toString()
              ? new Date(currentFeature?.dateIns.toString()).toLocaleDateString()
              : ""}
          </Form.Label>
        </Form.Field>
        <Form.Field>
          <Form.Label>{t("feature.fields.description")}:</Form.Label>
          <TextInput
            style={{ width: "350px", textAlign: "left" }}
            defaultValue={currentFeature?.description}
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Form.Label>{t("feature.fields.author")}:</Form.Label>
          <Form.Label style={{ width: "350px", textAlign: "left" }}>
            {currentFeature?.author?.name}
          </Form.Label>
        </Form.Field>
        <Form.Field>
          <Form.Label>{t("feature.fields.responsible")}:</Form.Label>
          <Form.Label
            style={{
              width: "350px",
              textAlign: "left",
            }}
          >
            {currentFeature?.responsible?.name}
          </Form.Label>
        </Form.Field>
        <Form.Field>
          <input id="edit-submit" type="submit" hidden={true} />
        </Form.Field>
      </Form>
    </>
  );
};

export default EditPage;
