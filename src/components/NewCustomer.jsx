
import { useState } from "react"
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PersonAddTwoToneIcon from '@mui/icons-material/PersonAddTwoTone';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import { useNavigate } from "react-router-dom";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';




function NewCustomer(props) {

    const { addCustomer } = props;

    const initialFormState = {
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        currentCredit: 0
    }



    const [customer, setCustomer] = useState(initialFormState)

    const navigate = useNavigate();

    const handleFormChange = (e) => {
     
        setCustomer((prevCustomer) => {
            return {
                ...prevCustomer,
                [e.target.name]: e.target.value,
            }
        })
    }


    const handleFormSubmit = (event) => {
        event.preventDefault();

        addCustomer(customer)

        setCustomer(initialFormState);
        navigate("/dashboard/message",{
            state: {
                message: "Customer successfully added to the system"
            }
        });


    };

    const handleFormClose = () => {
        setCustomer(initialFormState)
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
                    <PersonAddTwoToneIcon />
                </Avatar>
                <Typography component="h1" variant="h5" sx={{ p: 2 }} >
                    Add a new customer
                </Typography>
                <ValidatorForm component="form" noValidate onSubmit={handleFormSubmit} >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextValidator
                                autoComplete="given-name"
                                name="firstname"
                                required
                                fullWidth
                                id="firstname"
                                label="First Name"
                                value={customer.firstname}
                                autoFocus
                                onChange={handleFormChange}
                                validators={['required']}
                                errorMessages={['This field is required']}

                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextValidator
                                required
                                fullWidth
                                id="lastname"
                                label="Last Name"
                                name="lastname"
                                autoComplete="family-name"
                                value={customer.lastname}
                                onChange={handleFormChange}
                                validators={['required']}
                                errorMessages={['This field is required']}

                            />
                        </Grid>

                        <Grid item xs={12}>

                            <TextValidator
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="mobile"
                                value={customer.email}
                                onChange={handleFormChange}
                                validators={['required', 'isEmail']}
                                errorMessages={['This field is required', 'email is not valid']}

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextValidator
                                fullWidth
                                name="phone"
                                label="Phone Number"
                                id="phone"
                                autoComplete="phone"
                                value={customer.phone}
                                onChange={handleFormChange}
                                validators={["matchRegexp:[0-9]$", "maxStringLength:10"]}
                                errorMessages={["Must be a valid phone number", "Phone number must be 10 digits long"]}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextValidator
                                fullWidth
                                name="currentCredit"
                                label="Add Credit"
                                id="credit"
                                autoComplete="credit"
                                value={customer.currentCredit}
                                onChange={handleFormChange}
                                validators={["required", "minNumber:0", "isNumber"]}
                                errorMessages={["This field is required", "Number must be positive", "Must be an integer"]}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, backgroundColor: "#47B2E4" }}
                    >
                        Add Customer
                    </Button>
                   
                </ValidatorForm>
            </Box>

        </Container>

    )


}

export default NewCustomer