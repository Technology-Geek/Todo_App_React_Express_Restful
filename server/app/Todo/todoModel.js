/*****************
 * @Dependencies *
 *****************/

//MongoDB ODM
const mongoose = require('mongoose');

/***********
 * @Schema *
 ***********/

//Schema Class
const Schema = mongoose.Schema;

//Create Schema
const TodoSchema = new Schema({
  body: {
    type: String,
    required: true,
    trim: true
  },
  checked: {
    type: Boolean,
    required: true
  },
  createdAt: { type: Date, default: Date.now() }
});

/**********
 * @Model *
 **********/

//Create Model
const Todo = mongoose.model('todo', TodoSchema, 'todos');

/************
 * @Exports *
 ************/

//DB Model
module.exports = Todo;
