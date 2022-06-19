import { Container } from "@mui/material";
import type { AppProps } from "next/app";
import "../styles/global.scss";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Container>
            <Component {...pageProps} />
        </Container>
    );
}

export default MyApp;
