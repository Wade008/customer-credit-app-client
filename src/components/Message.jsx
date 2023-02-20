
import { useNavigate, useLocation } from "react-router-dom"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { MultiBackground } from "./styled/CustomStyles";
import IconButton from '@mui/material/IconButton';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import Container from '@mui/material/Container';

function Message() {

    const navigate = useNavigate();
    const location = useLocation();


    const handleExit = () => {

        navigate("/dashboard");

    }




    return (

        <MultiBackground>
            {location?.state?.message && <Container  sx={{ pt: 15, maxWidth:450}}>
                <Box sx={{width:50}}>
                    <IconButton onClick={handleExit}>
                        <CloseTwoToneIcon />
                    </IconButton>
                </Box>
                <Typography variant="h6" textAlign="center" sx={{color: "#333333"}}>{location.state.message}</Typography>

            </Container>}
        </MultiBackground>
    )


}

export default Message