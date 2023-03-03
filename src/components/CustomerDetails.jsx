

import { useState, useEffect } from "react";
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
import CustomerForm from "./CustomerForm";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


function CustomerDetails(props) {
    // add state here when axios is added... update state through axios

    const { customers, updateCustomer, deleteCustomer, setMessage } = props;

    const { custId } = useParams()


    //use this to set the form state
    let customerDetails = customers.find((customer) => {
        return customer._id === custId
    })


    const currentCustomerBalance = customerDetails.currentcredit;

    const options = ["Add", "Remove"];

    const [customer, setCustomer] = useState(customerDetails)
    const [credit, setCredit] = useState(0);
    const [value, setValue] = useState(options[0]);
    const [inputValue, setInputValue] = useState('');
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setMessage("")

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleFormChange = (e) => {
        setMessage("")
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
                    currentcredit: updatedCredit

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

        let newCustomer = customer

        updateCustomer(custId, newCustomer)
        navigate("/dashboard")

    };

    const handleDelete = (e) => {
    
        deleteCustomer(custId);
        navigate("/dashboard")

    }

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
                    <ManageAccountsTwoToneIcon />
                </Avatar>
                <Typography component="h1" variant="h5" sx={{ p: 2 }} >
                    Update customer details
                </Typography>
                <ValidatorForm component="form" noValidate onSubmit={handleFormSubmit} >
                    <Grid container spacing={2}>

                        <CustomerForm
                            customer={customer}
                            handleFormChange={handleFormChange}
                        />

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
                                                currentcredit: updatedCreditAuto

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
                                    inputProps={{ min: 0 }}
                                />
                            </Tooltip>
                        </Grid>
                        <Grid item xs={12}>
                            <TextValidator
                                fullWidth
                                disabled
                                name="currentcredit"
                                label="Available Credit After Update"
                                id="credit"
                                value={customer.currentcredit}
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
                </ValidatorForm>
                <Grid container justifyContent="center">
                    <Grid item>
                        <Link
                            sx={{ color: "red" }}
                            variant="body2"
                            component="button"
                            onClick={handleClickOpen}
                        >
                            Delete Customer
                        </Link>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                {"Delete customer?"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Are you sure you want to delete this customer?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => {
                                    handleClose()

                                }}>No</Button>
                                <Button onClick={() => {
                                    handleClose()
                                    handleDelete()

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

export default CustomerDetails