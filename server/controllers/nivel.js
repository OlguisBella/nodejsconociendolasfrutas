const Nivel = require('../models').Nivel;

module.exports = {
    createNivel(req, res) {
        return Nivel
          .create({
            descripcion: req.body.descripcion,
          })
          .then(nivel => res.status(201).send(nivel))
          .catch(error => res.status(400).send(error));
      },

    listNivel(req, res) {
        return Nivel
            .findAll({
                attributes: ['id', 'descripcion']
              })
            .then(nivel => res.status(200).send(nivel))
            .catch(error => res.status(400).send(error));
    }

};
