import { ConnectorCrud } from "@jfront/core-rest";
import { Feature, FeatureCreate, FeatureUpdate } from "./FeatureInterface";

class FeatureCrudApi extends ConnectorCrud<Feature, FeatureCreate, FeatureUpdate> {
  constructor(baseUrl: string) {
    super(baseUrl, false);
  }
}

export const featureCrudApi = new FeatureCrudApi(process.env.REACT_APP_API_URL + "/feature");
