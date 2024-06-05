import * as React from 'react';
import {ThemeProvider} from "@mui/system";
import {Box, createTheme, Typography} from "@mui/material";
import Header from "./components/Header";
import {Layout} from "./components/Layout";
import {appTheme} from "./config/tehme";
import {Routes, Route, Link} from 'react-router-dom';

const Home = () => (
        <div>
            <Typography variant="h1">Home</Typography>
            <Link to="/about">About</Link>
        </div>
);

const About = () => (
    <div>
        <Typography variant="h1">About</Typography>
        <Link to="/">Home</Link>
    </div>
);

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
                        <Route path="/" element={<Home/>}/>
                        <Route path="/about" element={<About/>}/>
                    </Routes>

                </Layout>
            </Box>

        </ThemeProvider>
    );
}


export default App;
