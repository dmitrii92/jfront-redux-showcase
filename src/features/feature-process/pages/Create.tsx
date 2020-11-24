import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "@jfront/ui-core";
import { FeatureProcessCreate, FeatureStatusOptions } from "../api/FeatureProcessInterface";
import { createFeatureProcess, getFeatureStatusOptions } from "../api/FeatureProcessApi";
import { setState, Workstates } from "../../../app/WorkstateSlice";
import {
  selectSaveOnCreateFeatureProcess,
  submitSavedOnCreateFeatureProcess,
} from "../featureProcessSlice";

const FeatureProcessCreatePage = () => {
  let formRef = useRef(null) as any;
  const { t } = useTranslation();
  const history = useHistory();
  let { featureId } = useParams();
  let [statusOptions, setStatusOptions] = useState<FeatureStatusOptions[]>();
  const dispatch = useDispatch();
  const onSave = useSelector(selectSaveOnCreateFeatureProcess);

  useEffect(() => {
    if (onSave) {
      dispatch(submitSavedOnCreateFeatureProcess);
      formRef.current?.dispatchEvent(new Event("submit"));
    }
  }, [onSave]);

  const onSubmit = (data: FeatureProcessCreate) => {
    if (featureId) {
      createFeatureProcess(parseInt(featureId), data).then((value) => {
        history.push(`/${value.featureId}/feature-process/${value.featureProcessId}/detail`);
      });
    }
  };

  useEffect(() => {
    dispatch(setState(Workstates.FeatureProcessCreate));
    getFeatureStatusOptions().then((options) => {
      setStatusOptions(options);
    });
  }, []);

  const formik = useFormik<FeatureProcessCreate>({
    initialValues: {
      featureStatusCode: "",
    },
    onSubmit: (values: FeatureProcessCreate) => {
      onSubmit(values);
    },
  });

  return (
    <>
      {/* <TabPanel>
        <Tab
          selected={mainTabSelected}
          onClick={() => {
            history.push("/");
          }}
        >
          {t("feature.header")}
        </Tab>
        <Tab selected={!mainTabSelected}>{t("feature-process.header")}</Tab>
      </TabPanel>
      <Toolbar>
        <ToolbarButtonCreate onClick={() => history.push(`/create`)} />
        <ToolbarButtonSave
          onClick={() => {
            let button = document.getElementById("feature-process-save");
            if (button) {
              button.click();
            }
          }}
        />
        <ToolbarButtonEdit onClick={() => history.push(`/${featureId}/edit`)} />
        <ToolbarButtonDelete />
        <ToolbarButtonView disabled={true} />
        <ToolbarSplitter />
        <ToolbarButtonBase onClick={() => history.goBack()}>{t("toolbar.list")}</ToolbarButtonBase>
        <ToolbarButtonFind onClick={() => history.push(`/`)} />
        <ToolbarButtonBase disabled={true}>{t("toolbar.find")}</ToolbarButtonBase>
      </Toolbar> */}
      <Form onSubmit={formik.handleSubmit} ref={formRef}>
        <Form.Field>
          <Form.Label>{t("feature-process.fields.featureStatusCode")}</Form.Label>
          <select
            name="featureStatusCode"
            value={formik.values.featureStatusCode}
            onChange={formik.handleChange}
          >
            <option value={undefined}></option>
            {statusOptions
              ? statusOptions.map((option) => {
                  return (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  );
                })
              : null}
          </select>
          {/* <ComboBox 
              name="featureStatusCode" 
              // value={formik.values.featureStatusCode}
              onChangeValue={
                (name, value) => {
                  console.log("name = " + name)
                  console.log("value = " + value)
                  // formik.setFieldValue("featureStatusCode", event.target.value)
                }
              }
            >
              <ComboBoxItem value={undefined} label=""/>
              {statusOptions ? statusOptions.map(option => {
                return <ComboBoxItem key={option.value} value={option.value} label={option.name} />
              }) : null}
            </ComboBox> */}
        </Form.Field>
        <Form.Field>
          <input type="submit" id="feature-process-save" hidden={true} />
        </Form.Field>
      </Form>
    </>
  );
};

export default FeatureProcessCreatePage;
