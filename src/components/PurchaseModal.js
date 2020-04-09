import React from 'react';
import {BookingContext} from './BookingContext';
import FormDialog from './FormDialog';
import styled from 'styled-components';


let holder = [];

const PurchaseModal = () => {
    const {
        state: state,
        actions: {removeModal}} = React.useContext(BookingContext)

React.useEffect(() => {

        holder.push({state});
    

 
  }, [state]);


return <React.Fragment>
    <SelectedSeat>
    {state.status === 'seat-selected' ? 
    <div> <div>Current Seat: </div>

         Seat#: {state.selectSeatId} Price: {state.price}
    </div> : <PickSeat>Pick A Seat!</PickSeat>}
    </SelectedSeat>
    {/* only show formdialog if he hits buy buttons;..most liekly a map...  */}
    {/* <FormDialog selectSeatId={state.selectSeatId} removeModal={removeModal} state={state} /> */}
    <FormDialog selectSeatId={state.selectSeatId}/>

    </React.Fragment>

}

export default PurchaseModal;




const SelectedSeat = styled.div`
color: white;
font-size: 2rem;
text-align: center
background-color: white;
border-radius: 25px;


@media only screen and (max-width: 400px) {
    color: black;
    background-color: white;
    font-size: 0.5rem;
  
 
 
   
   }
`

const PickSeat = styled.div`
color: white;
font-size: 3rem;
text-align: center;
background-color: purple;
border-radius: 25px;
width: 120%;
color: black;
   background-color: white;

@media only screen and (max-width: 400px) {
   color: black;
   background-color: white;
   font-size: 1rem;
   padding:1rem;
   text-align: start;
   
 
   
  }




`