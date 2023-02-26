
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { TextValidator } from 'react-material-ui-form-validator';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';



function UserForm(props) {

    const { handleFormChange, user, showPassword, handleClickShowPassword, handleMouseDownPassword } = props;


    return (

        <Grid container spacing={2}>
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
            <Grid item xs={12} >
                <FormControl
                    required
                    fullWidth
                    variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput

                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={user.password}
                        name="password"
                        onChange={handleFormChange}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>
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

            <Grid item xs={12}>
                <TextValidator
                    required
                    fullWidth
                    name="creditvalue"
                    label="Set the dollar value for one credit point"
                    id="creditvalue"
                    value={user.creditvalue}
                    onChange={handleFormChange}
                    validators={["required", "minNumber:0", "isNumber"]}
                    errorMessages={["This field is required", "Number must be positive", "Must be an integer"]}
                />
            </Grid>
        </Grid>
    )

}

export default UserForm