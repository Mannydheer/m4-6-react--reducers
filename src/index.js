import React from 'react';
import ReactDOM from 'react-dom';
import {SeatProvider} from './components/SeatContext'
import {BookingProvider} from './components/BookingContext'
import App from './components/App';


const rootElement = document.getElementById('root');

ReactDOM.render(
    //Now SeatProviders child so App will have access to the values
<BookingProvider>
<SeatProvider>
<App/>
</SeatProvider>
</BookingProvider>
,
 rootElement);
