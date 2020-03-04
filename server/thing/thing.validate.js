const {
  celebrate, Joi, Segments
} = require('celebrate');

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      description: Joi.string()
    })
  }),
  get: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      thingId: Joi.string().hex().required()
    })
  }),
  update: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      thingId: Joi.string().hex().required()
    })
  }),
  remove: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      thingId: Joi.string().hex().required()
    })
  })
};
