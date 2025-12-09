// db_mysql.js
const mysql = require("mysql2/promise");

async function connectMySQL() {
    const connection = await mysql.createPool({
        host: "localhost",
        user: "root",
        password: "",
        database: "perfumes_db",
    });

    console.log("🐬 MySQL conectado correctamente.");

    // Crear tabla si no existe
    await connection.query(`
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(100) NOT NULL,
            email VARCHAR(150) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL
        )
    `);

    return connection;
}

module.exports = connectMySQL();
