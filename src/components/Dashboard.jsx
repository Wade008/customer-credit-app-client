
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

import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone';
import { MultiBackground } from "./styled/CustomStyles";
import { keyMetrics, accountInfo } from "./dummydata/dummy";
import KeyMetrics from "./KeyMetrics";
import CustomerList from "./CustomerList";

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

    const { customers } = props;

    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    const navigate = useNavigate();

    const storeName = `${accountInfo.companyName} in ${accountInfo.storeSuburd}`;
    const creditValue = accountInfo.creditValue;
    const valueString = `The value of one credit point is: $${creditValue}`

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

    ]


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
                <Main open={open} sx={{ overflowY: "scroll", display: "f;ex", flexWrap: "wrap" }}>
                    <Box sx={{ display: "flex", pt: 6 }}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ mr: 0, ...(open && { display: 'none' }) }}
                        >
                            <MoreHorizTwoToneIcon />
                        </IconButton>
                    </Box>

                    <Box sx={{ textAlign: 'center', fontSize: "40px", color: "#333333" }}>
                        {storeName}
                    </Box>
                    <Box sx={{ textAlign: 'right', fontSize: "16px", color: "#333333" }}>
                        {valueString}
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
                </Main>

            </Box>
        </MultiBackground>
    )
}



export default Dashboard

