import { Server } from "socket.io";

const SocketHandler = (req: any, res: any) => {
    if (res.socket.server.io) {
        console.log("Socket is already running");
    } else {
        console.log("Socket is initializing");
        const io = new Server(res.socket.server);
        res.socket.server.io = io;

        io.on("connection", (socket) => {
            socket.on("play", () => {
                socket.broadcast.emit("play");
            });

            socket.on("pause", () => {
                socket.broadcast.emit("pause");
            });

            socket.on("time", (time: number) => {
                socket.broadcast.emit("time", time);
            });
        });
    }
    res.end();
};

export default SocketHandler;
