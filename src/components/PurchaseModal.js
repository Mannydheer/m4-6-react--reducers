import React, {useContext} from 'react';
import {BookingContext} from './BookingContext';
import FormDialog from './FormDialog';


const PurchaseModal = () => {
    const {
        state: state,
        actions: {receiveSelection}} = React.useContext(BookingContext)
        // console.log(state)


return <div>
    <FormDialog selectSeatId={state.selectSeatId} />
</div>

}

export default PurchaseModal;



