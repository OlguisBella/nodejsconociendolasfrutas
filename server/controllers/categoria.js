const Categoria = require('../models').Categoria;

module.exports = {
  create(req, res) {
    return Categoria
      .create({
        nombre: req.body.nombre,
      })
      .then(categoria => res.status(201).send(categoria))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Categoria
      .findAll({
        attributes: ['id', 'nombre']
      })
      .then(categoria => res.status(200).send(categoria))
      .catch(error => res.status(400).send(error));
  },
  getIdCategoria(req, res) {
    return Categoria
      .findOne({
        where: {nombre: req.params.nameCategoria},
        attributes: ['id'],
      })
      .then(categoria => res.status(200).send(categoria))
      .catch(error => res.status(400).send(error));
  },  

};