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

app.get("/", async (req, res) => {
    const tasks = await getTaskLists();
    // console.log(`tasks : ${tasks}`)
    res.render("index.ejs", {
        lists: tasks,
    });
});

app.post("/add", async (req, res) => {
    const new_task = req.body.newTask;
    // console.log(new_task);
    await db.query("INSERT INTO items(title) VALUES($1)", [new_task]);
    res.redirect("/");
});

async function getTaskLists() {
    let taskTray = [];
    const result = await db.query("Select title from items");
    // console.log(result.rows);
    result.rows.forEach((task) => {
        taskTray.push(task.title);
    });
    return taskTray;
}

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});