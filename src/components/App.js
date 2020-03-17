 import React, {
   useState,
   useContext,
   useEffect
 } from 'react';
 import {
   SeatContext
 } from './SeatContext';
 import GlobalStyles from './GlobalStyles';
 import TicketWidget from './TicketWidget';
 import PurchaseModal from './PurchaseModal';
import CustomizedSnackbars from './Snackbar';
import styled from 'styled-components';


 function App() {
   //keep in mind, it's like App was inside SeatProvider.
   const {
     state: {
       numOfRows,
       seatsPerRow,
       seats
     },
     actions: {
       receiveSeatInfoFromServer
     }
   } = React.useContext(SeatContext);


   React.useEffect(() => {
     fetch('/api/seat-availability')
       .then((res) => res.json())
       .then((data) => {
         receiveSeatInfoFromServer(data)

       });
   }, []);
   //we only want this code to redner once so the array is empty. 
   return ( <>
     <GlobalStyles/>
     <Wrapper>
     <TicketWidget/>
     {
       /* Because it is a child of App? */ }
      <PurchaseModal/>
     

     </Wrapper> 
     </>
   );
 }
 export default App;

 const Wrapper = styled.div `
 display: flex;
 justify-content: center;






 
`;