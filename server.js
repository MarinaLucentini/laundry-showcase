const express = require('express');
const { Pool } = require('pg');
const http = require('http');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.get('/customers', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM customers');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/customers', async (req, res) => {
  const { name, email, phone } = req.body;
  try {
    const { rows } = await pool.query(
      'INSERT INTO customers (name, email, phone) VALUES ($1, $2, $3) RETURNING *',
      [name, email, phone]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const options = {
    hostname: 'localhost',
    port: 3001,
    path: '/auth/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const request = http.request(options, (response) => {
    let data = '';
    response.on('data', (chunk) => {
      data += chunk.toString();
    });
    response.on('end', () => {
      const { token } = JSON.parse(data);
      res.json({ token });
    });
  });

  request.on('error', (err) => {
    console.error(err);
    res.status(401).json({ error: 'Invalid email or password' });
  });

  request.write(JSON.stringify({ email, password }));
  request.end();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});