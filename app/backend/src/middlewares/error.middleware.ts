import { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

// ref course sessin 8, class 3 and TFC project revision class
const erroMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  const { name, message, details } = err as any;
  console.log(`name: ${name}`);

  switch (name) {
    case 'ValidationError':
      res.status(StatusCodes.BAD_REQUEST).json({ message: details[0].message });
      break;
    case 'NotFoundError':
      res.status(StatusCodes.NOT_FOUND).json({ message });
      break;
    case 'ConflictError':
      res.status(StatusCodes.CONFLICT).json({ message });
      break;
    default:
      console.error(err);
      res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }

  next();
};

export default erroMiddleware;
