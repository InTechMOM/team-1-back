import Joi from 'joi';

const videoSchema = Joi.object({
  //falta: controlar que sea un url de youtube
  link: Joi.string().uri().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  studentEmail: Joi.string().email().required(),
  teacherEmail: Joi.string().email().required(),
});

const validateRequest = (request, response, next) => {
  const error = videoSchema.validate(request.body).error;
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