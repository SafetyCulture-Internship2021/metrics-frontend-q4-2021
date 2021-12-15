import React from "react";
import {BrowserRouter} from "react-router-dom";
import styled from "styled-components";
import { Box } from "@mui/material";
import Dropdown from "./components/Dropdown";
import { useState } from "react";


import "./App.css";
import {MetricsRouter} from "./Router";
import {Navigation} from "./components/Navigation";
import {AuthProvider} from "./hooks/auth";



function App() {
    const [selected, setSelected] = useState('Services')
    return (
        <StyledContainer maxWidth="lg">
            <BrowserRouter>
                <AuthProvider>
                    <Navigation/>
                    <Box sx={{
                        padding: '1rem'
                    }}>
                    <Dropdown selected={selected} setSelected={setSelected}/>
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
