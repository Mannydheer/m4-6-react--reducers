import React from 'react';
import { createContext } from 'react';
import { BookingContext } from 'react';
import styled from 'styled-components';

//this is exported to app,js
export const SeatContext = createContext();


//DOUBLE CHECK: Is this global now?

const initialState = {
    hasLoaded: false,
    seats: null,
    numOfRows: 0,
    seatsPerRow: 0
};




function reducer(state, action) { //action now holds to keyvalue, type and a copy of data. 
    //todo'

    switch (action.type) {
        case 'receive-seat-info-from-server': {
            return {
                ...state, //making a copy of the state, and changing the values...
                hasLoaded: true,
                seats: action.seats,
                numOfRows: action.numOfRows,
                seatsPerRow: action.seatsPerRow

            };
        }
        case 'mark-seat-as-purchased': {

            let changedSeats = { ...state.seats };
            //object are reference types...
            changedSeats[action.seatAvailability].isBooked = true;
            changedSeats[action.seatAvailability].isAvailable = true;

            return {
                ...state,
                seats: changedSeats

            }
        }

        case 'count-the-seats': {
            let updateSeatsWithCount = { ...state.seats };
            updateSeatsWithCount[action.seatSelected.seatId].isClicked = action.seatSelected.select;

            return {
                ...state,
                seats: updateSeatsWithCount,


            }
        }
        case 'clicked-buy-now': {
            return {
                ...state,
                isBought: action.buyClicked

            }
        }
        case 'remove-buy-now': {
            return {
                ...state,
                isBought: action.alreadyBought.alreadybought,

            }
        }
        case 'change-purchase-status': {
            return {
                ...state,
                isPurchased: action.purchaseStatus.isPurchased
            }
        }
        default:
            throw new Error(`Unrecognized action: ${action.type}`);

    }
}
//its children being App in this case, because
//its wrapped around App in the index.js
export const SeatProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);






    //anything associated withr educer, state... will cause a changer. 
    //re-renders everything associated with this STATE. 
    console.log(state, 'this is the seats')

    let seatHolder = state.seats; //holds all seats

    const receiveSeatInfoFromServer = data => {
        dispatch({
            //we are passing in the type and also ac opy of the data. 
            type: 'receive-seat-info-from-server',
            ...data,
        });
    };
    const bookTheSeat = (seatAvailability) => {
        dispatch({
            type: 'mark-seat-as-purchased',
            seatAvailability
        })
    }
    const seatCounter = (seatSelected) => {
        console.log(seatSelected, 'in seat context the return of form dialog')
        dispatch({
            type: 'count-the-seats',
            seatSelected,
        })
    }

    const triggerBuyNow = (buyClicked) => {
        dispatch({
            type: 'clicked-buy-now',
            buyClicked


        })
    }
    const removeModal = (alreadyBought) => {
        console.log(alreadyBought, 'REMOVE MODAL')
        dispatch({
            type: 'remove-buy-now',
            alreadyBought
        })
    }
    const changePurchaseStatus = (purchaseStatus) => {
        console.log(purchaseStatus, 'PRUCHASESTATUS')
        dispatch({
            type: 'change-purchase-status',
            purchaseStatus
        })
    }


    return (
        <SeatContext.Provider

            //This is providing the values to the children.
            value={{
                state,
                actions: {
                    receiveSeatInfoFromServer,
                    bookTheSeat,
                    seatCounter,
                    triggerBuyNow,
                    removeModal,
                    changePurchaseStatus,
                },
            }}
        >
            {children}

            <Text>
                <Title> Your Selected Seats</Title>
                <Button onClick={() => {
                    triggerBuyNow(true)
                }}>
                    Buy Now
        </Button>
                {seatHolder !== null ? Object.keys(seatHolder).map(seatNum => {
                    return <div>
                        {state.seats[seatNum].isClicked ?
                            <div>
                                <span>Seat#: {seatNum} - </span>
                                <span>Price $: {state.seats[seatNum].price}</span>
                                {/* <span>{state.seats[seatNum].price}</span> */}
                            </div> : ''}
                    </div>
                }) : <div> Loading</div>}


            </Text>
        </SeatContext.Provider>
    );
};

//this is exported to index.js

const Text = styled.div`
color: black;
font-size: 1em;
background-color: white;
height: 10%;
width: 100%;
padding: 0;
margin 0;

@media only screen and (max-width: 400px) {
color: green;
font-size: 1em;
background-color: white;
padding: 0;
margin 0;
width: 100%;
   
    
}
    
`

const Title = styled.div`
color: white;
font-size: 2em;
background-color: black


`

const Button = styled.button`
background-color: purple;
color: white;
font-size: 1.5em;

border-radius: 25px;
`