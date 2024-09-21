import axios, { AxiosProgressEvent } from "axios";
import {baseURL} from "../api/apiSlice";
// import { baseUrl } from "../api/apiSlice";

export const API_ENDPOINT = `${baseURL}/videos`;

export const getEndpoint = (id: string, field: string) => `${API_ENDPOINT}/${id}/medias/${field}`;

export const formdata = (field: string, file: File) => {
  const data = new FormData();
  data.append("media_file", file);
  data.append("_method", "POST");
  data.append("Content-Type", "multipart/form-data");
  return data;
};

export const uploadProgress = (progressEvent: AxiosProgressEvent) => {
  if (progressEvent.total) {
    const progress = (progressEvent.loaded * 100) / progressEvent.total;
    return Math.round(progress * 100) / 100;
  }
  return 0;
};

export const uploadService = (params: {
  field: string;
  file: File;
  videoId: string;
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
}) => {
  const { field, file, videoId, onUploadProgress } = params;
  const endpoint = getEndpoint(videoId, field);
  const data = formdata(field, file);

  return axios.post(endpoint, data, { onUploadProgress });
};
