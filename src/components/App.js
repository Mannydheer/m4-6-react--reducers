 import React from 'react';
 import {
   SeatContext
 } from './SeatContext';
 import GlobalStyles from './GlobalStyles';
 import TicketWidget from './TicketWidget';
 import PurchaseModal from './PurchaseModal';
import styled from 'styled-components';





 function App() {
   //keep in mind, it's like App was inside SeatProvider.
   const {
    
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
      <TicketSizing>
     <TicketWidget/>
     </TicketSizing>


      <PurchaseModal/>

     

     </Wrapper> 
      <FlightTitle>
      </FlightTitle>

     </>
   );
 }
 export default App;

 const Wrapper = styled.div `
 display: flex;
 justify-content: space-around;
 @media only screen and (max-width: 450px) {
  flex-direction: column;
  justify-content: center;
  padding: 0;
  margin: 0;
  
}


`;


const FlightTitle = styled.div `
display: flex;
justify-content: center;
font-size: 5em;
color: white;

@media only screen and (max-width: 45px) {
  flex-direction: column;
  justify-content: center;
  color: white;
  font-size: 1.5em;
  padding: 0;
  margin: 0;
}

`;

const TicketSizing = styled.div`
`