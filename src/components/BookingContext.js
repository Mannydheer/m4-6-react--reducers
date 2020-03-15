import React, {useReducer} from 'react';
import { createContext } from 'react';


export const BookingContext = createContext();

const initialState = {
    status: 'idle',
    error: null,
    selectSeatId: null,
    price: null,
};

function reducer (state, action) {
    switch(action.type) {
        case 'begin-booking-process': {
        return {
            ...state,
            status: 'seat-selected',
            selectSeatId: action.seatId,
            price: action.seatPrice,

        };
    }
        default: throw new Error('ERROR');
}
}



export const BookingProvider = ({children}) => {


    const receiveSelection = (seatData) => {
        dispatch({
            type: 'begin-booking-process',
            ...seatData
        })
    }
    const [state, dispatch] = React.useReducer(reducer, initialState)
console.log(state, 'booking context')
    return (

        <BookingContext.Provider
        
            value={{
                state,
                actions: {
                    receiveSelection,
                },
            }}>

            {children}
        </BookingContext.Provider>
    )
}


