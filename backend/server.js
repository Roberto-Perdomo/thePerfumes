const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const db = require("./db");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// REGISTRO DE USUARIO
app.post("/register", (req, res) => {
    const { nombre, correo, telefono, contraseña } = req.body;

    // Encriptar contraseña
    const hash = bcrypt.hashSync(contraseña, 10);

    const sql = "INSERT INTO users (nombre, correo, telefono, contraseña) VALUES (?, ?, ?, ?)";
    db.query(sql, [nombre, correo, telefono, hash], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Error registrando usuario" });
        }
        res.json({ message: "Usuario registrado exitosamente" });
    });
});

// LOGIN
app.post("/login", (req, res) => {
    const { correo, contraseña } = req.body;

    const sql = "SELECT * FROM users WHERE correo = ?";
    db.query(sql, [correo], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error en el servidor" });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: "Correo no registrado" });
        }

        const user = results[0];

        // Comparar contraseñas
        const valid = bcrypt.compareSync(contraseña, user.contraseña);

        if (!valid) {
            return res.status(401).json({ error: "Contraseña incorrecta" });
        }

        res.json({ message: "Login exitoso", user });
    });
});

// OBTENER TODOS LOS PRODUCTOS
app.get("/products", (req, res) => {
  const sql = "SELECT * FROM products";

  db.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Error obteniendo productos" });
    }
    res.json(results);
  });
});


app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});
