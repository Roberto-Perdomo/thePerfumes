const express = require('express');
const cors = require('cors');
let db = require('./db'); // Puede ser SQLite o MySQL según db.js

const app = express();

app.use(cors());
app.use(express.json());


// Ruta para registrar usuario
app.post('/register', async (req, res) => {
    const { username, email, password, phone } = req.body;

    if (!username || !email || !password || !phone) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {

        // 🔵 SQLITE
        if (db.prepare) {
            const stmt = db.prepare(`
                INSERT INTO users (username, email, password, phone)
                VALUES (?, ?, ?, ?)
            `);
            const result = stmt.run(username, email, password, phone);

            return res.json({ success: true, userId: result.lastInsertRowid });
        }

        // 🟡 MYSQL
        const conn = await db;
        const [result] = await conn.query(`
            INSERT INTO users (username, email, password, phone)
            VALUES (?, ?, ?, ?)
        `, [username, email, password, phone]);

        return res.json({ success: true, userId: result.insertId });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al registrar usuario' });
    }
});
app.post("/login", async (req, res) => {
  const { email, password, phone } = req.body;

  try {
    let user;

    // SQLITE
    if (db.prepare) {
      user = db.prepare(
        "SELECT * FROM users WHERE email = ? AND password = ? AND phone = ?"
      ).get(email, password, phone);
    } 
    // MYSQL
    else {
      const conn = await db;
      const [rows] = await conn.query(
        "SELECT * FROM users WHERE email = ? AND password = ? AND phone = ?",
        [email, password, phone]
      );
      user = rows[0];
    }

    if (!user) {
      return res.status(400).json({ success: false, error: "Credenciales incorrectas" });
    }

    res.json({ success: true, user });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
});


app.listen(3000, () => {
    console.log("🚀 Servidor backend corriendo en puerto 3000");
});
