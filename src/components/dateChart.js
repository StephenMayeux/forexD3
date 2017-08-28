import React, { Component } from 'react';
import {
  LineChart,
  XAxis,
  YAxis,
  Legend,
  Line,
  Tooltip
} from 'recharts'
import _ from 'lodash'

const colors = [
  '#82ca9d',
  '#C0392B',
  '#2980B9',
  '#27AE60',
  '#E67E22'
]

export default class DateChart extends Component {

  renderChartLines() {
    const symbols = ['AUD', 'CAD', 'GBP', 'EUR']
    return symbols.map(symbol => {
      return (
        <Line
          key={symbol}
          type="monotone"
          dataKey={symbol}
          stroke={_.sample(colors)}
        />
      )
    })
  }

  render() {
    return (
      <LineChart width={730} height={250} data={this.props.currency}>
        <XAxis dataKey="date" />
        <YAxis type="number" />
        <Legend />
        <Tooltip />
        {this.renderChartLines()}
      </LineChart>
    )
  }
}
