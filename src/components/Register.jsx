
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
import HowToRegIcon from '@mui/icons-material/HowToReg';
import UserForm from "./UserForm";
import axios from "axios";
import { useGlobalContext } from "./utils/globalStateContext";
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';

function Register() {

    const initialFormState = {
        firstname: "",
        lastname: "",
        username: "",
        companyname: "",
        storesuburb: "",
        email: "",
        password: "",
        phone: "",
        creditvalue: 1
    }


    const [showPassword, setShowPassword] = useState(false);

    const [newUser, setNewUser] = useState(initialFormState)

    const [errorMessage, setErrorMessage] = useState({
        apiError: null
    })

    const { store, dispatch } = useGlobalContext()

    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    const handleFormChange = (e) => {

        setNewUser((prevUser) => {
            return {
                ...prevUser,
                [e.target.name]: e.target.value,
            }
        })
    }


    const handleFormSubmit = (e) => {
        e.preventDefault();
        axios
            .post("/auth/register", newUser)
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
                        apiError: "Username already taken"
                    }
                })
                console.log(errorMessage)

            })

    };

    const handleFormClose = () => {
        setNewUser(initialFormState)
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
                    <HowToRegIcon />
                </Avatar>
                {store.token ? navigate("/dashboard") :
                    <>
                        <Typography component="h1" variant="h5" sx={{ p: 2 }} >
                            Register
                        </Typography>
                        {errorMessage.apiError && <Typography component="h1" variant="subtitle1" sx={{ p: 2 }} >
                            {errorMessage.apiError}
                        </Typography>}
                        <ValidatorForm component="form" noValidate onSubmit={handleFormSubmit} >
                            <Grid container spacing={2}>
                                <UserForm
                                    handleFormChange={handleFormChange}
                                    user={newUser}
                                />

                                <Grid item xs={12} >
                                    <FormControl
                                        required
                                        fullWidth
                                        variant="outlined">
                                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                        <OutlinedInput

                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            value={newUser.password}
                                            name="password"
                                            onChange={handleFormChange}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Password"
                                        />
                                    </FormControl>
                                </Grid>


                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, backgroundColor: "#47B2E4" }}
                            >
                                Register
                            </Button>

                        </ValidatorForm>
                    </>}
            </Box>

        </Container>

    )


}

export default Register