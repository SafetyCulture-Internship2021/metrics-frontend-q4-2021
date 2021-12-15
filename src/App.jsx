import React from "react";
import {BrowserRouter} from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "@mui/material";
import Dropdown from "./components/Dropdown";


import "./App.css";
import {MetricsRouter} from "./Router";
import {Navigation} from "./components/Navigation";
import {AuthProvider} from "./hooks/auth";



function App() {
    return (
        <StyledContainer maxWidth="lg">
            <BrowserRouter>
                <AuthProvider>
                    <Navigation/>
                    <Box sx={{
                        padding: '1rem'
                    }}>
                        <Button color="inherit" onClick={Dropdown}>Services</Button>
                        <MetricsRouter/>
                    </Box>
                </AuthProvider>
            </BrowserRouter>
        </StyledContainer>
    );
}

export default App;

const StyledContainer = styled.div`
  height: 100vh;
`
