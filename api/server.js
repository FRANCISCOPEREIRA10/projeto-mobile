const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL');
});

// Rota para criar um novo cliente
app.post('/clientes', (req, res) => {
  const { nome, cpf, idade, cep, endereco } = req.body;

  const query = 'INSERT INTO clientes (nome, cpf, idade, cep, endereco) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [nome, cpf, idade, cep, endereco], (err, result) => {
    if (err) {
      console.error('Erro ao inserir cliente:', err);
      res.status(500).json({ error: 'Erro ao inserir cliente' });
      return;
    }
    res.status(201).json({ message: 'Cliente inserido com sucesso', id: result.insertId });
  });
});

// Rota para listar todos os clientes
app.get('/clientes', (req, res) => {
  const query = 'SELECT * FROM clientes';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar clientes:', err);
      res.status(500).json({ error: 'Erro ao buscar clientes' });
      return;
    }
    res.json(results);
  });
});

// Rota para buscar um cliente por ID
app.get('/clientes/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM clientes WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar cliente:', err);
      res.status(500).json({ error: 'Erro ao buscar cliente' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ message: 'Cliente não encontrado' });
      return;
    }
    res.json(results[0]);
  });
});

// Rota para atualizar um cliente
app.put('/clientes/:id', (req, res) => {
  const { id } = req.params;
  const { nome, cpf, idade, cep, endereco } = req.body;
  const query = 'UPDATE clientes SET nome = ?, cpf = ?, idade = ?, cep = ?, endereco = ? WHERE id = ?';
  db.query(query, [nome, cpf, idade, cep, endereco, id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar cliente:', err);
      res.status(500).json({ error: 'Erro ao atualizar cliente' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Cliente não encontrado' });
      return;
    }
    res.json({ message: 'Cliente atualizado com sucesso' });
  });
});

// Rota para deletar um cliente
app.delete('/clientes/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM clientes WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Erro ao deletar cliente:', err);
      res.status(500).json({ error: 'Erro ao deletar cliente' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Cliente não encontrado' });
      return;
    }
    res.json({ message: 'Cliente deletado com sucesso' });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
