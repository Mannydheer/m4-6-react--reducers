import React, {useContext} from 'react';
import { ReactComponent as SeatSrc } from '../assets/seat-available.svg';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import styled from 'styled-components';
import { BookingContext } from './BookingContext';
import PurchaseModal from './PurchaseModal';
import CheckIcon from '@material-ui/icons/Check';



const Seat = ({seatId, rowName, seats}) => {

  const {
    state: {},
    actions: {receiveSelection}} = React.useContext(BookingContext)

    let seatPrice = seats[seatId].price;
    let splitSeatId = seatId.split('-');
    let getNum = splitSeatId.pop();

    //make this a component;
    if (seats[seatId].isAvailable === true && seats[seatId].isAvailable !== undefined ) {
      return (
        <React.Fragment>
          <StyledImgCheck>
            <SeatSrc style={{filter:'grayscale(100%'}}/>
            <CheckIcon color='primary' fontSize='large'></CheckIcon>
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
            receiveSelection({seatId, seatPrice});
          }}>
            <SeatSrc/>
       </Btn>

      </Tippy>
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