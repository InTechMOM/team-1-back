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
  link: Joi.string().uri().required(),
  order: Joi.number().integer().min(0).max(2).required(),
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

const evaluateVideoSchema = Joi.object({
  criticalThinking: Joi.string(),
  colaboration: Joi.string(),
  comunicartion: Joi.string(),
  creativity: Joi.string(),
  approved: Joi.boolean().required(),
});

const evaluateValidateRequest = (request, response, next) => {
  const error = evaluateVideoSchema.validate(request.body).error;
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

export { createValidateRequest, updateValidateRequest, evaluateValidateRequest };