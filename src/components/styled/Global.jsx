import { createGlobalStyle } from "styled-components";
import px2vw from "../utils/px2vw";

export const Global = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  :root {
      font-size: ${px2vw(38)};

      @media (min-width: 768px) {
        font-size: ${px2vw(28)};
      }

      @media (min-width: 1024px) {
        font-size: ${px2vw(18)};
      }
    }
`;

export default Global;