/*****************
 * @Dependencies *
 *****************/

//Request Validator
const { param, body } = require('express-validator');
//Validator Error Handler
const validatorErrorHandler = require('../middleware/validation/validatationErrorHandler');

/**
 * Body Validator
 *
 * @Validate Body
 * @Errors :
 * * ! isExists => Missing
 * * ! isEmpty => Empty
 * * ! isMongoId => Invalid Id
 */
const validateParamId = param('id')
  .exists()
  .withMessage('Missing')
  .not()
  .isEmpty()
  .withMessage('Empty')
  .isMongoId()
  .withMessage('Invalid Id');

/**
 * Body Validator
 *
 * @Validate Body
 * @Errors :
 * * ! isExists => Missing
 * * ! isEmpty => Empty
 * * ! isString => String Only
 */
const validateBodyBody = body('body')
  .exists()
  .withMessage('Missing')
  .not()
  .isEmpty()
  .withMessage('Empty')
  .isString()
  .withMessage('String Only');

/**
 * Checked Validator
 *
 * @Validate Body
 * @Errors :
 * * ! isExists => Missing
 * * ! isEmpty => Empty
 * * ! isBoolean => Boolean Value Only
 */
const validateBodyChecked = body('checked')
  .exists()
  .withMessage('Missing')
  .not()
  .isEmpty()
  .withMessage('Empty')
  .isBoolean()
  .withMessage('Boolean Value Only');

/**
 * Body Optional Validator
 *
 * @Validate Body
 * @Errors :
 * * ! isExists => Missing
 * * ! isEmpty => Empty
 * * ! isString => String Only
 */
const validateBodyOptionalBody = body('body')
  .optional()
  .not()
  .isEmpty()
  .withMessage('Empty')
  .isString()
  .withMessage('String Only');

/**
 * Checked Optional Validator
 *
 * @Validate Body
 * @Errors :
 * * ! isExists => Missing
 * * ! isEmpty => Empty
 * * ! isBoolean => Boolean Value Only
 */
const validateBodyOptionalChecked = body('checked')
  .optional()
  .not()
  .isEmpty()
  .withMessage('Empty')
  .isBoolean()
  .withMessage('Boolean Value Only');

/********************
 * @ValidatorChains *
 ********************/

//Todo Param Chain
const validateParamsTodo = [
  validateParamId,
  validateBodyOptionalChecked,
  validatorErrorHandler
];

//Todo Body Chain
const validateBodyTodo = [
  validateBodyBody,
  validateBodyChecked,
  validatorErrorHandler
];

//Todo Body Optional Chain
const validateBodyOptionalTodo = [
  validateBodyOptionalBody,
  validateBodyOptionalChecked,
  validatorErrorHandler
];

/************
 * @Exports *
 ************/

module.exports = {
  //Todo Param Chain
  validateParamsTodo,
  //Todo Body Chain
  validateBodyTodo,
  //Todo Body Optional Chain
  validateBodyOptionalTodo
};
