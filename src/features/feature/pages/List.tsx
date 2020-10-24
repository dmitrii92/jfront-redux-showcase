import React, { useContext, useEffect, useState } from "react";
import { Feature, FeatureSearchTemplate } from "../api/FeatureInterface";
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
import { useHistory, useLocation } from "react-router-dom";
import {
  deleteFeature,
  getResultSetSize,
  searchFeatures,
  postSearchRequest,
} from "../api/FeatureApi";
import { Grid } from "@jfront/ui-core";
import { Panel } from "@jfront/ui-core";
import { Tab, TabPanel } from "@jfront/ui-core";
import { useTranslation } from "react-i18next";
import queryString from "query-string";
import { SearchRequest } from "../../../app/common/types";
import { SearchContext } from "../../../context";
import { useDispatch, useSelector } from "react-redux";
import { selectFeature, setCurrentFeature } from "../featureSlice";
import { selectSearchResult, fetchSearchFeatures, selectIsLoading } from "../featureSearchSlice";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ListPage = () => {
  const history = useHistory();
  const location = useLocation();
  let query = useQuery();
  const [searchSize, setSearchSize] = useState<number>(25);
  const pageSize: number = parseInt(query.get("pageSize") as string);
  const page: number = parseInt(query.get("page") as string);
  const { t } = useTranslation();
  const searchContext = useContext(SearchContext);
  // const [isLoading, setIsLoading] = useState<boolean>(true);

  const dispatch = useDispatch();
  const currentFeature: Feature = useSelector(selectFeature);
  const features: Array<Feature> = useSelector(selectSearchResult);
  const isLoading = useSelector(selectIsLoading);
  const find = () => {
    let searchTemplate = queryString.parse(location.search);
    if (searchTemplate.page) {
      searchTemplate.page = undefined;
    }
    if (searchTemplate.pageSize) {
      searchTemplate.pageSize = undefined;
    }

    let searchRequest: SearchRequest<FeatureSearchTemplate> = {
      template: searchTemplate,
    };

    console.log(`page = ${page}, pageSize = ${pageSize}`);
    dispatch(fetchSearchFeatures(searchRequest, pageSize, page));
  };

  useEffect(() => {
    find();
  }, [location]);

  return (
    <Panel>
      <Panel.Header>
        <TabPanel>
          <Tab selected={true}>{t("feature.header")}</Tab>
        </TabPanel>
        <Toolbar>
          <ToolbarButtonCreate onClick={() => history.push(`/create`)} />
          <ToolbarButtonSave disabled={true} />
          <ToolbarButtonEdit
            disabled={!currentFeature}
            onClick={() => history.push(`/${currentFeature?.featureId}/edit`)}
          />
          <ToolbarButtonDelete
            disabled={!currentFeature}
            onClick={() => {
              if (currentFeature) {
                deleteFeature(currentFeature.featureId.toString()).then(() => {
                  find();
                });
              }
            }}
          />
          <ToolbarButtonView
            disabled={!currentFeature}
            onClick={() => history.push(`/${currentFeature?.featureId}/detail`)}
          />
          <ToolbarSplitter />
          <ToolbarButtonBase disabled={true}>{t("toolbar.list")}</ToolbarButtonBase>
          <ToolbarButtonFind onClick={() => history.push(`/`)} />
          <ToolbarButtonBase disabled={true}>{t("toolbar.find")}</ToolbarButtonBase>
        </Toolbar>
      </Panel.Header>
      <Panel.Content>
        {isLoading ? (
          <div style={{ textAlign: "center" }}>Loading...</div>
        ) : (
          <Grid
            id="table"
            columns={[
              {
                Header: t("feature.fields.featureId"),
                accessor: "featureId",
              },
              {
                Header: t("feature.fields.featureStatus"),
                accessor: "featureStatus.name",
              },
              {
                Header: t("feature.fields.workSequence"),
                accessor: "workSequence",
              },
              {
                Header: t("feature.fields.featureName"),
                accessor: "featureName",
              },
              {
                Header: t("feature.fields.featureNameEn"),
                accessor: "featureNameEn",
              },
              {
                Header: t("feature.fields.description"),
                accessor: "description",
              },
              {
                Header: t("feature.fields.dateIns"),
                accessor: "dateIns",
              },
              {
                Header: t("feature.fields.author"),
                accessor: "author.name",
              },
              {
                Header: t("feature.fields.responsible"),
                accessor: "responsible.name",
              },
            ]}
            data={features}
            onSelection={(selectedFeatures) => {
              console.log(selectedFeatures);
              if (selectedFeatures.length === 1) {
                dispatch(setCurrentFeature(selectedFeatures[0]));
              } else {
                dispatch(setCurrentFeature(undefined));
              }
            }}
            onDoubleClick={(feature) => {
              history.push(`/${feature.featureId}/detail`);
            }}
          />
        )}
      </Panel.Content>
    </Panel>
  );
};

export default ListPage;
