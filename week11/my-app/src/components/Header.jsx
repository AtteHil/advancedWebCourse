

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link as RouterLink, MemoryRouter } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from 'i18next';



export default function ButtonAppBar() {
    const {t, i18n} = useTranslation();
    const changeLanguage = (language) => {
        i18n.changeLanguage(language)
    } 
  return (
    <React.Suspense fallback="loading">
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
            {/* <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
            > */}
            {/* </IconButton> */}
            <Button color="inherit" component={RouterLink} to="/"> {t("Home")}</Button>
            <Button color="inherit" component={RouterLink} to="/about">{t("About")}</Button>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            </Typography>
            
                
            
            <Button color="inherit" id="fi" onClick={() => {changeLanguage("fi")}}>FI</Button>
            <Button color="inherit" id="en" onClick={() => {changeLanguage("en")}}>EN</Button>
            </Toolbar>
        </AppBar>
        </Box>
    </React.Suspense>
  );
}

