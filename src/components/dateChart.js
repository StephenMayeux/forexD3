import Moment from 'react-moment';
import 'moment-timezone';
import * as actions from '../actions';
import {
  enumerateDays,
  calculateBetween
} from './helpers/helperFunctions';
import getTimeData from './helpers/getFunctions';
import React, {
  Component
} from 'react';
import {
  connect
} from 'react-redux';
import _ from 'lodash';
import axios from 'axios';
var moment = require('moment');


var Chart = require('react-d3-core').Chart;
var LineChart = require('react-d3-basic').LineChart;

// TODO: Remove moment deprecation warnings. Look in console.

class DateChart extends Component {

  componentWillMount() {
    this.calculateDays();
  }

  calculateDays() {
    var currentDate = moment();
    var hold = enumerateDays('2017-8-10', currentDate);

    var firstDay = hold[0];

    // do the transfer of data here
    var days = hold.map((date) => {

      var inBetween = calculateBetween(firstDay, date);
      this.props.fetchTimeData(this.props.base, date);

      return ({
        currencies: 'test',
        date: date,
        days: inBetween
      })
    })
  }



  flattenData(days) {
    //first make a list of all currencies
  }


  render() {
    const margins = {
      top: 50,
      right: 20,
      bottom: 100,
      left: 60
    };
    const svgDimensions = {
      width: 1400,
      height: 800
    };

    const data = this.props.saveTime.map((obj, i) => {
      return {
        [obj.title]: obj.value,
        index: i
      }
    })

    console.log('this is the massaged data', data)

    //for color, pass the array of colors to the redux store then pop off from the beginning into chartSeries

    // https://github.com/react-d3/react-d3-basic

    // http://www.reactd3.org/docs/basic/#line_multiple

    // https://github.com/react-d3/react-d3-basic

    var chartSeries = [{
      field: 'age',
      name: 'USD',
      color: '#ff7f0e',
      style: {
        "stroke-width": 2,
        "stroke-opacity": .2,
        "fill-opacity": .2
      }
    }]

    //iterate over a list of years and calculate days from using moment
    //the data will have years, but the function down here will change it
    //set the very first index date as the "from" date in moment.js
    var x = function(d) {
      return d.index;
    }

    return ( <
      div >
      <
      LineChart margins = {
        margins
      }
      width = {
        svgDimensions.width
      }
      height = {
        svgDimensions.height
      }
      data = {
        data
      }
      chartSeries = {
        chartSeries
      }
      x = {
        x
      }
      /> <
      /div>
    );
  }
}

function mapStateToProps(state) {
  return {
    saveTime: state.data.currencyTime,
    allTime: state.data
  };
}

export default connect(mapStateToProps, actions)(DateChart);
