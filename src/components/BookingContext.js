import React from 'react';
import {
    createContext
} from 'react';
import CustomizedSnackbars from './Snackbar';
import styled from 'styled-components';


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
                selected: action.isClicked,
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
        case 'remove-snackBar': {
            return {
                ...state,
                status: action.receivedStatus,
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
        // console.log(seatData, 'isCLicked trye')
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
    const snackBarRemoval = (receivedStatus) => {
        dispatch({
            type: 'remove-snackBar',
            ...receivedStatus
        })
    }
    const updateSeats = (seatUpdate) => {

        dispatch({
            type: 'update-seat',
            ...seatUpdate
        })
    }

    //keep track of seat counts. 
    // const seatCounter = (seatCount) => {
    //     dispatch({
    //         type: 'track-seat-count',
    //         ...seatCount
    //     })
    // }

    const [state, dispatch] = React.useReducer(reducer, initialState)

//If I have two return state.... it will do until that bit and then return... so it returend without rendering the seats. 
//this return is for the whole componeent....    


if (state.status === 'error' ) {
    window.alert(state.error)
} 

    return (

        <React.Fragment>
  
        {state.status === 'purchased' ? <CustomizedSnackbars status={state.status} snackBarRemoval={snackBarRemoval}/> : <> </>  }
        {/* cannot return empty object.. instead could put the status being error with a window alert.  */}
            <BookingContext.Provider
            value={
                {
                    state,
                    actions: {
                        receiveSelection,
                        removeModal,
                        purchaseTicketFailure,
                        purchaseTicketSuccess,
                        updateSeats
                        // seatCounter

                    },
                }
            } >

            {
                children
            } 

            </BookingContext.Provider>
            </React.Fragment>
    )
}

const SeatText = styled.div`
color: white;
font-size: 2em;
`