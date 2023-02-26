
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
import CustomerForm from "./CustomerForm";



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
        navigate("/dashboard/message", {
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

                        <CustomerForm
                            customer={customer}
                            handleFormChange={handleFormChange}
                        />
                        <Grid item xs={12}>
                            <TextValidator
                                required
                                fullWidth
                                name="currentCredit"
                                label="Add Credit"
                                id="credit"

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