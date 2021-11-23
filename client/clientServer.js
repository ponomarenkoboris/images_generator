const express = require('express')
const serveStatic = require('serve-static')
const history = require('connect-history-api-fallback')
const path = require('path')

const PORT = process.env.PORT || 3000
const app = express()

app.use(history({
    index: '/index.html'
}))
app.use(serveStatic(path.join(__dirname, 'build')))
app.listen(PORT, () => {
    console.log(`Client started at http://127.0.0.1:${PORT}`)
})