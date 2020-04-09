import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { SeatContext } from './SeatContext';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {
    height: '10%',
    width: '10%',
    '& > * + *': {
      marginTop: theme.spacing(2)
      ,
    },
  },
}));

export default function CustomizedSnackbars({ status, snackBarRemoval }) {
  const classes = useStyles();

  const handleClose = () => {
    status = 'idle';
    snackBarRemoval(status)
  };

  return (
    <div className={classes.root}>

{/* set more specific conditions. */}
      <Snackbar open={status === 'purchased' ? true : false} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Successfully purchased the show! Enjoy :)
        </Alert>
      </Snackbar>

    </div>
  );
}

