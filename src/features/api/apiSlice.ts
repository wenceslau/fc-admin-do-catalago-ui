import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseURL = "http://localhost:8081";

export const apiSlice = createApi({
  reducerPath: "api",
    tagTypes: ["Categories", "CastMembers", "Genres", "Videos"], //create automatically store for categories in redux
  endpoints: (builder) => ({}),
  baseQuery: fetchBaseQuery({baseUrl: baseURL})
});

