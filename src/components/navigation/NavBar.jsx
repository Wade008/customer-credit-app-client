import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { AppBar, Box, Container, IconButton, Toolbar, Typography, Menu, MenuItem, Button } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';


const NavBar = () => {

    const styles = {
        backgroundColor: "#dddddd",
        color: "#333333",

    };

    const navItems = [
        {
            title: "Home",
            link: "/"
        },
        {
            title: "Dashboard",
            link: "dashboard"
        },
        {
            title: "Login",
            link: "login"
        },
        {
            title: "Sign up",
            link: "register"
        }

    ];

    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleOpenNavMenu = (e) => {
        setAnchorElNav(e.currentTarget);
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    }

    const navigate = useNavigate()

    return (
        <AppBar position="static" style={{
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
                            {navItems.map((link) => {
                                return (
                                    <Link
                                        key={link.title}
                                        style={{
                                            textDecoration: "none",
                                            color: styles.color
                                        }}
                                        to={link.link}
                                    >

                                        <MenuItem
                                            onClick={handleCloseNavMenu}>

                                            <Typography textAlign="center">
                                                {link.title}
                                            </Typography>
                                        </MenuItem>

                                    </Link>
                                )

                            })}
                        </Menu>
                    </Box>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {navItems.map((link) => {

                            return (
                                <Link
                                    key={link.title}
                                    style={{
                                        textDecoration: "none",
                                    }}
                                    to={link.link}
                                >
                                    <Button
                                        key={link.title}
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, color: styles.color, display: 'block' }}
                                    >
                                        {link.title}
                                    </Button>
                                </Link>
                            )

                        })}
                    </Box>

                </Toolbar>

            </Container>
        </AppBar>
    )

}

export default NavBar
