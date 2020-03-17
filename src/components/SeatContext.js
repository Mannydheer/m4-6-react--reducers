import React from 'react';
import { createContext } from 'react';
import { BookingContext } from 'react';

//this is exported to app,js
export const SeatContext = createContext();


//DOUBLE CHECK: Is this global now?

const initialState = {
    hasLoaded: false,
    seats: null,
    numOfRows: 0,
    seatsPerRow: 0
};




function reducer (state, action) { //action now holds to keyvalue, type and a copy of data. 
    //todo'
    
    switch(action.type) { 
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
            console.log(action.seatAvailability, 'action in seatContext')
            return {
                ...state,
                seats: action.seats[action.seatAvailability].isBooked = true,
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



    console.log(state, 'state in seat context')
// It is as if APP WAS INSIDE, IT HAS ACCESS - see SeatContext.Provider
    const receiveSeatInfoFromServer = data => {
        dispatch({
            //we are passing in the type and also ac opy of the data. 
            type: 'receive-seat-info-from-server',
            ...data,
        });
    };

    const bookTheSeat = (seatAvailability) => {

        console.log(seatAvailability, 'in seat context the return of form dialog')
        dispatch({
            type: 'mark-seat-as-purchased',
            seatAvailability

        })
    }
    return (
        <SeatContext.Provider
       
        //This is providing the values to the children.
            value={{
                state,
                actions: {
                    receiveSeatInfoFromServer,
                    bookTheSeat
                },
            }}
    >
        {children}
       
        </SeatContext.Provider>
    );
};

//this is exported to index.js