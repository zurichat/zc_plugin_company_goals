/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { deleteConfirmationAction } from '../../redux/deleteGoal.slice';
import { toggleEditGoalModalAction } from '../../redux/toggleEditGoalModal.slice';

const useStyles = makeStyles({
  root: {
    padding: '1rem 5rem 1rem 2rem',
  },
});

export default function Menuoption({ show, toggleShowDropDown }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);

  return (
    <div>
      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={show} onClose={toggleShowDropDown}>
        <MenuItem className={classes.root} onClick={toggleShowDropDown}>
          {' '}
          <Typography variant="body2">View</Typography>
        </MenuItem>
        <MenuItem
          className={classes.root}
          onClick={() => {
            toggleShowDropDown();
            dispatch(toggleEditGoalModalAction());
          }}
        >
          {' '}
          <Typography variant="body2">Edit</Typography>
        </MenuItem>
        <MenuItem className={classes.root} onClick={toggleShowDropDown}>
          <Typography variant="body2">Update</Typography>
        </MenuItem>
        <MenuItem className={classes.root} onClick={toggleShowDropDown}>
          <Typography variant="body2">Archive</Typography>
        </MenuItem>
        <MenuItem className={classes.root} onClick={toggleShowDropDown}>
          <Typography variant="body2">Duplicate</Typography>
        </MenuItem>
        <MenuItem
          className={classes.root}
          onClick={() => {
            toggleShowDropDown();
            dispatch(deleteConfirmationAction());
          }}
        >
          <Typography variant="body2" style={{ color: '#f44336' }}>
            Delete
          </Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}
