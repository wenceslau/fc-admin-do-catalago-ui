import * as React from "react";
import {ThemeProvider} from "@mui/system";
import {Box, CssBaseline, Typography} from "@mui/material";
import Header from "./components/Header";
import {Layout} from "./components/Layout";
import {darkTheme, lightTheme} from "./config/tehme";
import {Route, Routes} from "react-router-dom";
import {CategoryList} from "./features/categories/CategoryList";
import {CategoryEdit} from "./features/categories/CategoryEdit";
import {CategoryCreate} from "./features/categories/CategoryCreate";
import {SnackbarProvider} from "notistack";
import {CastMemberList} from "./features/cast-members/CastMemberList";
import {CastMemberEdit} from "./features/cast-members/CastMemberEdit";
import {GenreCreate} from "./features/genre/GenreCreate";
import {CastMemberCreate} from "./features/cast-members/CastMemberCreate";
import {GenreEdit} from "./features/genre/GenreEdit";
import {GenreList} from "./features/genre/GenreList";
import {VideosList} from "./features/videos/VideosList";
import {VideosCreate} from "./features/videos/VideosCreate";
import {VideosEdit} from "./features/videos/VideosEdit";


function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <SnackbarProvider maxSnack={3} anchorOrigin={{
        vertical: "top",
        horizontal: "right"
      }}>
        {/*<Box*/}
        {/*  component="main"*/}
        {/*  sx={{*/}
        {/*    height: "100vh",*/}
        {/*    backgroundColor: (theme) => theme.palette.background.default,*/}
        {/*  }}*/}
        {/*>*/}
          <Header/>
          <Layout>
            <Routes>
              <Route path='/' element={<CategoryList/>}/>
              <Route path={"/categories"} element={<CategoryList/>}/>
              <Route path={"/categories/create"} element={<CategoryCreate/>}/>
              <Route path={"/categories/edit/:id"} element={<CategoryEdit/>}/>

              <Route path={"/cast-members"} element={<CastMemberList/>}/>
              <Route path={"/cast-members/create"} element={<CastMemberCreate/>}/>
              <Route path={"/cast-members/edit/:id"} element={<CastMemberEdit/>}/>

              {/* Genre */}
              <Route path="/genres" element={<GenreList/>}/>
              <Route path="/genres/create" element={<GenreCreate/>}/>
              <Route path="/genres/edit/:id" element={<GenreEdit/>}/>

              {/* Videos */}
              <Route path="/videos" element={<VideosList/>}/>
              <Route path="/videos/create" element={<VideosCreate/>}/>
              <Route path="/videos/edit/:id" element={<VideosEdit/>}/>

              <Route path="*" element={<Typography variant="h3" component="h1">Page Not Found</Typography>}/>
            </Routes>

          </Layout>
        {/*</Box>*/}
      </SnackbarProvider>

    </ThemeProvider>
  );
}


export default App;
