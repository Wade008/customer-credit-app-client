
import styled from "styled-components";
import homeImage from "../img/home_img.jpg";
import { Container, Box, HomeBackground } from "./styled/CustomStyles";



function Home() {




    return (
        <HomeBackground>
            <Container>
                <Box>
                    <img src={homeImage} alt="home_img"/>
                </Box>

                <Box>

                </Box>



            </Container>
        </HomeBackground>


    )


}

export default Home