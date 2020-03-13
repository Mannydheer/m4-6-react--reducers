import React, { useState, useContext, useEffect} from 'react';
import { SeatContext } from './SeatContext'

import GlobalStyles from './GlobalStyles';
function App() {
//keep in mind, it's like App was inside SeatProvider. 
  // const {actions: { receiveSeatInfoFromServer }} = 
  //   React.useContext(SeatContext);
 console.log('I am in APP')


  React.useEffect(() => {
    fetch('/api/seat-availability')
      .then(res => res.json())
      .then(data => console.log(data));
  })
  
  return (
    <>
      <GlobalStyles />
      {<div>whys</div>}
      TODO: write code
    </>
  );
}

export default App;
