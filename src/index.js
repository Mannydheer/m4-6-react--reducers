import React from 'react';
import ReactDOM from 'react-dom';
import {SeatProvider} from './components/SeatContext'
import App from './components/App';

const rootElement = document.getElementById('root');

ReactDOM.render(
    //Now SeatProviders child so App will have access to the values
<SeatProvider>
<App />
</SeatProvider>,
 rootElement);
