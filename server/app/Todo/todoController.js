/*****************
 * @Dependencies *
 *****************/

//Todo Model
const Todo = require('./todoModel');
//Request Error Handler
const errorHandler = require('../../utils/error/errorHandler');

/********************
 * @RequestHandlers *
 ********************/

/**
 * Get Todo List Item From DB
 *
 * @param {Request} req Http Request
 * @param {Response} res Http Response
 * @returns {Response} :
 * * Status : 200 OK
 * * Data : json( [ Todo List ] )
 * @Errors :
 * * ! DB Error => ErrorHandler(500)
 */
const getAll = (req, res) => {
  //Fetch DB
  Todo.find()
    .catch(() => {
      //! Request Error Handler Code 500
      return errorHandler(res, 500);
    })
    .then((data) => {
      //Response
      res.status(200).json(data);
    });
};

/**
 * Save Todo In DB
 *
 * @param {Request} req Http Request
 * @param {Response} res Http Response
 * @Requires :
 * * Request.Body (
 * * * Todo : {
 * * *       body : String
 * * *       checked : Boolean
 * * *       } )
 * @returns {Response} :
 * * Status : 201 Created
 * * Data : json( New Todo Data )
 * @Errors :
 * * ! Conflict => ErrorHandler(409)
 * * ! DB Error => ErrorHandler(500)
 */
const save = (req, res) => {
  //Get Todo Properties
  const { body, checked } = req.body;

  //Construct New Todo
  const newTodo = new Todo({ body, checked });
  //Save New Todo To DB
  newTodo
    .save()
    .catch(() => {
      //! Request Error Handler Code 500
      return errorHandler(res, 500);
    })
    .then((data) => {
      //Response
      res.status(201).json(data);
    });
};

/**
 * Update Todo In DB
 *
 * @param {Request} req Http Request
 * @param {Response} res Http Response
 * @Requires :
 * * Request.Params (
 * * * { id : ObjectId } )
 * * & Request.Body (
 * * * Todo : {
 * * *       body ? : String ,
 * * *       checked ? : Boolean
 * * *       } )
 * @returns {Response} :
 * * Status : 200 OK
 * * Data : json( { msg: 'Update Successfully' } )
 * @Errors :
 * * ! Not Found => ErrorHandler(404)
 * * ! DB Error => ErrorHandler(500)
 */
const updateById = (req, res) => {
  //Get Id From Request Params
  const id = req.params.id;
  //Get Data From Request Body
  const data = req.body;
  //Fetch DB => Update Todo By Id
  Todo.findOneAndUpdate({ _id: id }, data)
    .catch(() => {
      //! Request Error Handler Code 500
      return errorHandler(res, 500);
    })
    .then((data) =>
      //Check Data Found
      data
        ? //Response
          res.status(200).json({ msg: 'Update Successfully' })
        : //! Request Error Handler Code 404
          errorHandler(res, 404)
    );
};

/**
 * Delete Todo From DB
 *
 * @param {Request} req Http Request
 * @param {Response} res Http Response
 * @Requires :
 * * Request.Params (
 * * * { id : ObjectId } )
 * @returns {Response} :
 * * Status : 200 OK
 * * Data : json( { msg: 'Deleted Successfully' } )
 * @Errors :
 * * ! Not Found => ErrorHandler(404)
 * * ! DB Error => ErrorHandler(500)
 */
const deleteById = (req, res) => {
  //Get Id From Request Params
  const id = req.params.id;
  //Fetch DB => Delete Todo By Id
  Todo.findOneAndDelete({ _id: id })
    .catch(() => {
      //! Request Error Handler Code 500
      return errorHandler(res, 500);
    })
    .then((data) =>
      //Check Data Found
      data
        ? //Response
          res.status(200).json({ msg: 'Deleted Successfully' })
        : //! Request Error Handler Code 404
          errorHandler(res, 404)
    );
};

/************
 * @Exports *
 ************/

module.exports = {
  //Get Todo List From DB
  getAll,
  //Save Todo In DB
  save,
  //Update Todo In DB
  updateById,
  //Delete Todo In DB
  deleteById,
};
