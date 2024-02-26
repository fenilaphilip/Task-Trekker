import express from "express";
import bodyParser from "body-parser";
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

let tasks = ["Buy Milk", "Do homework", "Take shower"];
app.get("/", (req, res) => {
    res.render("index.ejs", {
        lists: tasks,
    });
});
app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
})