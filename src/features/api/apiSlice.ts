import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {keycloak} from "../../keycloakConfig";

export const baseURL = "http://localhost:8084";

export const apiSlice = createApi({
  reducerPath: "api",
    tagTypes: ["Categories", "CastMembers", "Genres", "Videos"], //create automatically store for categories in redux
  endpoints: (builder) => ({}),
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      console.log(keycloak.token);
      if (keycloak.token) {
        headers.set("Authorization", `Bearer ${keycloak.token}`);
      }
      return headers;
    },
  })
});

