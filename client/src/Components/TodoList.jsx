import React, { Component } from 'react';
import { Paper, List, Typography, Box, Fab } from '@material-ui/core';
import TodoItem from './TodoItem';
import { Add as AddIcon } from '@material-ui/icons';
import { lightGreen } from '@material-ui/core/colors';
import TodoDialog from './TodoDialog';
import { Scrollbars } from 'react-custom-scrollbars';
import axios from 'axios';

class TodoList extends Component {
  state = {
    todoList: [],
    todoDialog: { isOpen: false, item: null },
  };

  componentDidMount() {
    this.fetchTodo();
  }

  fetchTodo() {
    axios
      .get('/todo')
      .catch(() => {
        alert('Error Connection valid to server');
      })
      .then((res) => this.setState({ todoList: res.data }));
  }

  // Id counter for unique ids
  idCounter = 3;

  // Add todo dialog open/close handler
  handleTodoDialogOpen = (isOpen, item) => {
    this.setState({ todoDialog: { isOpen: !isOpen, item: item } });
  };

  // Todo Action Handler [ Check , Add , Delete ]
  handleChange = (action, item) => {
    switch (action) {
      // Alter Todo Check value
      case 'Check':
        axios
          .put(`/todo/${item._id}`, { checked: !item.checked })
          .catch(() => {
            alert('Error Connection valid to server');
          })
          .then(() => {
            this.fetchTodo();
          });
        break;
      // Add Todo to List
      case 'Add':
        axios
          .post('/todo', { body: item.body, checked: false })
          .catch(() => {
            alert('Error Connection valid to server');
          })
          .then(() => {
            this.handleTodoDialogOpen(item.isOpen, null);
            this.fetchTodo();
          });

        break;
      // Edit Todo From List by id
      case 'Edit':
        axios
          .put(`/todo/${item._id}`, { body: item.body })
          .catch(() => {
            alert('Error Connection valid to server');
          })
          .then(() => {
            this.handleTodoDialogOpen(item.isOpen, null);
            this.fetchTodo();
          });
        break;
      // Delete Todo From List by id
      case 'Delete':
        axios
          .delete(`/todo/${item._id}`)
          .catch(() => {
            alert('Error Connection valid to server');
          })
          .then(() => {
            this.fetchTodo();
          });
        break;
      default:
        break;
    }
  };
  render() {
    return (
      <React.Fragment>
        <Paper elevation={13}>
          <Scrollbars autoHeightMax="70vh" autoHeight>
            <List dense>
              {/* Empty List Render Condition */}
              {this.state.todoList.length === 0 ? (
                <Box ml={2}>
                  <Typography variant="h6">Noting To Do</Typography>
                </Box>
              ) : (
                // Todo List mapping => < TodoItem >
                this.state.todoList.map((value) => (
                  <TodoItem
                    key={value._id}
                    item={value}
                    changeHandler={this.handleChange}
                    handleEdit={this.handleTodoDialogOpen}
                  />
                ))
              )}
            </List>
          </Scrollbars>
        </Paper>
        {/* Add Todo Button */}
        <Fab
          size="medium"
          style={{
            backgroundColor: lightGreen.A700,
            bottom: 23,
            right: 23,
            position: 'fixed',
          }}
          onClick={() =>
            this.handleTodoDialogOpen(this.state.todoDialog.isOpen, null)
          }
        >
          <AddIcon />
        </Fab>
        {/* Add Todo Dialog */}
        <TodoDialog
          open={this.state.todoDialog.isOpen}
          handleOpen={this.handleTodoDialogOpen}
          handleConfirm={this.handleChange}
          item={this.state.todoDialog.item}
        />
      </React.Fragment>
    );
  }
}

export default TodoList;
