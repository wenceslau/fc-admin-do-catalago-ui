import * as React from "react";
import {Box, Typography} from "@mui/material";
import {Layout} from "./components/Layout";
import {Route, Routes} from "react-router-dom";
import {CategoryList} from "./features/categories/CategoryList";
import {CategoryEdit} from "./features/categories/CategoryEdit";
import {CategoryCreate} from "./features/categories/CategoryCreate";
import {GenreCreate} from "./features/genre/GenreCreate";
import {GenreEdit} from "./features/genre/GenreEdit";
import {GenreList} from "./features/genre/GenreList";
import {VideosList} from "./features/videos/VideosList";
import {VideosCreate} from "./features/videos/VideosCreate";
import {VideosEdit} from "./features/videos/VideosEdit";
import {CastMemberEdit} from "./features/cast-members/CastMemberEdit";
import {CastMemberCreate} from "./features/cast-members/CastMemberCreate";
import {CastMemberList} from "./features/cast-members/CastMemberList";
import {UploadList} from "./features/uploads/UploadList";
import {ProtectedRoute} from "./components/ProtectedRoute";
import Home from "./components/Home";


function App() {
  return (
    <div data-testid="app">
      <Layout>
        <UploadList/>
        <Routes>

          {/* Login */}
          <Route path="/home" element={
            <Home/>
          }/>

          <Route path="/" element={
            <ProtectedRoute>
              <CategoryList/>
            </ProtectedRoute>
          }/>

          {/* Category */}
          <Route
            path="/categories"
            element={
              <ProtectedRoute>
                <CategoryList/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/categories/create"
            element={
              <ProtectedRoute>
                <CategoryCreate/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/categories/edit/:id"
            element={
              <ProtectedRoute>
                <CategoryEdit/>
              </ProtectedRoute>
            }
          />

          {/* Cast members */}
          <Route
            path="/cast-members"
            element={
              <ProtectedRoute>
                <CastMemberList/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/cast-members/create"
            element={
              <ProtectedRoute>
                <CastMemberCreate/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/cast-members/edit/:id"
            element={
              <ProtectedRoute>
                <CastMemberEdit/>
              </ProtectedRoute>
            }
          />

          {/* Genre */}
          <Route
            path="/genres"
            element={
              <ProtectedRoute>
                <GenreList/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/genres/create"
            element={
              <ProtectedRoute>
                <GenreCreate/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/genres/edit/:id"
            element={
              <ProtectedRoute>
                <GenreEdit/>
              </ProtectedRoute>
            }
          />

          {/* Videos */}
          <Route
            path="/videos"
            element={
              <ProtectedRoute>
                <VideosList/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/videos/create"
            element={
              <ProtectedRoute>
                <VideosCreate/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/videos/edit/:id"
            element={
              <ProtectedRoute>
                <VideosEdit/>
              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={
              <Box sx={{color: "white"}}>
                <Typography variant="h1">404</Typography>
                <Typography variant="h2">Page not found</Typography>
              </Box>
            }
          />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;

