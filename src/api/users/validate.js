import Joi from 'joi';

const userSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  rol: Joi.string().valid('teacher','student').required(),
});

const validateRequest = (request, response, next) => {
  const error = userSchema.validate(request.body).error;
  if (error) {
    const field = error.details[0].path.join('.');
    const message = error.details[0].message.replace(/"/g, "'");
    return response.status(400).json({ 
      message: message, 
      field: field,
    }).end();
  }
  return next();
};

export default validateRequest;