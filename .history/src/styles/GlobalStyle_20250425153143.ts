import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --font-saira: 'Saira', sans-serif;
    --font-saira-stencil: 'Saira Stencil One', cursive;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: var(--font-saira);
    background-color: #f5f5fa;
    color: #41414d;
  }

  button, input, textarea {
    font-family: inherit;
  }
`;

export default GlobalStyle;