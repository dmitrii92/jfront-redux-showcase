import React, { useContext, useEffect, useState } from "react";
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
import { useHistory } from "react-router-dom";
import { Form } from "@jfront/ui-core";
import { FeatureSearchTemplate } from "../../../api/feature/FeatureInterface";
import { Tab, TabPanel } from "@jfront/ui-core";
import { SearchContext } from "../../../context";
import { FeatureStatusOptions } from "../../../api/feature-process/FeatureProcessInterface";
import { getFeatureStatusOptions } from "../../../api/feature-process/FeatureProcessApi";
import { useFormik } from "formik";
import { DatePicker } from "@jfront/ui-core";
import { useTranslation } from "react-i18next";
import { CheckBoxGroup } from "@jfront/ui-core";
import { CheckBox } from "@jfront/ui-core";
import queryString from "query-string";
import { TextInput } from "@jfront/ui-core";

const SearchPage = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const searchContext = useContext(SearchContext);
  let [statusOptions, setStatusOptions] = useState<FeatureStatusOptions[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const onSubmit = (data: FeatureSearchTemplate) => {
    if (!data.featureId) {
      data.featureId = undefined;
    }
    if (!data.dateInsFrom) {
      data.dateInsFrom = undefined;
    }
    if (!data.dateInsTo) {
      data.dateInsTo = undefined;
    }

    let query = queryString.stringify(data);
    if (query) {
      query = "&" + query;
    }
    history.push(`/list/?pageSize=25&page=1${query}`);
  };

  useEffect(() => {
    getFeatureStatusOptions().then((options) => {
      setStatusOptions(options);
      setIsLoading(false);
    });
  }, []);

  const formik = useFormik<FeatureSearchTemplate>({
    initialValues: searchContext.getTemplate(),
    onSubmit: (values: FeatureSearchTemplate) => {
      onSubmit(values);
    },
  });

  return (
    <>
      <TabPanel>
        <Tab selected={true}>{t("feature.header")}</Tab>
      </TabPanel>
      <Toolbar>
        <ToolbarButtonCreate onClick={() => history.push(`/create`)} />
        <ToolbarButtonSave disabled={true} />
        <ToolbarButtonEdit disabled={true} />
        <ToolbarButtonDelete disabled={true} />
        <ToolbarButtonView disabled={true} />
        <ToolbarSplitter />
        <ToolbarButtonBase //TODO: think about code bellow
          disabled={!searchContext?.getId()}
          onClick={() => {
            let searchId = searchContext?.getId();
            if (searchId) {
              history.push(`/list/${searchId}/?pageSize=25&page=1`);
            }
          }}
        >
          {t("toolbar.list")}
        </ToolbarButtonBase>
        <ToolbarButtonFind disabled={true} />
        <ToolbarButtonBase
          onClick={() => {
            let button = document.getElementById("search-submit");
            if (button) {
              button.click();
            }
          }}
        >
          {t("toolbar.find")}
        </ToolbarButtonBase>
      </Toolbar>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Field style={{ display: "inline-block" }}>
          <Form.Label>{t("feature.fields.featureId")}:</Form.Label>
          <TextInput
            name="featureId"
            value={formik.values.featureId}
            onChange={formik.handleChange}
            type="number"
            autoComplete="off"
          />
        </Form.Field>
        <Form.Field>
          <Form.Label>{t("feature.fields.featureNameTemplate")}:</Form.Label>
          <TextInput
            name="featureNameTemplate"
            value={formik.values.featureNameTemplate}
            onChange={formik.handleChange}
            autoComplete="off"
          />
        </Form.Field>
        <Form.Field>
          <Form.Label>{t("feature.fields.featureNameEnTemplate")}:</Form.Label>
          <TextInput
            name="featureNameEnTemplate"
            value={formik.values.featureNameEnTemplate}
            onChange={formik.handleChange}
            autoComplete="off"
          />
        </Form.Field>
        <Form.Field>
          <Form.Label>{t("feature.fields.dateInsFrom")}</Form.Label>
          <DatePicker
            name="dateInsFrom"
            selected={formik.values.dateInsFrom}
            onChange={(date) => {
              formik.setFieldValue("dateInsFrom", date);
            }}
          />
        </Form.Field>
        <Form.Field>
          <Form.Label>{t("feature.fields.dateInsTo")}</Form.Label>
          <DatePicker
            name="dateInsTo"
            selected={formik.values.dateInsTo}
            onChange={(date) => {
              formik.setFieldValue("dateInsTo", date);
            }}
          />
        </Form.Field>
        <Form.Field>
          <Form.Label>{t("feature.fields.statusCodeList")}</Form.Label>
          <CheckBoxGroup
            name="statusCodeList"
            values={formik.values.statusCodeList ? formik.values.statusCodeList : []}
            style={{ width: "142px" }}
            onChange={(name, newValue) => {
              formik.setFieldValue("statusCodeList", newValue);
            }}
            isLoading={isLoading}
          >
            {statusOptions
              ? statusOptions.map((option) => {
                  return <CheckBox value={option.value} label={option.name} />;
                })
              : null}
          </CheckBoxGroup>
        </Form.Field>
        <Form.Field>
          <input id="search-submit" type="submit" hidden={true} />
        </Form.Field>
      </Form>
    </>
  );
};

export default SearchPage;
