// db.js

//⬇️ Cambia entre "sqlite" y "mysql"
const DB_ENGINE = "sqlite";
// const DB_ENGINE = "mysql";


// -------------------------
// 🔵 SQLITE
// -------------------------
if (DB_ENGINE === "sqlite") {
    const Database = require("better-sqlite3");
    const db = new Database("database.sqlite");

    db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        )
    `);

    console.log("📦 SQLite conectado");
    module.exports = db;
}


// -------------------------
// 🟡 MYSQL
// -------------------------
else {
    const mysql = require("mysql2/promise");

    async function connectMySQL() {
        const pool = mysql.createPool({
            host: "localhost",
            user: "root",
            password: "",
            database: "perfumes_db"
        });

        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(100),
                email VARCHAR(150) UNIQUE,
                password VARCHAR(255)
            )
        `);

        console.log("🐬 MySQL conectado");
        return pool;
    }

    module.exports = connectMySQL();
}
