// models/clienteModel.js
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const create = async (cliente) => {
  const { nome, cpf, idade, cep, endereco } = cliente;
  const [result] = await pool.query(
    'INSERT INTO clientes (nome, cpf, idade, cep, endereco) VALUES (?, ?, ?, ?, ?)',
    [nome, cpf, idade, cep, endereco]
  );
  return { id: result.insertId, ...cliente };
};

const findAll = async () => {
  const [rows] = await pool.query('SELECT * FROM clientes');
  return rows;
};

const findById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM clientes WHERE id = ?', [id]);
  return rows[0];
};

const update = async (id, cliente) => {
  const { nome, cpf, idade, cep, endereco } = cliente;
  const [result] = await pool.query(
    'UPDATE clientes SET nome = ?, cpf = ?, idade = ?, cep = ?, endereco = ? WHERE id = ?',
    [nome, cpf, idade, cep, endereco, id]
  );
  return result.affectedRows > 0 ? { id, ...cliente } : null;
};

const deleteCliente = async (id) => {
  const [result] = await pool.query('DELETE FROM clientes WHERE id = ?', [id]);
  return result.affectedRows > 0;
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  delete: deleteCliente,
};
