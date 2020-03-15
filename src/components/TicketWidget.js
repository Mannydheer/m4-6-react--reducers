import React, {
  useContext,
  useState
} from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

import {
  getRowName,
  getSeatNum
} from '../helpers';
import {
  range
} from '../utils';
import {
  SeatContext
} from './SeatContext';

// import seatAvailabilityChecker from './Seat'
import Seat from './Seat';


const TicketWidget = () => {

  const {
    state: {
      numOfRows,
      seatsPerRow,
      hasLoaded,
      seats
    },
    actions: {
      receiveSeatInfoFromServer
    }
  } = React.useContext(SeatContext);
  //need to return since it is a function
  if (hasLoaded === false) {
    return <CircularProgress></CircularProgress>
  }

  return ( <Wrapper> 
    {range(numOfRows).map(rowIndex => {
        const rowName = getRowName(rowIndex);

    return (
      <Row key = {rowIndex} >
          <RowLabel > Row {rowName}
           </RowLabel> {
            range(seatsPerRow).map(seatIndex => {
              const seatId = `${rowName}-${getSeatNum(seatIndex)}`;


              return (
              <SeatWrapper key = { seatId } >
          <Seat seatId = {seatId}
                rowName = {rowName}
                seats = {seats}/>
              </SeatWrapper>
              );
            })
          } </Row>
        );
      })
    } </Wrapper>
  );

};
const Wrapper = styled.div `
  background: #eee;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 8px;
  color: black
`;

const Row = styled.div `
  display: flex;
  position: relative;

  &:not(:last-of-type) {
    border-bottom: 1px solid #ddd;
  }
`;

const RowLabel = styled.div `
  font-weight: bold;
`;

const SeatWrapper = styled.div `
  padding: 5px;
`;

export default TicketWidget;


////////