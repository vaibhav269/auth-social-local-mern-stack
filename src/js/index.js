import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import store from  './store/index';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom'
import AppOne from './components/AppOne';
//window.store = store;

render(    
        <Provider store={store}>
            <BrowserRouter>
                <AppOne />
            </BrowserRouter>
        </Provider>,
    document.getElementById('app')
);
