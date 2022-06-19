import type { NextPage } from "next";
import { Box, Stack } from "@mui/material";
import { Swiper } from "swiper/react";
import UpdateProfile from "../components/UpdateProfile";

const Home: NextPage = () => {
    return (
        <Box>
            <Stack direction="column">
                <UpdateProfile />
                <video className="video" controls />
                <Swiper></Swiper>

                <Stack></Stack>
            </Stack>
        </Box>
    );
};

export default Home;
