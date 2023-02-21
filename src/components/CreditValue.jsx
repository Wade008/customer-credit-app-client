import { useState } from "react";
import { useNavigate } from "react-router-dom"
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import Tooltip from '@mui/material/Tooltip';
import MonetizationOnTwoToneIcon from '@mui/icons-material/MonetizationOnTwoTone';

function CreditValue(props) {


    const { storeCredit, setCreditValue } = props

    console.log(storeCredit)

    let initialValue = storeCredit
    // console.log(typeof initialValue)

    const [formValue, setFormValue] = useState(initialValue);
    const navigate = useNavigate();

    const handleFormChange = (e) => {

        setFormValue(Number(e.target.value))

    }

    // console.log(formValue)

    const handleFormSubmit = (e) => {
        e.preventDefault();

        setCreditValue(formValue)

    };


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
                    <MonetizationOnTwoToneIcon />
                </Avatar>
                <Typography component="h1" variant="h5" sx={{ p: 2 }} >
                    Update credit value
                </Typography>

                <Box component="form" onSubmit={handleFormSubmit} noValidate sx={{ mt: 1 }}>

                    <Tooltip title="Enter amount or use arrows" placement="top">
                        <TextField
                            type={"number"}
                            fullWidth
                            name="credit"
                            label="Change the value of one credit point"
                            id="credit"
                            // autoComplete="phone"
                            value={formValue}
                            onChange={handleFormChange}

                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{ min: 0 }}
                        />
                    </Tooltip>



                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, backgroundColor: "#47B2E4" }}
                    >
                        Update Credit Value
                    </Button>
                </Box>
            </Box>


        </Container >

    )


}

export default CreditValue