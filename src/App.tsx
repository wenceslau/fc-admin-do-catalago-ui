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


function App() {
  return (
    <div data-testid="app">
      <Layout>
        <UploadList />
        <Routes>
          <Route path="/" element={<CategoryList/>}/>

          {/* Login */}

          {/* Category */}
          <Route path="/categories" element={<CategoryList/>}/>
          <Route path="/categories/create" element={<CategoryCreate/>}/>
          <Route path="/categories/edit/:id" element={<CategoryEdit/>}/>

          {/* Cast members */}
          <Route path="/cast-members" element={<CastMemberList/>}/>
          <Route path="/cast-members/create" element={<CastMemberCreate/>}/>
          <Route path="/cast-members/edit/:id" element={<CastMemberEdit/>}/>

          {/* Genre */}
          <Route path="/genres" element={<GenreList/>}/>
          <Route
            path="/genres/create" element={<GenreCreate/>}/>
          <Route path="/genres/edit/:id" element={<GenreEdit/>}/>

          {/* Videos */}
          <Route path="/videos" element={<VideosList/>}/>
          <Route path="/videos/create" element={<VideosCreate/>}/>
          <Route path="/videos/edit/:id" element={<VideosEdit/>}/>

          <Route path="*" element={
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

