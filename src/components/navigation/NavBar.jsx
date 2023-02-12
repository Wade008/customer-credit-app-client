import React, { useState } from "react";
import { AppBar, Box, Container, IconButton, Toolbar, Typography, Menu, MenuItem, Button } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import HowToRegRoundedIcon from '@mui/icons-material/HowToRegRounded';


const styles = {
    backgroundColor: "#dddddd",
    color: "#333333",
  
};

const loggedOutLinks = [
    {
        title: "Home",
        icon: <HomeRoundedIcon />
    },
    {
        title: "Dashboard",
        icon: <DashboardRoundedIcon />
    },
    {
        title: "Login",
        icon: <LoginIcon />
    },
    {
        title: "Sign up",
        icon: <HowToRegRoundedIcon />
    }

];



const NavBar = () => {


    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleOpenNavMenu = (e) => {
        setAnchorElNav(e.currentTarget);
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    }

    return (
        <AppBar style={{
            backgroundColor: styles.backgroundColor,
            color: styles.color
        }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        // component="h1"
                        noWrap
                        sx={{
                            flexGrow: 1
                        }}
                    >
                        Customer Credit
                    </Typography>

                    <Box sx={{ mr: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>

                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {loggedOutLinks.map((link) => (
                                <MenuItem key={link.title} onClick={handleCloseNavMenu}>
                                   {link.icon}
                                    <Typography textAlign="center">
                                        {link.title}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {loggedOutLinks.map((link) => (
                   
                          
                            <Button
                                key={link.title}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: styles.color, display: 'block' }}
                            >
                                 {link.icon} {link.title}
                            </Button>
                        
                        ))}
                    </Box>

                </Toolbar>

            </Container>
        </AppBar>
    )

}

export default NavBar
