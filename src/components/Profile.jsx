
import { useState, useEffect } from "react"
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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function Profile(props) {

    const { currentUser, updateUser, setMessage, deleteUser } = props;

    const [user, setUser] = useState(currentUser)

    const [open, setOpen] = useState(false);


    useEffect(() => {
        setMessage("")

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const navigate = useNavigate();

    const handleFormChange = (e) => {
        setMessage("")
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
        navigate("/dashboard")

    };

    const handleUserDelete = () => {

        deleteUser();
        navigate("/");
    };

    const handleFormClose = () => {

        setMessage("")

        navigate("/dashboard");
    }

    const handleClickOpen = () => {
        setMessage("");
        setOpen(true);

    };

    const handleClose = () => {
        setMessage("");
        setOpen(false);

    };


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
                </ValidatorForm>
                <Grid container justifyContent="center">
                    <Grid item>
                        <Link
                            sx={{ color: "red" }}
                            variant="body2"
                            component="button"
                            onClick={handleClickOpen}

                        >
                            Delete my account
                        </Link>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                {"Delete account?"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Are you sure you want to delete your account and all of your customers' details?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => {
                                    handleClose()

                                }}>No</Button>
                                <Button onClick={() => {
                                    handleClose()
                                    handleUserDelete()

                                }} autoFocus>
                                    Yes
                                </Button>
                            </DialogActions>

                        </Dialog>
                    </Grid>
                </Grid>


            </Box>

        </Container>

    )


}

export default Profile