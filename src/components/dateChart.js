import Moment from 'react-moment';
import 'moment-timezone';
import * as actions from '../actions';
import { enumerateDays, calculateBetween } from './helpers/helperFunctions';
import React, { Component } from 'react';
import { connect } from 'react-redux';
var moment = require('moment');


var Chart = require('react-d3-core').Chart;
var LineChart = require('react-d3-basic').LineChart;


class DateChart extends Component {

	constructor(){
		super()

		this.state = {
			timeData: []
		}
	}

	componentWillMount() {
		this.calculateDays();
	}

	// componentWillReceiveProps(nextProps) {
	// 	if(this.props !== nextProps) {
	// 		this.setState({timeData: this.props.timeData});
	// 	}
	// }

	calculateDays() {
		var currentDate = moment();
		var hold = enumerateDays('2017-7-10', currentDate);

		var days = [];
		var firstDay = hold[0];


		days = hold.map((date) => {
			this.props.fetchTimeData('USD', date);
			var inBetween = calculateBetween(firstDay, date);

			return(
				{
					currencies: this.props.timeData,
					date: date,
					days: inBetween
				}
			)
		})

		// console.log("testHold", days);
		// console.log("testHold", this.props.timeData);

	}


	render(){

		const margins = { top: 50, right: 20, bottom: 100, left: 60 };
		const svgDimensions = { width: 1400, height: 800 };

		var data = [
          {
              "age": 39,
              "index": 0
          },
          {
              "age": 38,
              "index": 1
          },
          {
              "age": 34,
              "index": 2
          },
          {
              "age": 12,
              "index": 3
          }
      ];

      //for color, pass the array of colors to the redux store then pop off from the beginning into chartSeries

      var chartSeries = [
          {
            field: 'age',
            name: 'USD',
            color: '#ff7f0e',
            style: {
              "stroke-width": 2,
              "stroke-opacity": .2,
              "fill-opacity": .2
            }
          }
        ]

        //iterate over a list of years and calculate days from using moment
        //the data will have years, but the function down here will change it
        //set the very first index date as the "from" date in moment.js
        var x = function(d) {
          return d.index;
        }

		return(
			<div>
				<LineChart
					margins= {margins}
			        width={svgDimensions.width}
			        height={svgDimensions.height}
			        data= {data} 
			        chartSeries= {chartSeries} 
			        x= {x}
			    />
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		timeData: state.data.currencyTime
	};
}

export default connect(mapStateToProps, actions)(DateChart);