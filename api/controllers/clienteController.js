// controllers/clienteController.js
const Cliente = require('../models/clienteModel');

exports.createCliente = async (req, res) => {
  try {
    const newCliente = await Cliente.create(req.body);
    res.status(201).json(newCliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllClientes = async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getClienteById = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    res.status(200).json(cliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateCliente = async (req, res) => {
  try {
    const updatedCliente = await Cliente.update(req.params.id, req.body);
    if (!updatedCliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    res.status(200).json(updatedCliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteCliente = async (req, res) => {
  try {
    const deletedCliente = await Cliente.delete(req.params.id);
    if (!deletedCliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    res.status(200).json({ message: 'Cliente deletado com sucesso' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
