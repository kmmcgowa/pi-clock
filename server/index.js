const path = require('path')
const fs = require('fs')
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const ipFilter = require('express-ipfilter').IpFilter
const DateHoliday = require('date-holidays')
const moment = require('moment')
const config = require('../mirror.config')

const app = express()

const holidays = new DateHoliday('US', 'CA', 'LA')

app.use(helmet())
app.use(morgan('combined'))
app.use(cors())

// ip middleware
app.use((request, response, next) => {
  ipFilter(config.ipWhitelist, { mode: config.ipWhitelist.length === 0 ? 'deny' : 'allow', log: false })(request, response, (err) => {
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

const photosPath = path.join(__dirname, '../photos')
app.use('/photos/', express.static(photosPath))

// holiday checker
app.get('/holidays', (req, res, next) => {
  let today = new Date()

  let now = moment()
  let startTime = moment('08:00:00', 'HH:mm:ss')
  let endTime = moment('10:00:00', 'HH:mm:ss')

  // Is it NOT between 8 and 10 AM
  // and
  // Are we not forcing a api call
  if (!now.isBetween(startTime, endTime) && !req.query.force) {
    res.json({ 'error': 'Not between time checks.' })
    return next()
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

// Pictures
app.get('/pictures', async (req, res, next) => {
  try {
    await fs.readdir(path.join(__dirname, '../photos'), (e, files) => {
      if (e || files.length < 1) {
        res.json({
          'error': 'No Photos to share :(...'
        })
        return next()
      }
      // filter out files that are not photos, like .DS_Store
      let photos = files.filter(file => file.match(/(\.jpg|\.png)$/i))

      // turns out there were no photos
      if (photos.length < 1) {
        res.json({
          'error': 'No Photos to share :(...'
        })
        return next()
      }

      res.json(photos)
    })
  } catch (e) {
    console.log(e)
    res.json({
      'error': 'Something went wrong...'
    })
  }
})

app.listen(3000, () => console.log('App listening on port 3000!'))
