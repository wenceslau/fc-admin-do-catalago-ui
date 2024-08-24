import {categoriesApiSlice} from "../features/categories/categorySlice";
import {apiSlice} from "../features/api/apiSlice";
import {
  Action,
  combineReducers,
  configureStore,
  PreloadedState,
  ThunkAction,
} from "@reduxjs/toolkit";
import {castMembersApiSlice} from "../features/cast-members/castMembersSlice";
import {genreSlice} from "../features/genre/genreSlice";

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  [categoriesApiSlice.reducerPath]: apiSlice.reducer,
  [castMembersApiSlice.reducerPath]: apiSlice.reducer,
  // [videosSlice.reducerPath]: apiSlice.reducer,
  [genreSlice.reducerPath]: apiSlice.reducer,
  // auth: authSlice.reducer,
  // uploadSlice: uploadReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["uploads/addUpload, uploads/updateUpload"],
          ignoredPaths: ["uploadSlice.file"],
        },
      })
        //.prepend(uploadQueue.middleware)
        .concat(apiSlice.middleware),
  });
};


// export const store = configureStore({
//   reducer:
//     {
//       counter: counterReducer,
//       [apiSlice.reducerPath]: apiSlice.reducer,
//       [categoriesApiSlice.reducerPath]: apiSlice.reducer,
//     },
//
//     middleware: (getDefaultMiddleware) => {
//     return getDefaultMiddleware().concat(apiSlice.middleware);
//   }
// });

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;
