import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import styled from 'styled-components';
import BasicTextFields from './textfield';
import { BookingContext } from './BookingContext';
import { SeatContext } from './SeatContext';

export default function FormDialog({ selectSeatId }) {

  const {
    state: state,
    actions: { purchaseTicketFailure, purchaseTicketSuccess } } = React.useContext(BookingContext)

  // ----------------------------------------------
  const {
    state: seatState,
    actions: { bookTheSeat, removeModal, changePurchaseStatus } } = React.useContext(SeatContext);
  console.log(seatState, 'SEATSTATE')

  let seatsFromSeatContext = seatState.seats; // holds all of the seats from SeatContext. 


  //Hooks ---------------------------------------------
  const [creditCard, setCreditCard] = React.useState('');
  const [expiration, setExpiration] = React.useState('');


  const handleBookSeat = () => {
    fetch('/api/book-seat',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        // must be sent as STRINGIFY to the backend
        body: JSON.stringify({
          seatId: `${selectSeatId}`,
          creditCard: `${creditCard}`,
          expiration: `${expiration}`
        })

      })
      .then(res => {
        let data = res.json()
        return data;
      })
      .then(res => {
        if (res.success === true) {
          purchaseTicketSuccess({ res });
          bookTheSeat(state.selectSeatId);
          handlePurchase();
        } else if (res.message) {
          purchaseTicketFailure({ res, selectSeatId, showPrice })
        }

      })
  }
  //----------------------------------------------
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
    let alreadybought = seatState.isBought;
    alreadybought = false;
    removeModal({ alreadybought})


  };

  const handlePurchase = () => {
    let isPurchased = true;
    changePurchaseStatus({isPurchased})


  }

  return (
    <div>


      {/* selectSeatId !== null */}
      {/* only open this form dialog when clicking on the buy button.  */}
      {/* Dialog open is no longer true, meaning it is null when handle close is triggered. */}
      <Dialog open={seatState.isBought === true && selectSeatId !== null} onClose={handleClose} aria-labelledby="form-dialog-title">

        <DialogTitle id="form-dialog-title"><strong>Purchsase Ticket</strong></DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`You're purchasing 1 ticket for the price of ${state.price}.`}
          </DialogContentText>
          <SeatInfo>
            {seatsFromSeatContext !== null ? Object.keys(seatsFromSeatContext).map(seatNum => {
              return <div>
                {seatState.seats[seatNum].isClicked ?
                  <div>
                    <span>Seat#: {seatNum} - </span>
                    <span>Price $: {seatState.seats[seatNum].price}</span>
                    {/* <span>{state.seats[seatNum].price}</span> */}
                  </div> : ''}
              </div>
            }) : <div> Loading</div>}

          </SeatInfo>
          <BasicTextFields setCreditCard={setCreditCard} setExpiration={setExpiration}>
          </BasicTextFields>
        </DialogContent>
        <DialogActions>
          <ButtonTag onClick={handleClose} color="primary">
            Cancel
          </ButtonTag>
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
font-size: 1em;
padding: 20px;
`