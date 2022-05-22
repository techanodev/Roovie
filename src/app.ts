import express from "express";
import cors from "cors";
import path from "path";
import http from "http";
import { Server, Socket } from "socket.io";
import { UserI } from "./types/users.d";
import { connect, MongooseError } from "mongoose";
import Movie, { IMovie } from "./models/movies.models";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const users: { [socketId: string]: UserI } = {};

const sendMovies = (socket: Socket) => {
    Movie.find({}).then((movies) => {
        socket.emit("movies", movies);
    });
};

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

    sendMovies(socket);

    socket.on(
        "add-movie",
        async (movieData: IMovie, callback: (msg: string) => void) => {
            try {
                const movie = new Movie(movieData);
                await movie.save();
                callback("your movie has been saved");
                sendMovies(socket);
            } catch (e) {
                callback((e as MongooseError).message);
            }
        }
    );
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

server.listen(port, host, async () => {
    const mongoHost =
        process.env.MONGO_URI || "mongodb://mongo:27017/roovie-opensource";
    await connect(mongoHost);
    console.log(`listen on http//${host}:${port}`);
});
