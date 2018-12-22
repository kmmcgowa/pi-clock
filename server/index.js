import path from 'path'
import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import { IpFilter as ipFilter } from 'express-ipfilter'
import DateHoliday from 'date-holidays'
import moment from 'moment'
import config from '../mirror.config'

const app = express()

const holidays = new DateHoliday('US', 'CA', 'LA')

app.use(helmet())
app.use(morgan('combined'))
app.use(cors())

// ip middleware
app.use(function (request, response, next) {
  ipFilter(config.ipWhitelist, { mode: config.ipWhitelist.length === 0 ? 'deny' : 'allow', log: false })(request, response, function (err) {
    if (err === undefined) {
      return next()
    }

    console.log(err.message)
    response.status(403).send('This device is not allowed to access your mirror')
  })
})

// frontend
const staticPath = path.join(__dirname, '../frontend/dist')
app.use(express.static(staticPath))

// holiday checker
app.get('/holidays', (req, res) => {
  let today = new Date()

  let now = moment()
  let startTime = moment('08:00:00', 'HH:mm:ss')
  let endTime = moment('10:00:00', 'HH:mm:ss')

  // Is it NOT between 8 and 10 AM
  // and
  // Are we not forcing a api call
  if (!now.isBetween(startTime, endTime) && !req.query.force) {
    res.json({ 'error': 'Not between time checks.' })
    return
  }

  let isHoliday = holidays.isHoliday(today)

  // if (isHoliday) {
  //   res.json(isHoliday)
  // } else {
  //   res.json({
  //     'error': 'No Holidays Today'
  //   })
  // }

  res.json({ date: '2016-02-09 00:00:00',
    start: 'Tue Feb 09 2016 00:00:00 GMT-0600 (CST)',
    end: 'Wed Feb 10 2016 00:00:00 GMT-0600 (CST)',
    name: 'Mardi Gras',
    note: 'this is a test note!',
    type: 'public' })
})

app.listen(3000, () => console.log('App listening on port 3000!'))
