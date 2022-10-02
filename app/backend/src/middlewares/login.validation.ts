import { RequestHandler } from 'express';
import Joi from 'joi';

const requiredMessage = '400|Some required fields are missing';
const incorrectMessage = '401|Incorrect email or password';

const loginSchema = Joi.object({
  password: Joi.string().min(6).required().messages({
    'any.required': requiredMessage,
    'string.min': incorrectMessage,
    'string.empty': requiredMessage,
  }),
  email: Joi.string().email().required().messages({ 
    'any.required': requiredMessage,
    'string.email': incorrectMessage,
    'string.empty': requiredMessage,
  }),
});

const loginValidation: RequestHandler = (req, res, next) => {
  const { email, password } = req.body;
  const { error } = loginSchema.validate({ email, password });
  if (error) {
    const [code, message] = error.message.split('|');
    return res.status(Number(code)).json({ message });
  }
  next();
};

export default loginValidation;


