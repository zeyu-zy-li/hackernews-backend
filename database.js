import sqlite3 from "sqlite3";
import md5 from "md5";

const DB_FILE = "db.sqlite";
const db = new sqlite3.Database(DB_FILE, (err) => {
    if (err) {
        console.log(err.message);
        throw err;
    }
    console.log("connected to db");
})

export default db;