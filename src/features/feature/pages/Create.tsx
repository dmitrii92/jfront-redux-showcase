import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "@jfront/ui-core";
import { TextInput } from "@jfront/ui-core";
import { Feature, FeatureCreate } from "../api/FeatureInterface";
import { selectSaveOnCreateFeature, setCreateFeature } from "../featureSlice";
import { setState, Workstates } from "../../../app/WorkstateSlice";
import { featureCrudApi } from "../api/FeatureCrudApi";

const CreatePage = () => {
  let formRef = useRef(null) as any;
  const history = useHistory();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const onCreateFeature = useSelector(selectSaveOnCreateFeature);

  const onSubmit = (data: FeatureCreate) => {
    featureCrudApi.create(data).then((feature: Feature) => {
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
    if (onCreateFeature) {
      dispatch(setCreateFeature(false));
      let button = document.getElementById("create-submit");
      if (button) {
        button.click();
      }
    }
  }, [onCreateFeature]);

  useEffect(() => {
    dispatch(setState(Workstates.FeatureCreate));
  }, []);

  return (
    <>
      <Form id="create-form" onSubmit={formik.handleSubmit} ref={formRef}>
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
