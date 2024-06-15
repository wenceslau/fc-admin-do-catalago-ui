import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';

interface Category {
  id: string;
  name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
  description: null | string;
}

const category: Category = {
  id: '1',
  name: 'Category 1',
  is_active: true,
  created_at: '2021-10-01T00:00:00.000000Z',
  updated_at: '2021-10-01T00:00:00.000000Z',
  deleted_at: null,
  description: 'Category 1 description',
};

export const initialState = [
  category,
  {
    ...category,
    id: '2',
    name: 'Category 2',
    description: 'Category 2 description',
    created_at: '2021-10-02T00:00:00.000000Z',
    is_active: true,
  },
  {
    ...category,
    id: '3',
    name: 'Category 3',
    description: 'Category 3 description',
    created_at: '2021-10-02T00:00:00.000000Z',
    is_active: false,
  },
  {
    ...category,
    id: '4',
    name: 'Category 4',
    description: 'Category 4 description',
    created_at: '2021-10-02T00:00:00.000000Z',
    is_active: false,
  },
  {
    ...category,
    id: '5',
    name: 'Category 5',
    description: 'Category 5 description',
    created_at: '2021-10-02T00:00:00.000000Z',
    is_active: false,
  },
  {
    ...category,
    id: '6',
    name: 'Category 6',
    description: 'Category 6 description',
    created_at: '2021-10-02T00:00:00.000000Z',
    is_active: false,
  },
  {
    ...category,
    id: '7',
    name: 'Category 7',
    description: 'Category 7 description',
    created_at: '2021-10-02T00:00:00.000000Z',
    is_active: false,
  },
  {
    ...category,
    id: '8',
    name: 'Category 8',
    description: 'Category 8 description',
    created_at: '2021-10-02T00:00:00.000000Z',
    is_active: false,
  },
  {
    ...category,
    id: '9',
    name: 'Category 9',
    description: 'Category 9 description',
    created_at: '2021-10-02T00:00:00.000000Z',
    is_active: false,
  },
  {
    ...category,
    id: '10',
    name: 'Category 10',
    description: 'Category 10 description',
    created_at: '2021-10-02T00:00:00.000000Z',
    is_active: false,
  }
];

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: initialState,
  reducers: {
    createCategory(state, action) {
    },
    updateCategory(state, action) {
    },
    deleteCategory(state, action) {
    },
  },
});

export const selectCategories = (state: RootState) => state.categories;

export const selectCategoryById = (state: RootState, id: string) =>
  state.categories.find((category) => category.id === id);

export default categoriesSlice.reducer;
