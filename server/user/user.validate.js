const {
  celebrate, Joi, Segments
} = require('celebrate');

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      username: Joi.string().required(),
      password: Joi.string().required(),
      permissions: Joi.array().items(Joi.string().required())
    })
  }),
  update: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      userId: Joi.string().hex().required()
    }),
    [Segments.BODY]: Joi.object().keys({
      username: Joi.string(),
      password: Joi.string()
    })
  })
};
