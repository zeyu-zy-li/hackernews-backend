import express from "express";
import cors from "cors";
import db from "./database.js";
const app = express();
app.use(cors());

const HTTP_PORT = 8000;
app.listen(HTTP_PORT, () => {
    console.log(`Listening on ${HTTP_PORT}`);
})

app.get("/", (req, res, next) => {
    res.json({"message": "hello world"});
});

app.get("/beststories.json", (req, res, next) => {
    const sql = "SELECT StoryID FROM Story ORDER BY Score DESC";
    let params = [];
    db.all(sql, params, (err, records) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json(records.map(story => (story.StoryID)));
    });
});

app.get("/newstories.json", (req, res, next) => {
    const sql = "SELECT StoryID FROM Story ORDER BY CreateTime DESC";
    let params = [];
    db.all(sql, params, (err, records) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json(records.map(story => (story.StoryID)));
    });
});

app.get("/item/:id.json", (req, res, next) => {
    const sql = `SELECT StoryID AS id,Username AS by,Title AS title,Url AS url,Score AS score,CreateTime AS time
                 FROM Story,User
                 WHERE AuthorID=UserID AND StoryID=?`;
    const params = [req.params.id];
    db.get(sql, params, (err, record) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json(record);
    });
});


app.use((req, res) => {
    res.status(404);
})