

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import InputAdornment from '@mui/material/InputAdornment';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { MultiBackground } from "./styled/CustomStyles";
import MenuIcon from '@mui/icons-material/Menu';




function CustomerList(props) {

    const [userInput, setUserInput] = useState("");
    const { customers } = props

    const navigate = useNavigate();

    const filterCustomer = (e) => {
        setUserInput(e.target.value);
    }


    const filteredCustomers = customers.filter((customer) => {
        let searchTerm = userInput.toLowerCase();

        return searchTerm ? customer.firstname.toLowerCase().includes(searchTerm) || customer.lastname.toLowerCase().includes(searchTerm) || customer.email.toLowerCase().includes(searchTerm) : null;

    })

    return (
        <MultiBackground>

            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                pt: 3,

            }} >

                <TextField
                    sx={{ width: "75vw", backgroundColor: "#ffffff" }}
                    variant="outlined"
                    margin="normal"
                    // fullWidth
                    id="search"
                    label="Find a customer"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                < SearchTwoToneIcon />
                            </InputAdornment>
                        )

                    }}
                    name="search"
                    value={userInput}
                    onChange={filterCustomer}
                    autoFocus
                />


            </Box>
            {filteredCustomers.length > 0 ?
                <TableContainer sx={{ mt: 4 }} component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell align="right">Email</TableCell>
                                <TableCell align="right">Phone</TableCell>
                                <TableCell align="right">Available Credit</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredCustomers.map((customer) => {
                                return (
                                    <Tooltip key={customer._id} title="Click to update customer" placement="top">
                                        <TableRow
                                            key={customer._id}
                                            sx={{
                                                '&:last-child td, &:last-child th': { border: 0 }, "&:hover": {
                                                    cursor: "pointer"
                                                }
                                            }}
                                            onClick={() => {
                                                navigate(`/dashboard/${customer._id}`)
                                            }}


                                        >
                                            <TableCell >{customer.firstname}</TableCell>
                                            <TableCell >{customer.lastname}</TableCell>
                                            <TableCell align="right">{customer.email}</TableCell>
                                            <TableCell align="right">{customer.phone}</TableCell>
                                            <TableCell align="right">{customer.currentcredit}</TableCell>

                                        </TableRow>
                                    </Tooltip>
                                )
                            })}

                        </TableBody>
                    </Table>
                </TableContainer>
                : <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    pt: 2,

                }}>
                    <Typography variant="subtitle2" textAlign="center" sx={{ color: "#333333" }}>
                        {customers.length > 0 ? "You can find a customer by entering their first name, last name or email address" : `Oh no! You don't have any customers yet. You can add a customer via the Dashboard menu. Just click on the ${< MenuIcon />} at the top left of the dashboard. You can use the Daboard menu  to view/update your profile and to change the value of a credit point`}
                    </Typography>
                </Box>

            }

        </MultiBackground>
    )


}

export default CustomerList