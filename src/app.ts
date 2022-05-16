import express from "express";
import cors from "cors";
import path from "path";

const app = express();

app.set("view engine", "ejs");

app.use(cors());
app.use(express.static(path.join(__dirname, "/public")));

app.set("views", path.join(__dirname, "/views/pages"));

app.get("/", function (req, res) {
    res.render("index");
});

const host = process.env.host || "0.0.0.0";
const port = Number.parseInt(process.env.port || "3000");

app.listen(port, host, () => {
    console.log(`listen on http//${host}:${port}`);
});
