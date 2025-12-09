// db_sqlite.js
const Database = require('better-sqlite3');

// Crea o abre la base de datos
const db = new Database('database.sqlite');

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    )
`);

console.log("📦 SQLite conectado correctamente.");

module.exports = db;
