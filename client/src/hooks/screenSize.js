/* eslint-disable import/prefer-default-export */
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'block',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      width: '45vw',
    },
    work: {
      display: 'flex',
    },
  },
}));
