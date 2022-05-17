import express from "express";
import cors from "cors";
import path from "path";
import http from "http";
import { Server, Socket } from "socket.io";
import { UserI } from "./types/users.d";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const users: { [socketId: string]: UserI } = {};

io.on("connection", (socket: Socket) => {
    console.log("a user connected to server");
    users[socket.id] = { avatar: "/avatars/file1.jpg", name: socket.id };
    io.emit("users", users);

    socket.on("update-profile", (user: UserI) => {
        users[socket.id] = user;
        console.log(user);
        io.emit("users", users);
    });

    socket.on("disconnect", () => {
        const name = users[socket.id].name;
        console.log(`${name} left the socket.`);
        delete users[socket.id];
    });
});

app.set("view engine", "ejs");

app.use(cors());
app.use(express.static(path.join(__dirname, "/public")));

app.set("views", path.join(__dirname, "/views/pages"));

app.get("/", function (req, res) {
    res.render("index");
});

const host = process.env.host || "0.0.0.0";
const port = Number.parseInt(process.env.port || "3000");

server.listen(port, host, () => {
    console.log(`listen on http//${host}:${port}`);
});
