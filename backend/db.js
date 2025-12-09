const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Angel2004", // tu contraseña, si no tienes, déjalo vacío
    database: "perfume"
});

db.connect((err) => {
    if (err) {
        console.log("❌ Error al conectar a MySQL:", err);
        return;
    }
    console.log("✅ Conectado a MySQL");
});

module.exports = db;
