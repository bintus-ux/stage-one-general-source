const express = require('express')
const app = express()

let day = new Date()
let weekday = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]
let currentDay = weekday[day.getDay()]

let currentUTC = new Date(Date.now()).toISOString().split('.')[0] + 'Z'

app.get('/info', (req, res) => {
  const slack_name = req.query.slack_name
  const current_day = currentDay
  const track = req.query.track
  const utcTime = currentUTC
  const github_file_url = 'https://github.com/bintus-ux/stage-one-index-repo'
  const github_repo_url =
    'https://github.com/bintus-ux/stage-one-general-source'
  const status_code = 200

  const info = {
    slack_name: slack_name,
    current_day: current_day,
    utc_Time: utcTime,
    track: track,
    github_file_url: github_file_url,
    github_repo_url: github_repo_url,
    status_code: status_code,
  }

  res.json(info)
})
// app.get('/', (req, res) => {
//   res.send('API is running....')
// })

app.listen(5000, () => {
  console.log('Server is running on port 5000')
})
