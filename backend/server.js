const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("./db");

const app = express();

// ==========================
//  CONFIGURACIÓN
// ==========================
app.use(express.json());

app.use(cors({
  origin: "https://the-perfumes.vercel.app"
}));

const SECRET = process.env.JWT_SECRET || "dev_secret"; // en producción usa variable de entorno

// ==========================
//  MIDDLEWARE PARA TOKEN
// ==========================
function verificarToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: "Falta token" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Token inválido" });
        }

        req.user = decoded;
        next();
    });
}

// ==========================
//  REGISTRO DE USUARIO
// ==========================
app.post("/register", (req, res) => {
    const { nombre, correo, telefono, contraseña } = req.body;

    if (!nombre || !correo || !telefono || !contraseña) {
        return res.status(400).json({ error: "Faltan datos" });
    }

    const hash = bcrypt.hashSync(contraseña, 10);

    const sql = "INSERT INTO users (nombre, correo, telefono, contraseña) VALUES (?, ?, ?, ?)";
    db.query(sql, [nombre, correo, telefono, hash], (err) => {
        if (err) {
            console.error("Error registrando usuario:", err);
            return res.status(500).json({ error: "Error registrando usuario" });
        }
        res.json({ message: "Usuario registrado exitosamente" });
    });
});

// ==========================
//  LOGIN
// ==========================
app.post("/login", (req, res) => {
    const { correo, contraseña } = req.body;

    const sql = "SELECT * FROM users WHERE correo = ?";
    db.query(sql, [correo], (err, results) => {
        if (err) {
            console.error("Error en login:", err);
            return res.status(500).json({ error: "Error en el servidor" });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: "Correo no registrado" });
        }

        const user = results[0];

        const valid = bcrypt.compareSync(contraseña, user.contraseña);
        if (!valid) {
            return res.status(401).json({ error: "Contraseña incorrecta" });
        }

        const token = jwt.sign(
            { id: user.id, correo: user.correo },
            SECRET,
            { expiresIn: "2h" }
        );

        res.json({
            message: "Login exitoso",
            token,
            user: {
                id: user.id,
                nombre: user.nombre,
                correo: user.correo
            }
        });
    });
});

// ==========================
//  OBTENER PRODUCTOS
// ==========================
app.get("/products", (req, res) => {
    const sql = "SELECT * FROM products";

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error obteniendo productos:", err);
            return res.status(500).json({ error: "Error obteniendo productos" });
        }
        res.json(results);
    });
});

// ==========================
//  CREAR PEDIDO (PROTEGIDO)
// ==========================
app.post("/crear-pedido", verificarToken, (req, res) => {
    const { total, items } = req.body;

    if (
        !items ||
        !Array.isArray(items) ||
        items.length === 0 ||
        !total ||
        Number(total) <= 0
    ) {
        return res.status(400).json({ error: "Carrito vacío o total inválido" });
    }

    const user_id = req.user.id;

    const sqlOrder = "INSERT INTO orders (user_id, total) VALUES (?, ?)";
    db.query(sqlOrder, [user_id, total], (err, result) => {
        if (err) {
            console.error("Error creando pedido:", err);
            return res.status(500).json({ error: "Error creando pedido" });
        }

        const orderId = result.insertId;

        const sqlItem = `
            INSERT INTO order_items (order_id, product_id, cantidad, precio)
            VALUES ?
        `;

        const values = items.map(item => [
            orderId,
            item.id,
            item.qty,
            item.precio
        ]);

        db.query(sqlItem, [values], (err2) => {
            if (err2) {
                console.error("Error guardando items:", err2);
                return res.status(500).json({ error: "Error guardando items" });
            }

            res.json({ message: "Pedido registrado", orderId });
        });
    });
});

// ==========================
//  HEALTH CHECK (IMPORTANTE)
// ==========================
app.get("/", (req, res) => {
    res.send("API funcionando 🚀");
});

// ==========================
//  PUERTO DINÁMICO (CLAVE)
// ==========================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});