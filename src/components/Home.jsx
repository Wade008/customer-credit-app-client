

import homeImage from "../img/home_img.jpg";
import { Container, Box, HomeBackground, Title, Description } from "./styled/CustomStyles";
import Footer from "./Footer";


function Home() {

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

                </Box>
            </Container>
            <Footer />
        </HomeBackground>





    )


}

export default Home