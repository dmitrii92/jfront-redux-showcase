import React, { useContext, useEffect, useState } from "react";
import { Form } from "@jfront/ui-core";
import { deleteFeature } from "../api/FeatureApi";
import { Feature } from "../api/FeatureInterface";
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
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeature, selectError, selectFeature } from "../featureSlice";

const DetailPage = () => {
  const history = useHistory();
  let { featureId } = useParams();
  const [mainTabSelected, setMainTabSelected] = useState<boolean>(true);
  const searchContext = useContext(SearchContext);
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const currentFeature: Feature = useSelector(selectFeature);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchFeature(featureId));
  }, []);

  return (
    <>
      <TabPanel>
        <Tab
          selected={mainTabSelected}
          onClick={() => {
            setMainTabSelected(true);
          }}
        >
          {t("feature.header")}
        </Tab>
        <Tab
          selected={!mainTabSelected}
          onClick={() => {
            setMainTabSelected(false);
            history.push(`/${featureId}/feature-process`);
          }}
        >
          {t("feature-process.header")}
        </Tab>
      </TabPanel>
      <Toolbar>
        <ToolbarButtonCreate onClick={() => history.push(`/create`)} />
        <ToolbarButtonSave disabled={true} />
        <ToolbarButtonEdit onClick={() => history.push(`/${featureId}/edit`)} />
        <ToolbarButtonDelete
          onClick={() => {
            if (featureId) {
              deleteFeature(featureId).then(() => {
                let searchId = searchContext?.getId();
                if (searchId) {
                  history.push(`/list/${searchId}/?pageSize=25&page=1`);
                } else {
                  history.push(`/`);
                }
              });
            }
          }}
        />
        <ToolbarButtonView disabled={true} />
        <ToolbarSplitter />
        <ToolbarButtonBase
          onClick={() => {
            let searchId = searchContext?.getId();
            if (searchId) {
              history.push(`/list/${searchId}/?pageSize=25&page=1`);
            } else {
              history.push("/");
            }
          }}
        >
          {t("toolbar.list")}
        </ToolbarButtonBase>
        <ToolbarButtonFind onClick={() => history.push(`/`)} />
        <ToolbarButtonBase disabled={true}>{t("toolbar.find")}</ToolbarButtonBase>
      </Toolbar>
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
