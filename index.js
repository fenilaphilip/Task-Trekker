import express from "express";
import bodyParser, { urlencoded } from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "Planner",
    password: process.env.db_pass,
    port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
});
app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
})