

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import ManageAccountsTwoToneIcon from '@mui/icons-material/ManageAccountsTwoTone';
import Tooltip from '@mui/material/Tooltip';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Autocomplete from '@mui/material/Autocomplete';


function CustomerDetails(props) {
    // add state here when axios is added... update state through axios

    const { customers, updateCustomer, deleteCustomer } = props;
    const { custId } = useParams()

    //use this to set the form state
    let customerDetails = customers.find((customer) => {
        return String(customer.id) === custId
    })


    const currentCustomerBalance = customerDetails.currentCredit;

    const options = ["Add", "Remove"];

    const [customer, setCustomer] = useState(customerDetails)
    const [credit, setCredit] = useState(0);
    const [value, setValue] = useState(options[0]);
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();


    console.log(customers)

    const handleFormChange = (e) => {

        let name = e.target.name



        if (name === "creditChange") {


            let credit = e.target.value
            setCredit(credit)

            let updatedCredit = value === "Add" ? Number(currentCustomerBalance) + Number(credit) : Number(currentCustomerBalance) - Number(credit)

            if (credit < 0) {

                credit = 0

            }

            if (updatedCredit < 0) {

                updatedCredit = 0;

            }

            setCustomer((prevCustomer) => {
                return {
                    ...prevCustomer,
                    currentCredit: updatedCredit

                }
            })

        } else {
            setCustomer((prevCustomer) => {

                return {
                    ...prevCustomer,
                    [e.target.name]: e.target.value,

                }
            })
        }
    }



    const handleFormSubmit = (e) => {
        e.preventDefault();

        // remove creditChange key:value... save as a new object ... add new customer back into customers array in state

        // delete the updateCredit field

        let newCustomer = customer



        updateCustomer(custId, newCustomer)


       navigate("/dashboard/message",{
        state: {
            message: "Customer details successfully updated"
        }
    });


    };

    const handleDelete = (e) => {
        e.preventDefault();
        deleteCustomer(custId);
        navigate("/dashboard/message",{
            state: {
                message: "Customer successfully deleted"
            }
        });

    }

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

                        <Grid item xs={12} sm={5}>
                            <div>
                                <Autocomplete
                                    value={value}
                                    onChange={(event, newValue) => {

                                        let updatedCreditAuto = newValue === "Add" ? Number(currentCustomerBalance) + Number(credit) : Number(currentCustomerBalance) - Number(credit)

                                        if (updatedCreditAuto < 0) {
                                            updatedCreditAuto = 0;
                                        }
                                        setCustomer((prevCustomer) => {
                                            return {
                                                ...prevCustomer,
                                                currentCredit: updatedCreditAuto

                                            }
                                        })

                                        setValue(newValue);




                                    }}
                                    inputValue={inputValue}
                                    onInputChange={(event, newInputValue) => {

                                        setInputValue(newInputValue);

                                    }}

                                    disableClearable
                                    fullWidth
                                    defaultValue={value}
                                    id="addRemove"
                                    options={options}
                                    renderInput={(params) => <TextField name="addRemove"
                                        {...params} label="Add/Remove"
                                    />}
                                />
                            </div>

                        </Grid>

                        <Grid item xs={12} sm={7}>
                            <Tooltip title="Enter amount or use arrows" placement="top">
                                <TextField
                                    type={"number"}
                                    fullWidth
                                    name="creditChange"
                                    label="Credit Amount to Add or Remove"
                                    id="creditChange"
                                    // autoComplete="phone"
                                    value={credit}
                                    onChange={handleFormChange}

                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{min:0}}
                                />
                            </Tooltip>
                        </Grid>
                        <Grid item xs={12}>
                            <TextValidator
                                fullWidth
                                disabled
                                name="currentCredit"
                                label="Available Credit After Update"
                                id="credit"
                                value={customer.currentCredit}
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
                        Update
                    </Button>
                    <Grid container justifyContent="center">
                        <Grid item>
                            <Link
                                sx={{ color: "red" }}
                                variant="body2"
                                component="button"
                                onClick={handleDelete}
                            >
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