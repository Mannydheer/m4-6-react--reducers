import React, {useContext} from 'react';
import {BookingContext} from './BookingContext';
import { SeatContext } from './SeatContext';
import FormDialog from './FormDialog';
import CustomizedSnackbars from './Snackbar';
import styled from 'styled-components';



const PurchaseModal = () => {
    const {
        state: state,
        actions: {seatCounter, receiveSelection, removeModal}} = React.useContext(BookingContext)
console.log(state, 'in purchase modeal')


return <React.Fragment>
    <SeatCounter>
        hialdkjaklsjdlaksjd
    </SeatCounter>

    
    <FormDialog selectSeatId={state.selectSeatId} removeModal={removeModal} state={state} />
    </React.Fragment>

}

export default PurchaseModal;

const SeatCounter = styled.div`
color: white;
`


