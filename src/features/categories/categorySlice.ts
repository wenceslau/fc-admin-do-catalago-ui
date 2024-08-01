import {RootState} from "../../app/store";
import {Results} from "../../types/Category";
import {apiSlice} from "../api/apiSlice";
import {createSlice} from "@reduxjs/toolkit";

export interface Category {
  id: string;
  name: null | string;
  is_active: boolean;
  created_at: string;
  updated_at: null | string;
  deleted_at: null | string;
  description: null | string;
}

const endpoint = "/categories";

function deleteCategoryMutation(category: Category) {
  return {
    url: `${endpoint}/${category.id}`,
    method: "DELETE",
  };
}

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: ({query, mutation}) => ({
    getCategories: query<Results, void>({ //Results is the response type defined in types/Category.ts
      query: () => endpoint,  //endpoint is "/categories"
      providesTags: ["Categories"],
    }),
    deleteCategory : mutation<void, {id: string}>({ //void is the response type, {id: string} is the request type
      query: deleteCategoryMutation,  //deleteCategoryMutation is a function that returns the url and method
      invalidatesTags: ["Categories"],
    }),
  }),
});

const category: Category = {
  id: id(),
  name: "Category 1",
  is_active: true,
  created_at: "2021-10-01T00:00:00.000000Z",
  updated_at: "2021-10-01T00:00:00.000000Z",
  deleted_at: null,
  description: "Category 1 description",
};

export const initialState = [
  category,
  {
    ...category,
    id:  id(),
    name: "Category 2",
    description: "Category 2 description",
    created_at: "2021-10-02T00:00:00.000000Z",
    is_active: true,
  },
  {
    ...category,
    id:  id(),
    name: "Category 3",
    description: "Category 3 description",
    created_at: "2021-10-02T00:00:00.000000Z",
    is_active: false,
  },
  {
    ...category,
    id:  id(),
    name: "Category 4",
    description: "Category 4 description",
    created_at: "2021-10-02T00:00:00.000000Z",
    is_active: false,
  },
];

function id(): string {
  return Math.floor(Math.random() * 1000).toString();
}

const categoriesSlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {
    createCategory(state, action) {
      state.push(action.payload);
    },
    updateCategory(state, action) {
      const index = state.findIndex((category) => category.id === action.payload.id);
      state[index] = action.payload;
      //or
      // const {id, name, description, is_active} = action.payload;
      // const existingCategory = state.find((category) => category.id === id);
      // if (existingCategory) {
      //   existingCategory.name = name;
      //   existingCategory.description = description;
      //   existingCategory.is_active = is_active;
      // }
    },
    deleteCategory(state, action) {
      const index = state.findIndex((category) => category.id === action.payload.id);
      state.splice(index, 1);
    },
  },
});

export const selectCategories = (state: RootState) => state.categories_;

export const selectCategoryById = (state: RootState, id: string) => {
  const category = state.categories_.find((category) => category.id === id);
  return category || {
    id: "",
    name: "",
    is_active: false,
    created_at: "",
    updated_at: null,
    deleted_at: null,
    description: null,
  };
};

export default categoriesSlice.reducer;
export const {createCategory, updateCategory, deleteCategory} =
  categoriesSlice.actions;

export const {
  useGetCategoriesQuery,  // hook created automatically by redux, using the endpoint query getCategories
  useDeleteCategoryMutation, // hook created automatically by redux, using the endpoint mutation deleteCategory
} = categoriesApiSlice;
