
import Typography from '@mui/material/Typography';
import CircularProgress from "@mui/material/CircularProgress"
import Box from '@mui/material/Box';

function NotFound() {

    return (

        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <CircularProgress />
            <Typography component="h1" variant="h5" sx={{ p: 2 }} >
                Oh no! Something went wrong. Please go back
            </Typography>
        </Box>

    )



}

export default NotFound