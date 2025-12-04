const Database = require("better-sqlite3");
const db = new Database("database.sqlite");

// Crear tabla si no existe
db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        email TEXT UNIQUE,
        password TEXT
    )
`).run();

module.exports = db;
