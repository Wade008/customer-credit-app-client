
import { useState } from "react"
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import { useNavigate } from "react-router-dom";
import { ValidatorForm } from 'react-material-ui-form-validator';
import UserForm from "./UserForm";
import PermIdentityTwoToneIcon from '@mui/icons-material/PermIdentityTwoTone';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import axios from "axios";

function Profile(props) {

    const { currentUser, updateUser } = props;

    const [showPassword, setShowPassword] = useState(false);

    const [user, setUser] = useState(currentUser)


    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    const handleFormChange = (e) => {

        setUser((prevUser) => {
            return {
                ...prevUser,
                [e.target.name]: e.target.value,
            }
        })
    }


    const handleFormSubmit = (e) => {
        e.preventDefault();

        const updateCurrentUser = async () => {

            try {
                const response = await axios.put("auth/profile", user);
                console.log(response.data)
                //check if error message before updating state
                if(response.data.error){
                    
                }
                updateUser(response.data)

                navigate("/dashboard/message", {
                    state: {
                        message: "Your details have been updated"
                    }
                });
            }
            catch (err) {
                console.log(err)
                navigate("/dashboard/message", {
                    state: {
                        message: "Error! The update failed. Please try again"
                    }
                });
            }
        }

        updateCurrentUser();

    };

    const handleUserDelete = () => {


    };

    const handleFormClose = () => {

        navigate("/dashboard");
    }


    return (


        <Container component="main" maxWidth="xs">
            <CssBaseline />

            <Box display="block" sx={{ marginTop: 12 }}>
                <IconButton onClick={handleFormClose}>
                    <CloseTwoToneIcon />
                </IconButton>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1 }}>
                    <PermIdentityTwoToneIcon />
                </Avatar>
                <Typography component="h1" variant="h5" sx={{ p: 2 }} >
                    Hi {user.firstname}
                </Typography>
                <ValidatorForm component="form" noValidate onSubmit={handleFormSubmit} >
                <Grid container spacing={2}>
                    <UserForm
                        handleFormChange={handleFormChange}
                        user={user}
                        showPassword={showPassword}
                        handleClickShowPassword={handleClickShowPassword}
                        handleMouseDownPassword={handleMouseDownPassword}
                    />
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, backgroundColor: "#47B2E4" }}
                    >
                        Update my details
                    </Button>
                    <Grid container justifyContent="center">
                        <Grid item>
                            <Link
                                sx={{ color: "red" }}
                                variant="body2"
                                component="button"
                                onClick={handleUserDelete}
                            >
                                Delete my account
                            </Link>
                        </Grid>
                    </Grid>

                </ValidatorForm>
            </Box>

        </Container>

    )


}

export default Profile