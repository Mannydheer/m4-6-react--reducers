import React, {
    useReducer
} from 'react';
import {
    createContext
} from 'react';


export const BookingContext = createContext();

const initialState = {
    status: 'idle',
    error: null,
    selectSeatId: null,
    price: null,
};

function reducer(state, action) {
    switch (action.type) {
        case 'begin-booking-process': {
            return {
                ...state,
                status: 'seat-selected',
                selectSeatId: action.seatId,
                price: action.seatPrice,


            };
        }
        case 'remove-booking-process': {
            return {
                ...state,
                selectSeatId: action.selectSeatId,
            }
        }
        case 'purchase-ticket-failure': {
            return {
                
                ...state,
                status: 'error',
                error: action.res.message,
                selectSeatId: action.selectSeatId,
                price: action.showPrice
            }
            
        }
        case 'purchase-ticket-success': {
            return {
                ...state,
                status: 'purchased',
                error: null,
                selectSeatId: null,
                price: null

            }
        }
        default:
            throw new Error('ERROR');
    }
}

export const BookingProvider = ({
    children
}) => {


    const receiveSelection = (seatData) => {
        dispatch({
            type: 'begin-booking-process',
            ...seatData
        })
    }
    const removeModal = (seatData) => {
        dispatch({
            type: 'remove-booking-failure',
            ...seatData
        })
    }
    const purchaseTicketFailure = (seatData) => {
        console.log(seatData.res.message, "********")
        console.log(seatData,'******')
        dispatch({
            type: 'purchase-ticket-failure',
            ...seatData
        })
     
    }

    const purchaseTicketSuccess = (seatData) => {
        dispatch({
            type: 'purchase-ticket-success',
            ...seatData
        })
    }
    
    const [state, dispatch] = React.useReducer(reducer, initialState)
    console.log(state, 'this is new state')

   React.useEffect(() => {

       if (state.status === 'error' ) {
           window.alert(state.error)
       } else if (state.status === 'purchased') {
           window.alert(state.status)
       }
       
   }, [state])

    return (

        <BookingContext.Provider

        value = {
            {
                state,
                actions: {
                    receiveSelection,
                    removeModal,
                    purchaseTicketFailure,
                    purchaseTicketSuccess
                },
            }
        } >

        {
            children
        } </BookingContext.Provider>
    )
}