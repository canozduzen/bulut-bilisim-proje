const express = require('express');
const cors = require('cors');
const { Pool } = require('pg'); // PostgreSQL kütüphanesi
const app = express();
const PORT = 3000;

// AWS RDS PostgreSQL Bağlantı Ayarları
// AWS RDS PostgreSQL Bağlantı Ayarları
const pool = new Pool({
    host: 'database-1.cxw62wgimahi.eu-north-1.rds.amazonaws.com',
    user: 'postgres',
    password: 'BulutProje123!', 
    database: 'postgres',
    port: 5432,
    ssl: { rejectUnauthorized: false }
});

app.use(cors());
app.use(express.json());

// Proje ilk çalıştığında veritabanında 'todos' tablosu yoksa otomatik oluşturur
pool.query(`
    CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        task VARCHAR(255) NOT NULL,
        completed BOOLEAN DEFAULT FALSE
    )
`).then(() => console.log("Veritabanı tablosu hazır!"))
  .catch(err => console.error("Tablo oluşturma hatası:", err));

// 1. GET: Tüm görevleri listele (Veritabanından çek)
app.get('/api/todos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM todos ORDER BY id ASC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. POST: Yeni görev ekle (Veritabanına yaz)
app.post('/api/todos', async (req, res) => {
    try {
        const { task } = req.body;
        const result = await pool.query(
            'INSERT INTO todos (task) VALUES ($1) RETURNING *',
            [task]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. DELETE: Görev sil (Veritabanından sil)
app.delete('/api/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM todos WHERE id = $1', [id]);
        res.json({ message: "Görev silindi" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Backend sunucusu http://localhost:${PORT} adresinde çalışıyor!`);
});