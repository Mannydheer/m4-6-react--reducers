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
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2)
      ,
    },
  },
}));

export default function CustomizedSnackbars({ status, snackBarRemoval }) {
  const classes = useStyles();

  //hook to change value of IsBooked.... ask if it's okay to do this from here?

  // const{ 
  // state: state,
  // actions: {bookTheSeat}} = React.useContext(SeatContext)

  // console.log(state, 'inside Snackbar')



  const handleClose = () => {
    status = 'idle';
    snackBarRemoval(status)
  };



  return (
    <div className={classes.root}>

      <Snackbar open={status === 'purchased'} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Successfully purchased the show! Enjoy :)
        </Alert>
      </Snackbar>

    </div>
  );
}

