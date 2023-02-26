
import Grid from '@mui/material/Grid';
import { TextValidator } from 'react-material-ui-form-validator';


function CustomerForm(props) {


    const { customer, handleFormChange } = props


    return (
        <>
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

                    value={customer.phone}
                    onChange={handleFormChange}
                    validators={["matchRegexp:[0-9]$", "maxStringLength:10"]}
                    errorMessages={["Must be a valid phone number", "Phone number must be 10 digits long"]}
                />
            </Grid>
        </>
    )



}

export default CustomerForm