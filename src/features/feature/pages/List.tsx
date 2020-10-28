import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Feature } from "../api/FeatureInterface";
import { Grid } from "@jfront/ui-core";
import { Panel } from "@jfront/ui-core";
import { setCurrentFeature } from "../featureSlice";
import { selectSearchResult, fetchSearchFeatures, selectIsLoading } from "../featureSearchSlice";
import { setState, Workstates } from "../../../app/WorkstateSlice";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ListPage = () => {
  const history = useHistory();
  const location = useLocation();
  let query = useQuery();
  const pageSize: number = parseInt(query.get("pageSize") as string);
  const page: number = parseInt(query.get("page") as string);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const features: Array<Feature> = useSelector(selectSearchResult);
  const isLoading = useSelector(selectIsLoading);

  const find = () => {
    dispatch(fetchSearchFeatures(location.search, pageSize, page));
  };

  useEffect(() => {
    dispatch(setState(Workstates.FeatureList));
    find();
  }, [location]);

  return (
    <Panel>
      <Panel.Header></Panel.Header>
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
