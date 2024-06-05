import {createSlice} from "@reduxjs/toolkit";

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
    description: null,
}

export const initialState = [
    category,
    {
        ...category,
        id: '2',
        name: 'Category 2',
    },
    {
        ...category,
        id: '3',
        name: 'Category 3',
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

export default categoriesSlice.reducer;