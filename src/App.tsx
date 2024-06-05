import * as React from 'react';
import {ThemeProvider} from "@mui/system";
import {Box, createTheme, Typography} from "@mui/material";
import Header from "./components/Header";
import {Layout} from "./components/Layout";
import {appTheme} from "./config/tehme";
import {Routes, Route, Link} from 'react-router-dom';
import {CategoryList} from "./features/categories/CategoryList";
import {CategoryEdit} from "./features/categories/CategoryEdit";
import {CategoryCreate} from "./features/categories/CategoryCreate";

function App() {
    return (
        <ThemeProvider theme={appTheme}>
            <Box
                component="main"
                sx={{
                    height: '100vh',
                    backgroundColor: (theme) => theme.palette.grey[900]
                }}
            >
                <Header/>
                <Layout>
                    <h1>Home</h1>
                    <Routes>
                        <Route path="/" element={<CategoryList/>} />
                        <Route path={"/categories"} element={<CategoryList/>} />
                        <Route path={"/categories/create"} element={<CategoryCreate/>} />
                        <Route path={"/categories/edit/:id"} element={<CategoryEdit/>} />
                        <Route path="*" element={<Typography variant="h3" component="h1">Page Not Found</Typography>} />
                    </Routes>

                </Layout>
            </Box>

        </ThemeProvider>
    );
}


export default App;
