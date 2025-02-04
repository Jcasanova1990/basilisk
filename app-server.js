const express = require('express')
const app = express()
const path = require('path')

app.use(express.json())
app.use((req, res, next) => {
    res.locals.data = {}
    next()
})
app.use(express.static('public'))

app.use('/api/scoreRoutes', require('./routes/api/scoreRoutes'));

// for react router
app.get('*', (req, res) => {
	res.sendFile(path.resolve(path.join(__dirname, 'public', 'index.html')))
})

module.exports = app