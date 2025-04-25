import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --font-body: var(--font-saira);
    --font-logo: var(--font-saira-stencil);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html,
  body {
    font-family: var(--font-body), sans-serif;
    background-color: #f5f5fa;
    color: #121214;
  }

  h1, h2, h3 {
    font-weight: 600;
  }
`;

export default GlobalStyle;
