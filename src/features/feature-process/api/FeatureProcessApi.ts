import axios from "axios";
import {
  FeatureProcess,
  FeatureProcessCreate,
  FeatureStatusOptions,
} from "./FeatureProcessInterface";

const API_URL = "https://jepria-spring-feature.herokuapp.com";
const USER = "user";
const PASSWORD = "123";
const withCredentials = false;

export const findFeatureProcess = (
  featureId: number
): Promise<FeatureProcess[]> => {
  const url = `${API_URL}/feature/${featureId}/feature-process`;
  axios.defaults.withCredentials = withCredentials;
  return axios
    .get(
      url
      // {auth: {username: `${USER}`, password: `${PASSWORD}`}}
    )
    .then((response) => response.data)
    .catch((reason) => {
      // console.log(reason);
      return Promise.reject(reason);
    });
};

export const createFeatureProcess = (
  featureId: number,
  featureProcessCreate: FeatureProcessCreate
): Promise<FeatureProcess> => {
  const url = `${API_URL}/feature/${featureId}/feature-process`;
  axios.defaults.withCredentials = withCredentials;

  return new Promise<FeatureProcess>((resolve, reject) => {
    axios
      .post(url, featureProcessCreate, {
        // auth: {username: `${USER}`, password: `${PASSWORD}`},
        headers: {
          Accept: "application/json;charset=utf-8",
          "Content-Type": "application/json;charset=utf-8",
        },
      })
      .then((response) => {
        if (response.status === 201) {
          let location: string = response.headers["location"];
          // console.log("location" + location);
          axios
            .get(location, {
              // auth: {username: `${USER}`, password: `${PASSWORD}`},
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

export const getFeatureProcess = (
  featureId: number,
  featureProcessId: string
): Promise<FeatureProcess> => {
  const url = `${API_URL}/feature/${featureId}/feature-process/${featureProcessId}`;
  axios.defaults.withCredentials = withCredentials;

  return axios
    .get(url, {
      // auth: {username: `${USER}`, password: `${PASSWORD}`},
      headers: {
        Accept: "application/json;charset=utf-8",
        "Content-Type": "application/json;charset=utf-8",
      },
    })
    .then((response) => response.data)
    .catch((reason) => {
      // console.log(reason);
      return Promise.reject(reason);
    });
};

export const deleteFeatureProcess = (
  featureId: number,
  featureProcessId: number
): Promise<void> => {
  const url = `${API_URL}/feature/${featureId}/feature-process/${featureProcessId}`;
  axios.defaults.withCredentials = withCredentials;

  return new Promise<void>((resolve, reject) => {
    axios
      .delete(url, {
        // auth: {username: `${USER}`, password: `${PASSWORD}`},
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

export const getFeatureStatusOptions = (): Promise<FeatureStatusOptions[]> => {
  const url = `${API_URL}/feature/option/feature-status`;
  axios.defaults.withCredentials = withCredentials;

  return axios
    .get(url, {
      headers: {
        Accept: "application/json;charset=utf-8",
        "Content-Type": "application/json;charset=utf-8",
      },
    })
    .then((response) => response.data)
    .catch((reason) => {
      // console.log(reason);
      return Promise.reject(reason);
    });
};
