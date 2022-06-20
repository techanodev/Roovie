import type { NextPage } from "next";
import { Box, Stack } from "@mui/material";
import { Swiper } from "swiper/react";
import UpdateProfile from "../components/UpdateProfile";
import Poster from "../resources/poster.png";

const Home: NextPage = () => {
    return (
        <Box>
            <Stack direction="column" spacing={5}>
                <UpdateProfile />
                <video className="video" controls src={Poster.src} />
                <Swiper></Swiper>

                <Stack></Stack>
            </Stack>
        </Box>
    );
};

export default Home;
