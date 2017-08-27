import {
	FETCH_DATA,
	FETCH_TIME_DATA,
	SAVE_TIME_DATA
} from '../actions/types';

const INITIAL_STATE = {
	currency: [],
	currencyTime: []
}

export default function(state = INITIAL_STATE, action) {
	switch (action.type){
		case FETCH_DATA:
			return {...state, currency: action.payload};
		case FETCH_TIME_DATA:
			return {...state, currencyTime: action.payload};
		default:
			return state;
	}
}
