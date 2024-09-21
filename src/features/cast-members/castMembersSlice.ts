import {
  CastMembers,
  CastMemberParams,
  CastMember, CastMemberID,
} from "../../types/CastMembers";

import { apiSlice } from "../api/apiSlice";

const endpointUrl = "/cast_members";

export const initialState: CastMember = {
  id: "",
  name: "",
  type: "",
  created_at: "",
};

function parseQueryParams(params: CastMemberParams) {
  const query = new URLSearchParams();

  if (params.page) {
    query.append("page", params.page.toString());
  }

  if (params.perPage) {
    query.append("perPage", params.perPage.toString());
  }

  if (params.search) {
    query.append("search", params.search);
  }

  return query.toString();
}

function getCastMembers(params: CastMemberParams) {
  const { page = 1, perPage = 10, search } = params;
  return `${endpointUrl}?${parseQueryParams({
    page,
    perPage,
    search
  })}`;
}

function deleteCastMember({ id }: { id: string }) {
  return {
    method: "DELETE",
    url: `${endpointUrl}/${id}`,
  };
}

function getCastMember({ id }: { id: string }) {
  return {
    method: "GET",
    url: `${endpointUrl}/${id}`,
  };
}

function updateCastMember(castMember: CastMember) {
  return {
    method: "PUT",
   // headers: { "Content-Type": "application/json" },
    url: `${endpointUrl}/${castMember.id}`,
    body: castMember,
  };

}

function createCastMember(castMember: CastMember) {
  return {
    method: "POST",
    url: endpointUrl,
    body: castMember,
  };
}

export const castMembersApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getCastMembers: query<CastMembers, CastMemberParams>({
      query: getCastMembers,
      providesTags: ["CastMembers"], //providesTags: ["CastMembers"] will store the data in the cache
    }),
    getCastMember: query<CastMember, { id: string }>({
      query: getCastMember,
      providesTags: ["CastMembers"], //providesTags: ["CastMembers"] will store the data in the cache
    }),
    updateCastMember: mutation<CastMemberID, CastMember>({
      query: updateCastMember,
      invalidatesTags: ["CastMembers"], //invalidatesTags: ["CastMembers"] will re-fetch the data from the server, and update the cache with the new data
    }),
    createCastMember: mutation<CastMemberID, CastMember>({
      query: createCastMember,
      invalidatesTags: ["CastMembers"], //invalidatesTags: ["CastMembers"] will re-fetch the data from the server, and update the cache with the new data
    }),
    deleteCastMember: mutation<void, { id: string }>({
      query: deleteCastMember,
      invalidatesTags: ["CastMembers"], //invalidatesTags: ["CastMembers"] will re-fetch the data from the server, and update the cache with the new data
    }),
  }),
});

export const {
  useGetCastMemberQuery,
  useGetCastMembersQuery,
  useDeleteCastMemberMutation,
  useUpdateCastMemberMutation,
  useCreateCastMemberMutation,
} = castMembersApiSlice;
