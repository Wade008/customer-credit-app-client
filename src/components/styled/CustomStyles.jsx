import styled from "styled-components";
import px2vw from "../utils/px2vw";


export const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin:0 ${px2vw(30)} ${px2vw(30) };
    padding-top: 90px;
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
    width: ${px2vw(355, 768)};
    min-height: ${px2vw(200, 768)};
    height: 100%;
  }

  @media (min-width: 1024px) {
    width: ${px2vw(500)};
    min-height: ${px2vw(300)};
    height: 100%;
  }
`






export const HomeBackground = styled.section`
    background: #37517E;
    position: relative;
    min-height: 100vh;
   
`


export const MultiBackground = styled.section`
    background: #92B7B8;
    position: relative;
    min-height: 100vh;


`


export const Title = styled.h1`
    color: white;
    text-align: center;
    font-size: 40px;
    margin-top: 30px;

`
export const MultiTitle = styled.h1`
    color: #333333;
    text-align: center;
    font-size: 40px;
    margin-top: 100px;
    

`



export const Description = styled.p`
    color: white;
    text-align: center;
    font-size: 25px;
    margin-top: 30px;

`

export const FooterStyle = styled.div`
    background: #37517E;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 3.0rem;
 

 

    p {
      font-size: 1rem;
      color: #FFFFFF;
      text-align: center;
      margin-top: 7px;
      
    }

`

