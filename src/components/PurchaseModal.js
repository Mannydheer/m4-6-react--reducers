import React, {useContext} from 'react';
import {BookingContext} from './BookingContext';
import { SeatContext } from './SeatContext';
import FormDialog from './FormDialog';
import CustomizedSnackbars from './Snackbar';



const PurchaseModal = () => {
    const {
        state: state,
        actions: {receiveSelection, removeModal}} = React.useContext(BookingContext)



return <div>
    <FormDialog selectSeatId={state.selectSeatId} removeModal={removeModal} state={state} />
</div>

}

export default PurchaseModal;



