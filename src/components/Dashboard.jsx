
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import AddBoxTwoToneIcon from '@mui/icons-material/AddBoxTwoTone';
import MonetizationOnTwoToneIcon from '@mui/icons-material/MonetizationOnTwoTone';
import Tooltip from '@mui/material/Tooltip';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import { MultiBackground } from "./styled/CustomStyles";
import KeyMetrics from "./KeyMetrics";
import CustomerList from "./CustomerList";
import PersonPinTwoToneIcon from '@mui/icons-material/PersonPinTwoTone';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CardMembershipTwoToneIcon from '@mui/icons-material/CardMembershipTwoTone';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import MenuIcon from '@mui/icons-material/Menu';



const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);


function Dashboard(props) {

    const { customers, currentUser, message, setMessage, metrics } = props;

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setMessage("");

    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    const navigate = useNavigate();


    // console.log(location.state.message)

    const storeName = `${currentUser.companyname} in ${currentUser.storesuburb}`;



    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
    }));

    // MonetizationOnTwoToneIcon 

    const menuItems = [
        {
            name: "Profile",
            icon: <PersonPinTwoToneIcon />,
            onClick: () => {
                navigate("profile")
            }

        },
        {
            name: "New customer",
            icon: <AddBoxTwoToneIcon />,
            onClick: () => {
                navigate("addcustomer")
            }
        },
        {
            name: "Change credit value",
            icon: <MonetizationOnTwoToneIcon />,
            onClick: () => {
                navigate("creditvalue")
            }
        },

    ];

    // prepare key metrics array - add icons interatively

  
        const icons = [< PeopleAltTwoToneIcon />, < CardMembershipTwoToneIcon />, < MonetizationOnTwoToneIcon />]

        let keyMetrics = metrics.map((metric, index) => {
            return { ...metric, icon: icons[index] }
        })





    const drawer = (
        <div>
            <Typography textAlign="center" sx={{ p: 1, color: "#333333", fontWeight: 'bold', fontSize: 20 }}>
                Menu
            </Typography>
            <List>
                {menuItems.map((item) => (
                    <ListItem key={item.name} disablePadding>
                        <ListItemButton onClick={item.onClick}>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );


    return (
        <MultiBackground>

            <Box sx={{ display: 'flex' }}>
                <CssBaseline />


                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },

                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}
                >

                    <DrawerHeader sx={{ pt: 10 }}>
                        <IconButton onClick={handleDrawerClose}>
                            <CloseTwoToneIcon />
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    {drawer}

                </Drawer>
                <Main open={open} sx={{ overflowY: "scroll" }}>
                    <Box sx={{ display: "flex", pt: 8 }}>
                        <Tooltip title="Click here to access dashboard menu" placement="right" arrow>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                sx={{ mr: 0, ...(open && { visibility: 'hidden' }) }}
                            >
                                < MenuIcon />
                            </IconButton>
                        </Tooltip>

                    </Box>

                    <Box sx={{ textAlign: 'center', fontSize: "40px", color: "#333333" }}>
                        {storeName}
                    </Box>
                    <Box sx={{ textAlign: 'right', fontSize: "16px", color: "#333333" }}>
                        The value of one credit point is: ${currentUser.creditvalue}
                    </Box>
                    <Divider />
                    <Box display="flex" sx={{ flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                        {keyMetrics.map((metric) => {
                            return (
                                <KeyMetrics
                                    key={metric.title}
                                    title={metric.title}
                                    icon={metric.icon}
                                    value={metric.value}
                                />
                            )
                        })}


                    </Box>
                    <Divider sx={{ pt: 2 }} />

                    <CustomerList customers={customers} />

                    <Dialog
                        open={message ? true : false}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Message"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                {message}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} autoFocus>OK</Button>
                        </DialogActions>

                    </Dialog>
                </Main>

            </Box>

        </MultiBackground>
    )
}



export default Dashboard

