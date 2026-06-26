require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); // Permite que tu HTML se comunique con este servidor

// Conexión a Neon PostgreSQL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Crear la tabla de usuarios automáticamente si no existe
const initDB = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS usuarios (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
        )
    `);
};
initDB();

// Ruta 1: Registrar un usuario de prueba (Solo úsalo una vez para crear tu usuario)
app.post('/api/registro', async (req, res) => {
    const { username, password } = req.body;
    try {
        const passwordEncriptada = await bcrypt.hash(password, 10);
        await pool.query('INSERT INTO usuarios (username, password) VALUES ($1, $2)', [username, passwordEncriptada]);
        res.json({ mensaje: 'Usuario creado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'El usuario ya existe o hubo un error' });
    }
});

// Ruta 2: Inicio de Sesión seguro
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        // Buscar el usuario en Neon
        const resultado = await pool.query('SELECT * FROM usuarios WHERE username = $1', [username]);
        if (resultado.rows.length === 0) return res.status(401).json({ error: 'Usuario no encontrado' });

        const usuario = resultado.rows[0];

        // Comparar contraseñas de forma segura
        const passwordValida = await bcrypt.compare(password, usuario.password);
        if (!passwordValida) return res.status(401).json({ error: 'Contraseña incorrecta' });

        // Generar el pase VIP (Token JWT)
        const token = jwt.sign({ id: usuario.id, username: usuario.username }, process.env.JWT_SECRET, { expiresIn: '2h' });

        res.json({ mensaje: 'Login exitoso', token });
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor de Taller-Web corriendo seguro en http://localhost:${PORT}`);
});