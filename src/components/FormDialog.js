import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import styled from 'styled-components';
import BasicTextFields from './textfield';
import {BookingContext} from './BookingContext';
import { SeatContext } from './SeatContext';

export default function FormDialog({selectSeatId}) {

  const {
    state: state,
    actions: {receiveSelection, removeModal, purchaseTicketFailure, purchaseTicketSuccess}} = React.useContext(BookingContext)

    console.log(state, 'in form dialog');

    const {
      actions: { bookTheSeat },
    } = React.useContext(SeatContext);

//Hooks
const [creditCard, setCreditCard] = React.useState('');
const [expiration, setExpiration] = React.useState('');


const handleBookSeat = () => {
  fetch('/api/book-seat', 
  {method: 'POST',
  headers: {'Accept': 'application/json',
  'Content-type': 'application/json'},
  // must be sent as STRINGIFY to the backend
  body: JSON.stringify({
    "seatId": `${selectSeatId}`,
    "creditCard": `${creditCard}`,
    "expiration": `${expiration}`
  })

})
.then(res => {
  let data = res.json()
  return data;
})
.then(res => {
  if (res.success === true)
  {
    purchaseTicketSuccess({res});
    bookTheSeat(state.selectSeatId);
  }else if (res.message) {
    purchaseTicketFailure({res, selectSeatId, showPrice})
  }
  
  
})

}

//
  let showRow;
  let showSeat;
  let showPrice = state.price;
  if (state.selectSeatId !== null) {
    let id = state.selectSeatId;
    let idSplit = id.split('-');
    showRow = idSplit[0];
    showSeat = idSplit[1];
    

  }
 

  const handleClose = () => {
    selectSeatId = null;
    removeModal({selectSeatId})

  };

  return (
    <div>

{/* Dialog open is no longer true, meaning it is null when handle close is triggered. */}
      <Dialog open={selectSeatId !== null} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title"><strong>Purchsase Ticket</strong></DialogTitle>
        <DialogContent>
          <DialogContentText>
           {`You're purchasing 1 ticket for the price of ${state.price}.`}
          </DialogContentText>
          <SeatInfo>
          <div>
            <strong>Row</strong>
            <div>{`${showRow}`}</div>
          </div>
          <div>
            <strong>Seat</strong>
            <div>{`${showSeat}`}</div>
          </div>
          <div>
            <strong>Price</strong>
            <div>{showPrice}</div>
          </div>
          </SeatInfo>
          {/* <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          /> */}
          <BasicTextFields setCreditCard={setCreditCard} setExpiration={setExpiration}>
          </BasicTextFields>

        </DialogContent>
        <DialogActions>
          {/* <ButtonTag onClick={handleClose} color="primary">
            Cancel
          </ButtonTag> */}
          <ButtonTag onClick={handleBookSeat} color="primary">
            Purchase
          </ButtonTag>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const ButtonTag = styled.button`
color: white;
background-color: purple;
border: none;
width: 90px;
height: 50px;
border-radius 25px;
font-size: 15px;
cursor: pointer;
`
const SeatInfo = styled.div`
display: flex;
justify-content: space-evenly;
padding: 20px;
`