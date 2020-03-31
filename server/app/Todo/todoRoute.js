/*****************
 * @Dependencies *
 *****************/

//Web Framework
const express = require('express');
//Todo Controller
const todoController = require('./todoController');

//Todo Validators
const {
  validateParamsTodo,
  validateBodyTodo,
  validateBodyOptionalTodo,
} = require('./todoValidator');

/***************************
 * @InitializeDependencies *
 ***************************/

//Initialize Express Router
const router = express.Router();

/*************************
 * @Route * @GET * /todo *
 *************************/

/**
 * Get Todo List Data
 *
 * @Access Public
 * @Middleware : None
 * @Handler : todoController => getAll
 * @Response :
 * * Status : 200 OK
 * * Data: json( [ Todo List ] )
 * @Errors :
 * * ! Code 500 Internal Server Error
 * @Usage :
 * * GET * http://Address:Port/todo
 * @Examples :
 * * GET * http://localhost:7000/todo
 */
router.get('/', todoController.getAll);

/**************************
 * @Route * @POST * /todo *
 **************************/

/**
 * Save Todo
 *
 * @Access Public
 * @Middleware :
 * * Validators :
 * * * validateBodyTodo
 * @Handler todoController => save
 * @Response :
 * * Status : 201 Created
 * * Data: json( { Saved Todo } )
 * @Errors :
 * * ! Code 409 Conflict
 * * ! Code 500 Internal Server Error
 * @Usage :
 * * POST * http://Address:Port/todo
 * * * Body : Todo Data
 * @Examples :
 * * POST * http://localhost:7000/todo
 * * * Body : application/json
 * * * * {
          "body" : "do this" ,
          "checked" : False ,
 * * * * }
 */
router.post('/', validateBodyTodo, todoController.save);

/*************************
 * @Route * @PUT * /todo *
 *************************/

/**
 * Update Todo Data By Id
 *
 * @Access Public
 * @Middleware :
 * * Validators :
 * * * validateBodyOptionalTodo
 * @Handler todoController => updateById
 * @Response :
 * * Status : 200 OK
 * * Data: json( { msg: 'Update Successfully' } )
 * @Errors :
 * * ! Code 404 Not Found
 * * ! Code 500 Internal Server Error
 * @Usage :
 * * PUT * http://Address:Port/todo/:Id
 * * * Params : Todo Id
 * * * Body : Todo Data ?
 * @Examples :
 * * PUT * http://localhost:7000/todo/123456
 * * * Params : 123456
 * * * Body : application/json
 * * * * {
          "body" : "another todo" ?,
          "checked" : True ?,
 * * * * }
 */
router.put('/:id', validateBodyOptionalTodo, todoController.updateById);

/****************************
 * @Route * @DELETE * /todo *
 ****************************/

/**
 * Delete Todo Data By Id
 *
 * @Access Public
 * @Middleware :
 * * Validators :
 * * * validateParamsTodo
 * @Handler todoController => deleteById
 * @Response :
 * * Status : 200 OK
 * * Data : json( { msg: 'Deleted Successfully' } )
 * @Errors :
 * * ! Code 404 Not Found
 * * ! Code 500 Internal Server Error
 * @Usage :
 * * DELETE * http://Address:Port/todo/:Id
 * * * Params : Todo Id
 * @Examples :
 * * DELETE * http://localhost:7000/todo/123456
 * * * Params : 123456
 */
router.delete('/:id', validateParamsTodo, todoController.deleteById);

/************
 * @Exports *
 ************/

//Express Router
module.exports = router;
