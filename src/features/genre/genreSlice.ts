import {
  Genre,
  GenreParams,
  GenrePayload,
  Genres,
} from "../../types/Genres";
import { apiSlice } from "../api/apiSlice";

const endpointUrl = "/genres";

export const initialState = {
  id: "",
  name: "",
  created_at: "",
  updated_at: "",
  deleted_at: null,
  is_active: false,
  categories: [],
  categories_id: [],
  pivot: { genre_id: "", category_id: "" },
};

function parseQueryParams(params: GenreParams) {
  const query = new URLSearchParams();

  if (params.page || params.page === 0) {
    query.append("page", params.page.toString());
  }

  if (params.perPage) {
    query.append("perPage", params.perPage.toString());
  }

  if (params.search) {
    query.append("search", params.search);
  }

  if (params.direction) {
    query.append("direction", params.direction.toString());
  }

  if (params.sort) {
    query.append("sort", params.sort.toString());
  }

  return query.toString();
}

function getGenres({ page = 1, perPage = 10, search = "" }) {
  const params = { page, perPage, search };
  return `${endpointUrl}?${parseQueryParams(params)}`;
}

function deleteGenreMutation({ id }: { id: string }) {
  return { url: `${endpointUrl}/${id}`, method: "DELETE" };
}

function createGenreMutation(genre: GenrePayload) {
  return { url: endpointUrl, method: "POST", body: genre };
}

function getGenre({ id }: { id: string }) {
  return `${endpointUrl}/${id}`;
}

function updateGenreMutation(genre: GenrePayload) {
  return { url: `${endpointUrl}/${genre.id}`, method: "PUT", body: genre };
}

export const genreSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getGenre: query<Genre, { id: string }>({
      query: getGenre,
      providesTags: ["Genres"],
    }),
    updateGenre: mutation<Genre, GenrePayload>({
      query: updateGenreMutation,
      invalidatesTags: ["Genres"],
    }),
    createGenre: mutation<Genre, GenrePayload>({
      query: createGenreMutation,
      invalidatesTags: ["Genres"],
    }),
    deleteGenre: mutation<Genre, { id: string }>({
      query: deleteGenreMutation,
      invalidatesTags: ["Genres"],
    }),

    getGenres: query<Genres, GenreParams>({
      query: getGenres,
      providesTags: ["Genres"],
    }),
  }),
});

export const {
  useGetGenresQuery,
  useDeleteGenreMutation,
  useGetGenreQuery,
  useUpdateGenreMutation,
  useCreateGenreMutation,
} = genreSlice;
