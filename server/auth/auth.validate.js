const {
  celebrate, Joi, Segments
} = require('celebrate');

module.exports = {
  login: celebrate({
    [Segments.BODY]: Joi.object().keys({
      username: Joi.string().required(),
      password: Joi.string().required()
    })
  })
};
