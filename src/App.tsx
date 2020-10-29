import React, { Suspense, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DetailPage from "./features/feature/pages/Detail";
import CreatePage from "./features/feature/pages/Create";
import SearchPage from "./features/feature/pages/Search";
import ListPage from "./features/feature/pages/List";
import EditPage from "./features/feature/pages/Edit";
import FeatureProcessListPage from "./features/feature-process/pages/List";
import FeatureProcessDetailPage from "./features/feature-process/pages/Detail";
import FeatureProcessCreatePage from "./features/feature-process/pages/Create";
import AppTabPanel from "./features/tabpanel/AppTabPanel";
import FeatureToolbar from "./features/feature/components/FeatureToolbar";
import FeatureProcessToolbar from "./features/feature-process/components/FeatureProcessToolbar";

const Loader = () => (
  <div>
    <div>Loading...</div>
  </div>
);

function Main() {
  const { t, i18n } = useTranslation();
  const language = new URLSearchParams(window.location.search).get("locale");

  useEffect(() => {
    if (language) {
      i18n.changeLanguage(language);
    }
  }, [language]);

  return (
    <BrowserRouter basename={`${process.env.PUBLIC_URL}`}>
      <AppTabPanel />
      <Switch>
        <Route path="/" exact>
          <FeatureToolbar />
          <SearchPage />
        </Route>
        <Route path="/create" exact>
          <FeatureToolbar />
          <CreatePage />
        </Route>
        <Route path="/:featureId/edit" exact>
          <FeatureToolbar />
          <EditPage />
        </Route>
        <Route path="/:featureId/detail">
          <FeatureToolbar />
          <DetailPage />
        </Route>
        <Route path="/list">
          <FeatureToolbar />
          <ListPage />
        </Route>
        <Route path="/:featureId/feature-process" exact>
          <FeatureProcessToolbar />
          <FeatureProcessListPage />
        </Route>
        <Route path="/:featureId/feature-process/:featureProcessId/detail">
          <FeatureProcessToolbar />
          <FeatureProcessDetailPage />
        </Route>
        <Route path="/:featureId/feature-process/create" exact>
          <FeatureProcessToolbar />
          <FeatureProcessCreatePage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Main />
    </Suspense>
  );
};

export default App;
