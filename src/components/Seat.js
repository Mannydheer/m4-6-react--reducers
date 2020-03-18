import React from 'react';
import { ReactComponent as SeatSrc } from '../assets/seat-available.svg';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import styled from 'styled-components';
import { BookingContext } from './BookingContext';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {SeatContext} from './SeatContext';
import AirlineSeatReclineNormalIcon from '@material-ui/icons/AirlineSeatReclineNormal';


// let holderSeat = [];

const Seat = ({seatId, rowName, seats}) => {

    const {
    actions: {receiveSelection}} = React.useContext(BookingContext)

    const {state: state,
    actions: {seatCounter}} = React.useContext(SeatContext)
//
    const [visible, setVisible] = React.useState(false);
    const visibility = visible ? 'visible' : 'hidden'
//

  const [select, setSelected] = React.useState(true);
  console.log(select,'select inside ')


// console.log(state, 'STATE INSIDE')

    //-----------------
    let seatPrice = seats[seatId].price;
    let splitSeatId = seatId.split('-');
    let getNum = splitSeatId.pop();
    //-----------------



    //make this a component;
    if (seats[seatId].isClicked === true && seats[seatId].isClicked !== undefined && state.isPurchased === true) {
      return (
        <React.Fragment>
          <StyledImgCheck>
            <SeatSrc style={{filter:'grayscale(100%'}}/>
            <CheckCircleIcon style={{ color: 'green' }} ></CheckCircleIcon>
            {/* <div>
              {handleSeatTracker(seatId)}
            </div> */}

          </StyledImgCheck>
        </React.Fragment>
      )
    }
    //

//DOES EVERYTHING AGAIN. 
    if (seats[seatId].isBooked === true) {
      return (
        <Btn>
          <SeatSrc style={{filter:'grayscale(100%'}}/>
        </Btn>)
    }
    else {
      return (
<React.Fragment>
      <Tippy content={`Price: ${seatPrice} Row: ${rowName} Seat: ${getNum}`}>
          <Btn onClick={() => {
            receiveSelection({seatId, seatPrice, isClicked: select}); //double check isclicked here
            seatCounter({seatId, seatPrice, select});
            setVisible(!visible);
            setSelected(!select);
          
          }}>
            <SeatSrc/>
       </Btn>
      </Tippy>
      <div>
      <AirlineSeatReclineNormalIcon style={{visibility}}/>
      </div>

  </React.Fragment>
      )
    }
  }


  export default Seat;

  const Btn = styled.button`
  background: none;
  border: none;


  &:hover {
      cursor:pointer;
  }
  `

  const StyledImgCheck = styled.span`
  display: inline;




  `