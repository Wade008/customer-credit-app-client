
import { useState } from "react"
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PersonAddTwoToneIcon from '@mui/icons-material/PersonAddTwoTone';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import { useNavigate } from "react-router-dom";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';




function NewCustomer() {


    const [customer, setCustomer] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: ""
    })

    const [customers, setCustomers] = useState([{
        id: 1,
        firstname: "Peter",
        lastname: "Parker",
        email: "p@p.com",
        phone: "123456789"
    },
    {
        id: 2,
        firstname: "Iron",
        lastname: "Man",
        email: "IM@2.com",
        phone: "789456123"
    },])

    const [message, setMessage] = useState(null)

    const navigate = useNavigate();

    const handleFormChange = (e) => {
        setMessage(null)
        setCustomer((prevCustomer) => {
            return {
                ...prevCustomer,
                [e.target.name]: e.target.value,
            }
        })
    }


    const handleFormSubmit = (event) => {
        event.preventDefault();

        setCustomers((prevCustomers) => {
            return [
                ...prevCustomers,
                { id: prevCustomers.length + 1, ...customer }
            ]
        }
        );
        setCustomer({
            firstname: "",
            lastname: "",
            email: "",
            phone: ""
        });
        setMessage("Customer added successfully!")

    };

    const handleFormClose = () => {
        setMessage(null)
        setCustomer({
            firstname: "",
            lastname: "",
            email: "",
            phone: ""
        })
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
                <Typography component="h1" variant="h5">
                    Add a new customer
                </Typography>
                <ValidatorForm component="form" noValidate onSubmit={handleFormSubmit} sx={{ mt: 3 }}>
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
                                errorMessages={['this field is required']}

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
                                errorMessages={['this field is required']}

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
                                errorMessages={['this field is required', 'email is not valid']}

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
                    {message && <Typography textAlign="center" sx={{ marginTop: 1 }}>
                        {message}
                    </Typography>}
                </ValidatorForm>
            </Box>

        </Container>

    )


}

export default NewCustomer