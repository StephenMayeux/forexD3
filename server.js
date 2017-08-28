const express = require('express')
const app = express()
const fetch = require('isomorphic-fetch')
const Moment = require('moment')
const MomentRange = require('moment-range')
const moment = MomentRange.extendMoment(Moment)
const async = require('async')
const cors = require('cors')

app.use(cors())

app.get('/latest', (req, res) => {
  const startDate = Moment().subtract(30, 'days')
  const endDate = Moment()
  const iterable = moment.range(startDate, endDate)
  const range = Array.from(iterable.by('day')).map(day => day.format('YYYY-MM-DD'))

  let rawData = []
  async.each(range, (date, next) => {
    fetch(`http://api.fixer.io/${date}?base=USD&symbols=AUD,CAD,GBP,EUR`)
      .then(response => response.json())
      .then(data => {
        if (date === data.date) {
          data.rates.date = date
          rawData.push(data.rates)
        }
        next()
      })
  }, (err) => {
    if (err) return res.send({ success: false, err })
    rawData.sort((a, b) => Moment(a.date) - Moment(b.date))
    res.send(rawData)
  })
})

const port = process.env.PORT || 3030
app.listen(port, () => {
  console.log('Express server running on port', port)
})
