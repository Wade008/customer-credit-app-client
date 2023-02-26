
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


    const handleFormSubmit = (event) => {
        event.preventDefault();

        setNewUser(initialFormState)
        console.log("Form submitted")


        // addCustomer(customer)

        // setCustomer(initialFormState);
        // navigate("/dashboard/message",{
        //     state: {
        //         message: "Customer successfully added to the system"
        //     }
        // });


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
                <Typography component="h1" variant="h5" sx={{ p: 2 }} >
                    Register
                </Typography>
                <ValidatorForm component="form" noValidate onSubmit={handleFormSubmit} >
                    <UserForm
                        handleFormChange={handleFormChange}
                        user={newUser}
                        showPassword={showPassword}
                        handleClickShowPassword={handleClickShowPassword}
                        handleMouseDownPassword={handleMouseDownPassword}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, backgroundColor: "#47B2E4" }}
                    >
                        Register
                    </Button>

                </ValidatorForm>
            </Box>

        </Container>

    )


}

export default Register