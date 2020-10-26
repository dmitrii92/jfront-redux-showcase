import React, { useState, Suspense, useEffect } from "react";
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
import { FeatureSearchTemplate } from "./features/feature/api/FeatureInterface";
import { SearchContext, SearchContextInterface } from "./context";
import AppTabPanel from "./features/tabpanel/AppTabPanel";

const Loader = () => (
  <div>
    <div>Loading...</div>
  </div>
);

function Main() {
  const { t, i18n } = useTranslation();
  const language = new URLSearchParams(window.location.search).get("locale");
  const [searchId, setSearchId] = useState<string>("");
  const [searchTemplate, setSearchTemplate] = useState<FeatureSearchTemplate>({});

  const searchFeature: SearchContextInterface = {
    getId(): string {
      return searchId;
    },
    setId(searchId: string) {
      setSearchId(searchId);
    },
    getTemplate(): FeatureSearchTemplate {
      return searchTemplate;
    },
    setTemplate(template: FeatureSearchTemplate): void {
      setSearchTemplate(template);
    },
  };

  useEffect(() => {
    if (language) {
      i18n.changeLanguage(language);
    }
  }, [language]);

  return (
    <SearchContext.Provider value={searchFeature}>
      <BrowserRouter basename={`${process.env.PUBLIC_URL}`}>
        <AppTabPanel />
        <Switch>
          <Route path="/" exact component={SearchPage} />
          <Route path="/create" exact component={CreatePage} />
          <Route path="/:featureId/edit" exact component={EditPage} />
          <Route path="/:featureId/detail" component={DetailPage} />
          <Route path="/list" component={ListPage} />
          <Route path="/:featureId/feature-process" exact component={FeatureProcessListPage} />
          <Route
            path="/:featureId/feature-process/:featureProcessId/detail"
            component={FeatureProcessDetailPage}
          />
          <Route
            path="/:featureId/feature-process/create"
            exact
            component={FeatureProcessCreatePage}
          />
        </Switch>
      </BrowserRouter>
    </SearchContext.Provider>
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
