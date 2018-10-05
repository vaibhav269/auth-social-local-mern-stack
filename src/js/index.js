import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import store from  './store/index';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom'

//window.store = store;

render(    
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>,
    document.getElementById('app')
);
