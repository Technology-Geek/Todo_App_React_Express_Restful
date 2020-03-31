import React from 'react';
import PropTypes from 'prop-types';
import {
  ListItem,
  ListItemText,
  Checkbox,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import { Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons';
import { orange, teal } from '@material-ui/core/colors';

function TodoItem({ item, changeHandler, handleEdit }) {
  return (
    <ListItem
      button
      dense
      divider
      style={{ textDecorationLine: item.checked ? 'line-through' : 'none' }}
      onClick={() =>
        changeHandler('Check', { _id: item._id, checked: item.checked })
      }
    >
      <ListItemText primary={item.body} />
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={item.checked}
          tabIndex={-1}
          disableRipple
        />
      </ListItemIcon>
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          style={{
            color: teal[500],
          }}
          onClick={() => handleEdit(false, item)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          edge="end"
          style={{
            color: orange.A700,
          }}
          onClick={() => changeHandler('Delete', item)}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

TodoItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string,
    body: PropTypes.string,
    checked: PropTypes.bool,
  }),
  changeHandler: PropTypes.func,
  handleEdit: PropTypes.func,
};

export default TodoItem;
