import React, { Component } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import moment from 'moment'
import _ from 'lodash';
import axios from 'axios';

import { enumerateDays, calculateBetween } from './helpers/helperFunctions';
import getTimeData from './helpers/getFunctions';

var Chart = require('react-d3-core').Chart;
var LineChart = require('react-d3-basic').LineChart;

export default class DateChart extends Component {

  componentWillMount() {

  }

  render() {

    const margins = {
      top: 50,
      right: 20,
      bottom: 100,
      left: 60
    }

    const svgDimensions = {
      width: 1400,
      height: 800
    }

		const chartSeries = [{
			field: 'age',
			name: 'USD',
			color: '#ff7f0e',
			style: {
				"stroke-width": 2,
				"stroke-opacity": .2,
				"fill-opacity": .2
			}
		}]

		return (
			<LineChart
				margins={margins}
				width={svgDimensions.width}
				height={svgDimensions.height}
				data={data}
				chartSeries={chartSeries}
			/>
		)
	}
}
