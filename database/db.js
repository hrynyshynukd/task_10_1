const Database = require("better-sqlite3");
const path = require("path");

const db = new Database(
    path.join(__dirname, "database.sqlite")
);

db.exec(`
    CREATE TABLE IF NOT EXISTS cds (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        inventory_number TEXT NOT NULL,
        album_title TEXT NOT NULL,
        disk_size INTEGER,
        disk_type TEXT,
        record_date TEXT
    )
`);

module.exports = db;
