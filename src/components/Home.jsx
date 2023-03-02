
import { useState } from "react"
import homeImage from "../img/home_img.jpg";
import { Container, Box, HomeBackground, Title, Description } from "./styled/CustomStyles";
import Footer from "./Footer";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';





function Home(props) {

    const { message, setMessage } = props;

   
    const handleClose = () => {
        setMessage("");
      
    };


    return (

        <HomeBackground>
            <Container>
                <Box>
                    <img src={homeImage} alt="home" />
                </Box>

                <Box>

                    <Title>
                        Customer Credit
                    </Title>
                    <Description>
                        An application to help you keep track of your customers' credit
                    </Description>
                    <Dialog
                        open={message}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Account deleted"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                We're sorry to see you go.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} autoFocus>OK</Button>
                        </DialogActions>

                    </Dialog>

                </Box>
            </Container>
            <Footer />
        </HomeBackground>





    )


}

export default Home