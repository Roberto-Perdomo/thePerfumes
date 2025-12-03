const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a la base de datos SQLite
const db = new sqlite3.Database(path.resolve(__dirname, "database.sqlite"));

// Crear tabla si no existe
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT
    )
  `);
});

// Obtener todos los usuarios
app.get("/users", (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Crear nuevo usuario
app.post("/users", (req, res) => {
  const { name } = req.body;
  db.run(
    "INSERT INTO users (name) VALUES (?)",
    [name],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      res.json({ id: this.lastID, name });
    }
  );
});

// Servidor
app.listen(3000, () => {
  console.log("Backend corriendo en http://localhost:3000");
});
