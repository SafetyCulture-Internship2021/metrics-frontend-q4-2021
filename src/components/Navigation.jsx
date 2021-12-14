import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown'
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material"
import { useAuth } from "../hooks/auth";


export function Navigation() {
    const [dropDown, setDropdown] = useState(false);
    const doSomething = () => setClick = useState(false);
     
    const {isAuthenticated, logout} = useAuth();
    if (!isAuthenticated) {
        return <></>;
    }
        return (
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            Metrics Frontend
                        </Typography>
                        <Link to='/services' className='nav-sevices' onClick={doSomething}>
                            Services <i className='fas fa-caret-down' /></Link>
                        {dropDown && <Dropdown />}
                        <Button color="inherit" onClick={logout}>Logout</Button>
                    </Toolbar>
                </AppBar>
            </Box>
        );
}