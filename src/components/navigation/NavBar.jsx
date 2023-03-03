import React, { useState } from "react";
import { Link } from "react-router-dom"
import { AppBar, Box, Container, IconButton, Toolbar, Typography, Menu, MenuItem, Button } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useGlobalContext } from "../utils/globalStateContext";


const NavBar = (props) => {

    const { onExit } = props;

    const [anchorElNav, setAnchorElNav] = useState(null);
    const { store } = useGlobalContext()
    // let navigate = useNavigate();




    const handleLogout = () => {

        onExit();
    }

    const styles = {
        backgroundColor: "#dddddd",
        color: "#333333",

    };

    const navItemsBase = [
        {
            title: "Home",
            link: "/",
            onClick: () => {
                handleCloseNavMenu();
            }

        },
        {
            title: "Dashboard",
            link: "dashboard",
            onClick: () => {
                handleCloseNavMenu();
            }

        }
    ];

    const navItemsOut = [
        ...navItemsBase,
        {
            title: "Login",
            link: "login",
            onClick: () => {
                handleCloseNavMenu();
                // handleLogin(); 
            }
        },
        {
            title: "Sign up",
            link: "register",
            onClick: () => {
                handleCloseNavMenu();
                // handleLogin(); 
            }

        }
    ];

    const navItemsIn = [
        ...navItemsBase,
        // {
        //     title: "Profile",
        //     link: "dashboard/profile",
        //     onClick: () => {
        //         handleCloseNavMenu();
        //     }

        // },
        // {
        //     title: "Categories",
        //     link: "dashboard/categories",
        //     onClick: () => {
        //         handleCloseNavMenu();  
        //      }

        // },
        {
            title: "Logout",
            link: "/",
            onClick: () => {
                handleCloseNavMenu();
                handleLogout();
            }

        },

    ]


    const handleOpenNavMenu = (e) => {
        setAnchorElNav(e.currentTarget);
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    }

    return (
        <AppBar position="fixed" style={{
            backgroundColor: styles.backgroundColor,
            color: styles.color
        }} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
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
                        <Link style={{
                            textDecoration: "none",
                            color: styles.color
                        }} to="/">Customer Credit</Link>
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
                            anchor="left"
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
                            {!store.token ? (
                                navItemsOut.map((item) => {
                                    return (
                                        <Link
                                            key={item.title}
                                            style={{
                                                textDecoration: "none",
                                                color: styles.color
                                            }}
                                            to={item.link}
                                        >
                                            <MenuItem
                                                onClick={item.onClick}
                                            >
                                                <Typography textAlign="center" sx={{ color: styles.color }}>
                                                    {item.title}
                                                </Typography>
                                            </MenuItem>
                                        </Link>
                                    )

                                })

                            ) : (
                                navItemsIn.map((item) => {

                                    return (
                                        <Link
                                            key={item.title}
                                            style={{
                                                textDecoration: "none",
                                                color: styles.color
                                            }}
                                            to={item.link}
                                        >
                                            <MenuItem
                                                onClick={item.onClick}>
                                                <Typography textAlign="center" sx={{ color: styles.color }}>
                                                    {item.title}
                                                </Typography>
                                            </MenuItem>
                                        </Link>
                                    )

                                })

                            )}

                        </Menu>
                    </Box>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

                        {!store.token ? (

                            navItemsOut.map((item) => {

                                return (
                                    <Link
                                        key={item.title}
                                        style={{
                                            textDecoration: "none",
                                        }}
                                        to={item.link}
                                    >
                                        <Button
                                            key={item.title}
                                            onClick={item.onClick}
                                            sx={{ my: 2, color: styles.color, display: 'block' }}
                                        >
                                            {item.title}
                                        </Button>
                                    </Link>
                                )

                            })

                        ) : (

                            navItemsIn.map((item) => {

                                return (
                                    <Link
                                        key={item.title}
                                        style={{
                                            textDecoration: "none",
                                        }}
                                        to={item.link}
                                    >
                                        <Button
                                            key={item.title}
                                            onClick={item.onClick}
                                            sx={{ my: 2, color: styles.color, display: 'block' }}
                                        >
                                            {item.title}
                                        </Button>
                                    </Link>
                                )

                            })

                        )

                        }

                    </Box>

                </Toolbar>

            </Container>
        </AppBar>
    )

}

export default NavBar
