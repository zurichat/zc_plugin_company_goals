import React from 'react';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    padding: '1rem 4rem 1.5rem 1.5rem',
  },
});

export default function Progress() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
       Progress
      </Button>
      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem className={classes.root} onClick={handleClose}>
          {' '}
          <Typography variant="body2">All Goals</Typography>
        </MenuItem>

        <MenuItem className={classes.root} onClick={handleClose}>
          {' '}
          <Typography variant="body2">Finance</Typography>
        </MenuItem>

        <MenuItem className={classes.root} onClick={handleClose}>
          {' '}
          <Typography variant="body2">Project Design</Typography>
        </MenuItem>

        <MenuItem className={classes.root} onClick={handleClose}>
          <Typography variant="body2">Wireframing</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}
