import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Form } from "@jfront/ui-core";
import { TextInput } from "@jfront/ui-core";
import { FeatureCreate } from "../api/FeatureInterface";
import { createFeature } from "../api/FeatureApi";
import { setState, Workstates } from "../../../app/WorkstateSlice";

const CreatePage = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const onSubmit = (data: FeatureCreate) => {
    createFeature(data).then((feature) => {
      history.push(`/${feature.featureId}/detail`);
    });
  };

  const formik = useFormik<FeatureCreate>({
    initialValues: {
      description: "",
      featureName: "",
      featureNameEn: "",
    },
    onSubmit: (values: FeatureCreate) => {
      onSubmit(values);
    },
  });

  useEffect(() => {
    dispatch(setState(Workstates.FeatureCreate));
  }, []);

  return (
    <>
      <Form id="create-form" onSubmit={formik.handleSubmit}>
        <Form.Field>
          <Form.Label>{t("feature.fields.featureName")}</Form.Label>
          <TextInput
            name="featureName"
            value={formik.values.featureName}
            onChange={formik.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Form.Label>{t("feature.fields.featureNameEn")}</Form.Label>
          <TextInput
            name="featureNameEn"
            value={formik.values.featureNameEn}
            onChange={formik.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Form.Label>{t("feature.fields.description")}:</Form.Label>
          <textarea
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <input id="create-submit" type="submit" hidden={true} />
        </Form.Field>
      </Form>
    </>
  );
};

export default CreatePage;
