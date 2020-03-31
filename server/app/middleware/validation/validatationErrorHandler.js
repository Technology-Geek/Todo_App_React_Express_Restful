/*****************
 * @Dependencies *
 *****************/
//Request Error Handler
const errorHandler = require('../../../utils/error/errorHandler');
//Request Validator
const { validationResult } = require('express-validator');

/**************************
 * @ValidatorErrorHandler *
 **************************/

/**
 * Validator Error Handler
 *
 * @param {Request} req Http Request
 * @param {Response} res Http Response
 * @param {*} next Next Function
 */
const validatorErrorHandler = (req, res, next) => {
  //Error Result
  const errors = validationResult(req);
  //Check If There Is Any Errors
  if (!errors.isEmpty())
    //! Request Error Handler Code 422 With errors as Error Object
    return errorHandler(res, 422, { errors: errors.array() });
  next();
};

/************
 * @Exports *
 ************/

//Validator Error Handler
module.exports = validatorErrorHandler;
