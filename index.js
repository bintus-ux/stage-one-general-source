const express = require('express')
const { format, addMinutes, subMinutes, isWithinInterval } = require('date-fns')
const app = express()

const port = 5000

app.get('/api', (req, res) => {
  const { slack_name, track } = req.query

  const now = new Date()
  const utcTime = format(now, "yyyy-MM-dd'T'HH:mm:ss'Z'")

  const currentDay = format(now, 'EEEE')

  const twoMinutesAgo = subMinutes(now, 2)
  const twoMinutesFromNow = addMinutes(now, 2)
  const isValidTime = isWithinInterval(now, {
    start: twoMinutesAgo,
    end: twoMinutesFromNow,
  })

  if (!slack_name || !track || !isValidTime) {
    return res.status(400).json({ error: 'Invalid request parameters' })
  }

  const githubFileUrl =
    'https://github.com/bintus-ux/stage-one-general-source/blob/main/index.js'
  const githubRepoUrl = 'https://github.com/bintus-ux/stage-one-general-source'
  const status_code = 200

  const info = {
    slack_name,
    current_day: currentDay,
    utc_time: utcTime,
    track,
    github_file_url: githubFileUrl,
    github_repo_url: githubRepoUrl,
    status_code: status_code,
  }

  res.json(info)
  // express.response.setHeader('Content-Type', 'application/json')
})
// app.get('/', (req, res) => {
//   res.send('API is running....')
// })

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
