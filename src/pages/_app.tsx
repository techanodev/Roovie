import { Container, createTheme, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import "../styles/global.scss";

const theme = createTheme({
    palette: {
        primary: {
            main: "#a655d6",
        },
    },
});

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Component {...pageProps} />
            </Container>
        </ThemeProvider>
    );
}

export default MyApp;
