
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


function Profile(props) {

    const { userInfo, updateUser } = props;

    const [showPassword, setShowPassword] = useState(false);

    const [user, setUser] = useState(userInfo)


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

        updateUser(user)

        navigate("/dashboard/message", {
            state: {
                message: "Your details have been updated"
            }
        });


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
                    <UserForm
                        handleFormChange={handleFormChange}
                        user={user}
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
                        Update my details
                    </Button>

                </ValidatorForm>
            </Box>

        </Container>

    )


}

export default Profile