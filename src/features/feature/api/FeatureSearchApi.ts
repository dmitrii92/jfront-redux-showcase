import axios from "axios";
import { Feature, FeatureSearchTemplate } from "./FeatureInterface";
import { ConnectorSearch } from "@jfront/core-rest";

class FeatureSearchApi extends ConnectorSearch<Feature, FeatureSearchTemplate> {
  constructor(baseUrl: string) {
    super(baseUrl, false);
  }
}

export const featureCrudApi = new FeatureSearchApi(process.env.REACT_APP_API_URL + "/feature");
