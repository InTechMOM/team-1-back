import Joi from 'joi';

const createProjectSchema = Joi.object({
  title: Joi.string().required(),
  studentEmail: Joi.string().email().required(),
  teacherEmail: Joi.string().email().required(),
});

const createValidateRequest = (request, response, next) => {
  const error = createProjectSchema.validate(request.body).error;
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

const updateProjectSchema = Joi.object({
  link1: Joi.string().uri(),
  link2: Joi.string().uri(),
  link3: Joi.string().uri(),
});

const updateValidateRequest = (request, response, next) => {
  const error = updateProjectSchema.validate(request.body).error;
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

export { createValidateRequest, updateValidateRequest };