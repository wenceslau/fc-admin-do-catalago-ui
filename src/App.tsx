import * as React from 'react';
import {ThemeProvider} from "@mui/system";
import {Box, createTheme} from "@mui/material";
import Header from "./components/Header";
import {Layout} from "./components/Layout";

const theme = createTheme({});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Box
                component="main"
                sx={{
                    height: '100vh',
                    backgroundColor: 'white',
                }}
            >
                <Header/>
                <Layout>
                    <h1>App</h1>
                </Layout>
            </Box>

        </ThemeProvider>
    );
}


export default App;
