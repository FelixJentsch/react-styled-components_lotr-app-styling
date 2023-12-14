import { GlobalStyle } from "../styles";
import "design-resources/variables.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
