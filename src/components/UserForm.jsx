
import Grid from '@mui/material/Grid';
import { TextValidator } from 'react-material-ui-form-validator';


function UserForm(props) {

    const { handleFormChange, user } = props;


    return (

        <>
            <Grid item xs={12} sm={6}>
                <TextValidator
                    name="firstname"
                    required
                    fullWidth
                    id="firstname"
                    label="First Name"
                    value={user.firstname}
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
                    value={user.lastname}
                    onChange={handleFormChange}
                    validators={['required']}
                    errorMessages={['This field is required']}

                />
            </Grid>
            <Grid item xs={12}>
                <TextValidator
                    required
                    fullWidth
                    name="username"
                    label="Set username"
                    id="username"
                    value={user.username}
                    onChange={handleFormChange}
                    validators={['required']}
                    errorMessages={['This field is required']}
                />
            </Grid>

            <Grid item xs={12}>
                <TextValidator
                    required
                    fullWidth
                    name="companyname"
                    label="Company name"
                    id="companyname"
                    value={user.companyname}
                    onChange={handleFormChange}
                    validators={['required']}
                    errorMessages={['This field is required']}
                />
            </Grid>
            <Grid item xs={12}>
                <TextValidator
                    required
                    fullWidth
                    name="storesuburb"
                    label="Store suburb"
                    id="storesuburb"
                    value={user.storesuburb}
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
                    value={user.email}
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
                    value={user.phone}
                    onChange={handleFormChange}
                    validators={["matchRegexp:[0-9]$", "maxStringLength:10"]}
                    errorMessages={["Must be a valid phone number", "Phone number must be 10 digits long"]}
                />
            </Grid>


        </>
    )

}

export default UserForm