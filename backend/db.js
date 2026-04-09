const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "perfume_user",
    password: "Perfume123!", 
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

