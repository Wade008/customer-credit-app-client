import styled from "styled-components";
import px2vw from "../utils/px2vw";


export const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0 ${px2vw(32)} ${px2vw(32)} ${px2vw(32)};
   
    max-width: 100%;
   

    @media (min-width: 1024px) {
    flex-wrap: nowrap;
  }

`
export const Box = styled.div`
  display: flex;
  width: ${px2vw(270, 320)};
  min-height: ${px2vw(200, 320)};
  flex-direction: column;
  padding: ${px2vw(0)};
  margin:  ${px2vw(75)} ${px2vw(20)} ;
  background-color:inherit;
  height: 100%;

  @media (min-width: 768px) {
    width: ${px2vw(320, 768)};
    min-height: ${px2vw(200, 768)};
    height: 100%;
  }

  @media (min-width: 1024px) {
    width: ${px2vw(500)};
    min-height: ${px2vw(300)};
    height: 100%;
  }
`;

export const HomeBackground = styled.section`
    background: #37517E;
    height: 100vh;
   
`

export const Title = styled.h1`
    color: white;
    text-align: center;
`

