const OpcionRespuesta = require('../models').OpcionRespuesta;

module.exports = {
  create(req, res) {
    return OpcionRespuesta
      .create({
        descripcion:req.body.descripcion,
        idPregunta: req.body.idPregunta,  
        respuestaValida: req.body.respuestaValida
      })
      .then(opcionrespuesta => res.status(201).send(opcionrespuesta))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return OpcionRespuesta
    .findAll({
      attributes: ['id', 'descripcion','idPregunta','respuestaValida']
    })
      .then(opcionRespuesta => res.status(200).send(opcionRespuesta))
      .catch(error => res.status(400).send(error));
  },  
  update(req, res) {
    return OpcionRespuesta
      .findByPk(req.params.id)
      .then(opcionRespuesta => {
        if (!opcionRespuesta) {
          return res.status(404).send({
            message: 'opcionRespuesta No Encontrado',
          });
        }
        return OpcionRespuesta
          .update({
            descripcion:req.body.descripcion,   
            idPregunta:req.body.idPregunta,                
            respuestaValida:req.body.respuestaValida            
          })
          .then(updatedOpcionRespuesta => res.status(200).send(updatedOpcionRespuesta))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  destroy(req, res) {
    return OpcionRespuesta
      .findByPk(req.params.id)
      .then(opcionRespuesta => {
        if (!opcionRespuesta) {
          return res.status(404).send({
            message: 'opcionRespuesta No Encontrada',
          });
        }
        return OpcionRespuesta
          .destroy()
          .then(() => res.status(204).send('opcionRespuesta eliminada exitosamente'))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }

};