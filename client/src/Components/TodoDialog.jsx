import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Zoom,
} from '@material-ui/core';

function TodoDialog({ open, handleOpen, handleConfirm, item }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    item === null
      ? handleConfirm('Add', {
          [e.target.body.name]: e.target.body.value,
          isOpen: open,
        })
      : handleConfirm('Edit', {
          ...item,
          [e.target.body.name]: e.target.body.value,
          isOpen: open,
        });
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Zoom}
      onClose={() => handleOpen(open)}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle>{item === null ? 'Add' : 'Edit'} Todo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {item === null ? 'Add' : 'Edit'} New Todo Item
          </DialogContentText>
          <TextField
            defaultValue={item == null ? '' : item.body}
            autoFocus
            margin="dense"
            name="body"
            label="Todo:"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleOpen(open)} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            {item === null ? 'Add' : 'Edit'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

TodoDialog.propTypes = {
  open: PropTypes.bool,
  handleOpen: PropTypes.func,
  handleConfirm: PropTypes.func,
  item: PropTypes.shape({
    _id: PropTypes.string,
    body: PropTypes.string,
    checked: PropTypes.bool,
  }),
};

export default TodoDialog;
