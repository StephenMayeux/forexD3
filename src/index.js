import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger'
import reduxThunk from 'redux-thunk';
import rootReducer from './reducers';

const logger = createLogger({ collapsed: true })

const store = createStore(rootReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
	applyMiddleware(reduxThunk, logger));

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector('#root'));
