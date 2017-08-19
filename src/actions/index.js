import axios from 'axios';
import _ from 'lodash';
import { FETCH_DATA, FETCH_TIME_DATA, SAVE_TIME_DATA } from './types';

export const fetchData = (currency) => {
	return async (dispatch) => {
		const res = await axios.get(`http://api.fixer.io/latest?base=${currency}`);
        const temp  = res.data.rates;
        var arr = Object.keys(temp).map(function (key) { 
          return (
              temp[key]
          ); 
        });

        var arr2 = Object.keys(temp).map(function (key) { 
          return (
              key
          ); 
        });

        var empty = [];

        for(var i = 0; i < arr.length; i++){
          empty[i] = {title: arr2[i], value: arr[i]};
        }

        _.remove(empty, {title: 'IDR'});
        _.remove(empty, {title: 'KRW'});
        _.remove(empty, {title: 'HUF'});

        empty.sort((a, b) => {
    		    var titleA = a.title.toLowerCase()
    		    var titleB = b.title.toLowerCase()
    		    if (titleA < titleB) //sort string ascending
    		        return -1 
    		    if (titleA > titleB)
    		        return 1
    		    return 0 //default return value (no sorting)
    		})

		//do all the refactoring of objects and array here, then send off with redux-thunk
		dispatch({type: FETCH_DATA, payload: empty});
	}
};

export const fetchTimeData = (currency, date) => {
  return async (dispatch) => {
    const res = await axios.get(`http://api.fixer.io/${date}?base=${currency}`);

        const temp  = res.data.rates;
        var arr = Object.keys(temp).map(function (key) { 
          return (
              temp[key]
          ); 
        });

        var arr2 = Object.keys(temp).map(function (key) { 
          return (
              key
          ); 
        });

        var empty = [];

        for(var i = 0; i < arr.length; i++){
          empty[i] = {title: arr2[i], value: arr[i]};
        }

        _.remove(empty, {title: 'IDR'});
        _.remove(empty, {title: 'KRW'});
        _.remove(empty, {title: 'HUF'});

        empty.sort((a, b) => {
            var titleA = a.title.toLowerCase()
            var titleB = b.title.toLowerCase()
            if (titleA < titleB) //sort string ascending
                return -1 
            if (titleA > titleB)
                return 1
            return 0 //default return value (no sorting)
        })

    dispatch({type: FETCH_TIME_DATA, payload: empty});
  }
};


export const saveTimeData = (data) => {

  return{
    type: SAVE_TIME_DATA,
    payload: data
  }
}

