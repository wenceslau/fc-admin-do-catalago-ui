import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL = "http://localhost:8081/";

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["Categories"],
  endpoints: (builder) => ({}),
  baseQuery: fetchBaseQuery({baseUrl: baseURL})
});

