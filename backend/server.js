require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

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

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const resultado = await pool.query('SELECT * FROM usuarios WHERE username = $1', [username]);
        if (resultado.rows.length === 0) return res.status(401).json({ error: 'Usuario no encontrado' });

        const usuario = resultado.rows[0];

        const passwordValida = await bcrypt.compare(password, usuario.password);
        if (!passwordValida) return res.status(401).json({ error: 'Contraseña incorrecta' });

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