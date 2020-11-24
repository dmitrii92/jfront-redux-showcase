import axios from "axios";
import { Feature, FeatureCreate, FeatureUpdate } from "./FeatureInterface";

const API_URL = process.env.REACT_APP_API_URL;
const withCredentials = false;

export const getFeature = (id?: string): Promise<Feature> => {
  const url = `${API_URL}/feature/${id}/`;
  axios.defaults.withCredentials = withCredentials;
  return axios
    .get(url)
    .then((response) => response.data)
    .catch((reason) => {
      return Promise.reject(reason);
    });
};

export const createFeatureApi = (feature: FeatureCreate): Promise<Feature> => {
  const url = `${API_URL}/feature`;
  return new Promise<Feature>((resolve, reject) => {
    axios
      .post(url, feature, {
        headers: {
          Accept: "application/json;charset=utf-8",
          "Content-Type": "application/json;charset=utf-8",
        },
      })
      .then((response) => {
        if (201 === response.status) {
          let location: string = response.headers["location"];
          axios
            .get(location, {
              headers: {
                Accept: "application/json;charset=utf-8",
                "Content-Type": "application/json;charset=utf-8",
              },
            })
            .then((response) => {
              if (200 === response.status) {
                resolve(response.data);
              } else {
                reject(response);
              }
            })
            .catch((error) => reject(error));
        } else {
          reject(response);
        }
      })
      .catch((error) => reject(error));
  });
};

export const updateFeature = (featureId: string, feature: FeatureUpdate): Promise<Feature> => {
  const url = `${API_URL}/feature/${featureId}/`;
  return new Promise<Feature>((resolve, reject) => {
    axios
      .put(url, feature, {
        headers: {
          Accept: "application/json;charset=utf-8",
          "Content-Type": "application/json;charset=utf-8",
        },
      })
      .then((response) => {
        if (200 === response.status) {
          resolve();
        } else {
          reject(response);
        }
      })
      .catch((error) => reject(error));
  });
};

export const deleteFeature = (featureId: string): Promise<void> => {
  const url = `${API_URL}/feature/${featureId}`;
  axios.defaults.withCredentials = withCredentials;
  return new Promise<void>((resolve, reject) => {
    axios
      .delete(url, {
        headers: {
          Accept: "application/json;charset=utf-8",
          "Content-Type": "application/json;charset=utf-8",
        },
      })
      .then((response) => {
        if (200 === response.status) {
          resolve();
        } else {
          reject(response);
        }
      })
      .catch((error) => reject(error));
  });
};
