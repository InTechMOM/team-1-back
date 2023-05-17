import Joi from "joi";

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  rol: Joi.string().valid('teacher', 'student').required(),
});

const validateRequest = (request, response, next) => {
  const error = loginSchema.validate(request.body).error;
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
