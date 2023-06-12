import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
}

body {
  background-color: lightgrey;
  font-family: 'Montserrat', sans-serif;
  line-height: 1.5;
}
`;

export default GlobalStyle;
