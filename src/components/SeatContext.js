import React from 'react';
import { createContext } from 'react';

//this is exported to app,js
export const SeatContext = createContext();

//DOUBLE CHECK: Is this global now?

const initialState = {
    hasLoaded: false,
    seats: null,
    numOfRows: 0,
    seatsPerRow: 0
};

function reducer (state, action) {
    //todo
}

//its children being App in this case, because
//its wrapped around App in the index.js
export const SeatProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
// It is as if APP WAS INSIDE, IT HAS ACCESS - see SeatContext.Provider
    const receiveSeatInfoFromServer = data => {
        dispatch({
            type: 'receive-seat-info-from-server',
            ...data,
        });
    };
    return (
        <SeatContext.Provider
       
        //This is providing the values to the children.
            value={{
                state,
                actions: {
                    receiveSeatInfoFromServer,
                },
            }}
    >
        {/* So now the App will have access to the values.  */}
        {children}
       
        </SeatContext.Provider>
    );
};

//this is exported to index.js