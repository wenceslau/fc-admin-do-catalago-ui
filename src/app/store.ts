import {Action, configureStore, PreloadedState, ThunkAction} from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import {categoriesApiSlice} from "../features/categories/categorySlice";
import {apiSlice} from "../features/api/apiSlice";

export const store = configureStore({
  reducer:
    {
      counter: counterReducer,
      [apiSlice.reducerPath]: apiSlice.reducer,
      [categoriesApiSlice.reducerPath]: apiSlice.reducer,
    },

    middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
