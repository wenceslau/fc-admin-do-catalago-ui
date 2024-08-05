import {Category, CategoryID, CategoryParams, Results} from "../../types/Category";
import {apiSlice} from "../api/apiSlice";

const endpoint = "/categories";

function parseQueryParams(params: CategoryParams) {
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

function getCategories({ page = 0, perPage = 10, search = "" }) {
  const params = { page, perPage, search, direction: "desc", sort: "createdAt" };
  console.log(params);
  const url = `${endpoint}?${parseQueryParams(params)}`;
  console.log(url);
  return url;
}

function getCategory({ id }: { id: string }) {
  return `${endpoint}/${id}`;
}

function createCategoryMutation(category: Category) {
  return { url: endpoint, method: "POST", body: category };
}

function updateCategoryMutation(category: Category) {
  return {
    url: `${endpoint}/${category.id}`,
    method: "PUT",
    body: category,
  };
}

function deleteCategoryMutation(category: Category) {
  return {
    url: `${endpoint}/${category.id}`,
    method: "DELETE",
  };
}

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: ({query, mutation}) => ({
    getCategories: query<Results, CategoryParams>({ //Results is the response type defined in types/Category.ts
      query: getCategories, //getCategories is a function that returns the url
      providesTags: ["Categories"], //providesTags: ["Categories"] will cache the data in the redux store
    }),
    getCategory: query<Category, { id: string }>({
      query: getCategory,
      providesTags: ["Categories"], //providesTags: ["Categories"] will cache the data in the redux store
    }),
    createCategory: mutation<CategoryID, Category>({
      query: createCategoryMutation,
      invalidatesTags: ["Categories"], //invalidatesTags: ["Categories"] will re-fetch the data from the server, and update the cache with the new data
    }),
    updateCategory: mutation<CategoryID, Category>({
      query: updateCategoryMutation,
      invalidatesTags: ["Categories"], //invalidatesTags: ["Categories"] will re-fetch the data from the server, and update the cache with the new data
    }),
    deleteCategory : mutation<void, {id: string}>({ //void is the response type, {id: string} is the request type
      query: deleteCategoryMutation,  //deleteCategoryMutation is a function that returns the url and method
      invalidatesTags: ["Categories"], //invalidatesTags: ["Categories"] will re-fetch the data from the server, and update the cache with the new data
    }),
  }),
});

// const category: Category = {
//   id: id(),
//   name: "Category 1",
//   is_active: true,
//   created_at: "2021-10-01T00:00:00.000000Z",
//   updated_at: "2021-10-01T00:00:00.000000Z",
//   deleted_at: null,
//   description: "Category 1 description",
// };
//
// export const initialState = [
//   category,
//   {
//     ...category,
//     id:  id(),
//     name: "Category 2",
//     description: "Category 2 description",
//     created_at: "2021-10-02T00:00:00.000000Z",
//     is_active: true,
//   },
//   {
//     ...category,
//     id:  id(),
//     name: "Category 3",
//     description: "Category 3 description",
//     created_at: "2021-10-02T00:00:00.000000Z",
//     is_active: false,
//   },
//   {
//     ...category,
//     id:  id(),
//     name: "Category 4",
//     description: "Category 4 description",
//     created_at: "2021-10-02T00:00:00.000000Z",
//     is_active: false,
//   },
// ];

// function id(): string {
//   return Math.floor(Math.random() * 1000).toString();
// }

// const categoriesSlice = createSlice({
//   name: "categories",
//   initialState: initialState,
//   reducers: {
//     createCategory(state, action) {
//       state.push(action.payload);
//     },
//     updateCategory(state, action) {
//       const index = state.findIndex((category) => category.id === action.payload.id);
//       state[index] = action.payload;
//       //or
//       // const {id, name, description, is_active} = action.payload;
//       // const existingCategory = state.find((category) => category.id === id);
//       // if (existingCategory) {
//       //   existingCategory.name = name;
//       //   existingCategory.description = description;
//       //   existingCategory.is_active = is_active;
//       // }
//     },
//     deleteCategory(state, action) {
//       const index = state.findIndex((category) => category.id === action.payload.id);
//       state.splice(index, 1);
//     },
//   },
// });

// export const selectCategories = (state: RootState) => state.categories_;
//
// export const selectCategoryById = (state: RootState, id: string) => {
//   const category = state.categories_.find((category) => category.id === id);
//   return category || {
//     id: "",
//     name: "",
//     is_active: false,
//     created_at: "",
//     updated_at: null,
//     deleted_at: null,
//     description: null,
//   };
// };
//
// export default categoriesSlice.reducer;
// export const {createCategory, updateCategory, deleteCategory} =
//   categoriesSlice.actions;

export const {
  useGetCategoriesQuery,  // hook created automatically by redux, using the endpoint query getCategories
  useDeleteCategoryMutation, // hook created automatically by redux, using the endpoint mutation deleteCategory
  useCreateCategoryMutation, // hook created automatically by redux, using the endpoint mutation createCategory
  useUpdateCategoryMutation, // hook created automatically by redux, using the endpoint mutation updateCategory,
  useGetCategoryQuery, // hook created automatically by redux, using the endpoint query getCategory
} = categoriesApiSlice;
