import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
      backgroundColor: 'light-grey',
    },
  },
}));

export default function BasicTextFields({setCreditCard, setExpiration}) {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="standard-basic" label='Credit card' onChange={(event) => {
        setCreditCard(event.target.value)
      }}/>
      <TextField id="filled-basic" label="Expiration" variant="filled" onChange={(event) => {
        setExpiration(event.target.value)
      }} />
    </form>
  );
}

