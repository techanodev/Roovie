import type { NextPage } from "next";
import { Box, Stack } from "@mui/material";
import { useEffect, useRef } from "react";
import { Swiper } from "swiper/react";
import UpdateProfile from "../components/UpdateProfile";
import Poster from "../resources/poster.png";
import io, { Socket } from "socket.io-client";

let socket: Socket<any, any> | undefined = undefined;

const Home: NextPage = () => {
    const video = useRef<HTMLVideoElement>(null);

    const socketInitializer = async () => {
        if (!socket) {
            await fetch("/api/socket");
            socket = io();
        }

        socket.on("connect", () => {
            console.log("connected");
        });

        socket.on("play", () => {
            video?.current.play();
        });

        socket.on("pause", () => {
            video?.current.pause();
        });

        socket.on("time", (time: number) => {
            const el = video?.current;
            if (!el) return;
            const lastTime = el.currentTime;
            if (Math.abs(lastTime - time) < 1) return;
            console.log(time);
            el.currentTime = time;
        });
    };

    useEffect(() => {
        socketInitializer();
    }, [video]);

    const onPause = () => {
        socket.emit("pause");
    };

    const onPlay = () => {
        socket.emit("play");
    };

    const onTimeUpdate = () => {
        if (!video?.current) return;
        socket.emit("time", video.current.currentTime);
    };

    return (
        <Box>
            <Stack direction="column" spacing={5}>
                <UpdateProfile />
                <video
                    className="video"
                    controls
                    onPause={onPause}
                    onPlay={onPlay}
                    onTimeUpdate={onTimeUpdate}
                    poster={Poster.src}
                    ref={video}
                >
                    <source
                        src="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_5MB.mp4"
                        type="video/mp4"
                    />
                </video>
                <Swiper></Swiper>
            </Stack>
        </Box>
    );
};

export default Home;
