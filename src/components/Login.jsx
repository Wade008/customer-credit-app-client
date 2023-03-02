
import { useState } from "react"
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import VpnKeyTwoToneIcon from '@mui/icons-material/VpnKeyTwoTone';
import { useNavigate } from "react-router-dom";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useGlobalContext } from "./utils/globalStateContext"
import axios from "axios";


function Login() {

  

    const initialUserState = {
        username: "",
        password: "",
    }
    const [user, setUser] = useState(initialUserState)

    const [errorMessage, setErrorMessage] = useState({
        apiError: null
    })
    const { store, dispatch } = useGlobalContext()


    const navigate = useNavigate();

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

        axios
            .post("/auth/login", user)
            .then((res) => res.data)
            .then((json) => {
                dispatch({
                    type: 'setToken',
                    data: json.token
                })
            })
            .catch(() => {
                setErrorMessage((prevError) => {
                    return {
                        ...prevError,
                        apiError: "Username/password is incorrect"
                    }
                })

            })
    };


    const handleFormClose = () => {
        setUser(initialUserState)
        navigate("/");
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
                    <VpnKeyTwoToneIcon />
                </Avatar>
                {store.token ?  navigate("/dashboard"):
                    <>
                        <Typography component="h1" variant="h5" sx={{ p: 2 }} >
                            Login
                        </Typography>
                        {errorMessage.apiError && <Typography component="h1" variant="subtitle1" sx={{ p: 2 }} >
                            {errorMessage.apiError}
                        </Typography>}
                        <ValidatorForm component="form" noValidate onSubmit={handleFormSubmit} >
                            <Grid container spacing={2}>
                                <Grid item xs={12} >
                                    <TextValidator
                                        name="username"
                                        required
                                        fullWidth
                                        id="username"
                                        label="Username"
                                        value={user.username}
                                        autoFocus
                                        onChange={handleFormChange}
                                        validators={['required']}
                                        errorMessages={['This field is required']}

                                    />
                                </Grid>
                                <Grid item xs={12} >
                                    <TextValidator
                                        required
                                        fullWidth
                                        id="password"
                                        label="Password"
                                        name="password"
                                        type="password"
                                        value={user.password}
                                        onChange={handleFormChange}
                                        validators={['required']}
                                        errorMessages={['This field is required']}

                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, backgroundColor: "#47B2E4" }}
                            >
                                Login
                            </Button>

                        </ValidatorForm> </>}
            </Box>

        </Container>

    )


}

export default Login