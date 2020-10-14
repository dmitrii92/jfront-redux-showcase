import React, { useContext, useEffect, useState } from "react";
import { Form } from "@jfront/ui-core";
import { TextInput } from "@jfront/ui-core";
import { getFeature, updateFeature } from "../../../api/feature/FeatureApi";
import { Feature, FeatureUpdate } from "../../../api/feature/FeatureInterface";
import { useHistory, useParams } from "react-router-dom";
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
import { Tab, TabPanel } from "@jfront/ui-core";
import { SearchContext } from "../../../context";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";

const EditPage = () => {
  const history = useHistory();
  let { featureId } = useParams();
  const searchContext = useContext(SearchContext);
  const [currentFeature, setCurrentFeature] = useState<Feature>();
  const { t } = useTranslation();

  const onSubmit = (data: FeatureUpdate) => {
    if (featureId) {
      updateFeature(featureId.toString(), data).then(() => {
        history.push(`/${featureId}/detail`);
      });
    }
  };

  useEffect(() => {
    getFeature(featureId).then((feature) => {
      setCurrentFeature(feature);
    });
  }, []);

  const formik = useFormik<FeatureUpdate>({
    initialValues: {
      featureName: currentFeature?.featureName
        ? currentFeature?.featureName
        : "",
      featureNameEn: currentFeature?.featureNameEn
        ? currentFeature?.featureNameEn
        : "",
      description: currentFeature?.description
        ? currentFeature?.description
        : "",
    },
    onSubmit: (values: FeatureUpdate) => {
      onSubmit(values);
    },
    enableReinitialize: true,
  });

  return (
    <>
      <TabPanel>
        <Tab selected={true}>{t("feature.header")}</Tab>
      </TabPanel>
      <Toolbar>
        <ToolbarButtonCreate onClick={() => history.push(`/create`)} />
        <ToolbarButtonSave
          onClick={() => {
            let button = document.getElementById("edit-submit");
            if (button) {
              button.click();
            }
          }}
        />
        <ToolbarButtonEdit disabled={true} />
        <ToolbarButtonDelete />
        <ToolbarButtonView
          onClick={() => history.push(`/${featureId}/detail`)}
        />
        <ToolbarSplitter />
        <ToolbarButtonBase
          onClick={() => {
            let searchId = searchContext?.getId();
            history.push(`/list/${searchId}/?pageSize=25&page=1`);
          }}
        >
          {t("toolbar.list")}
        </ToolbarButtonBase>
        <ToolbarButtonFind onClick={() => history.push(`/`)} />
        <ToolbarButtonBase disabled={true}>
          {t("toolbar.find")}
        </ToolbarButtonBase>
      </Toolbar>
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
            {currentFeature?.dateIns.toString() ? new Date(currentFeature?.dateIns.toString()).toLocaleDateString() : ""}
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
