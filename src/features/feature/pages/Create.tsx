import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "@jfront/ui-core";
import {
  Toolbar,
  ToolbarButtonBase,
  ToolbarButtonCreate,
  ToolbarButtonDelete,
  ToolbarButtonEdit,
  ToolbarButtonFind,
  ToolbarButtonSave,
  ToolbarButtonView,
  ToolbarSplitter,
} from "@jfront/ui-core";
import { TextInput } from "@jfront/ui-core";
import { Tab, TabPanel } from "@jfront/ui-core";
import { FeatureCreate } from "../api/FeatureInterface";
import { createFeature } from "../api/FeatureApi";
import { SearchContext } from "../../../context";
import { setState, Workstates } from "../../../app/WorkstateSlice";

const CreatePage = () => {
  const history = useHistory();
  const searchContext = useContext(SearchContext);
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
      <TabPanel>
        <Tab selected={true}>{t("feature.header")}</Tab>
      </TabPanel>
      <Toolbar>
        <ToolbarButtonCreate disabled={true} />
        <ToolbarButtonSave
          onClick={() => {
            let button = document.getElementById("create-submit");
            if (button) {
              button.click();
            }
          }}
        />
        <ToolbarButtonEdit disabled={true} />
        <ToolbarButtonDelete disabled={true} />
        <ToolbarButtonView disabled={true} />
        <ToolbarSplitter />
        <ToolbarButtonBase
          onClick={() => {
            let searchId = searchContext?.getId();
            if (searchId) {
              history.push(`/list/${searchId}/?pageSize=25&page=1`);
            }
          }}
        >
          {t("toolbar.list")}
        </ToolbarButtonBase>
        <ToolbarButtonFind onClick={() => history.push(`/`)} />
        <ToolbarButtonBase disabled={true}>{t("toolbar.find")}</ToolbarButtonBase>
      </Toolbar>
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
