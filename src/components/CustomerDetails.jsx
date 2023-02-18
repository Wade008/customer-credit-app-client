

import { useState } from "react";
import { MultiTitle } from "./styled/CustomStyles";
import { useParams, useNavigate } from "react-router-dom"
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import PersonAddTwoToneIcon from '@mui/icons-material/PersonAddTwoTone';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import ManageAccountsTwoToneIcon from '@mui/icons-material/ManageAccountsTwoTone';
import Tooltip from '@mui/material/Tooltip';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

function CustomerDetails(props) {
    // add state here when axios is added... update state through axios

    const { customers } = props;
    const { custId } = useParams()

    //use this to set the form state
    let customerDetails = customers.find((customer) => {
        return String(customer.id) === custId
    })

    let customerDetailsExtra = {
        ...customerDetails,
        creditChange: 0


    }

  
    const [customer, setCustomer] = useState(customerDetailsExtra)
    const [message, setMessage] = useState(null)
    const navigate = useNavigate();



    const handleFormChange = (e) => {
      
        setMessage(null)
        setCustomer((prevCustomer) => {

            //add condition here

            return {
                ...prevCustomer,
                [e.target.name]: e.target.value,

            }
        })
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();

        // add(customer)

        // setCustomer(initialFormState);
        // setMessage("Customer added successfully!")

    };


    const handleFormClose = () => {
        setMessage(null)
        // setCustomer(initialFormState)
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
                    <ManageAccountsTwoToneIcon />
                </Avatar>
                <Typography component="h1" variant="h5" sx={{ p: 2 }} >
                    Update customer details
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
                            <Tooltip title="Use up and down arrows to the right to add or remove credit" placement="top">
                                <TextField
                                    type="number"
                                    fullWidth
                                    name="creditChange"
                                    label="Add or Remove Credit"
                                    id="creditChange"
                                    // autoComplete="phone"
                                    value={customer.creditChange}
                                    onChange={handleFormChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Tooltip>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                disabled
                                name="currentCredit"
                                label="Available Credit After Update"
                                id="credit"
                                value={customer.currentCredit}
                                onChange={handleFormChange}
                            // validators={["matchRegexp:[0-9]$", "maxStringLength:10"]}
                            // errorMessages={["Must be a valid phone number", "Phone number must be 10 digits long"]}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, backgroundColor: "#47B2E4" }}
                    >
                        Update
                    </Button>
                    {message && <Typography textAlign="center" sx={{ marginTop: 1 }}>
                        {message}
                    </Typography>}
                    <Grid container justifyContent="center">
                        <Grid item>
                            <Link sx={{ color: "red" }} href="#" variant="body2">
                                Delete Customer
                            </Link>
                        </Grid>
                    </Grid>
                </ValidatorForm>
            </Box>

        </Container>

    )



}

export default CustomerDetails