const credentials = require('./config/config')[process.env.NODE_ENV]
const express = require('express')
const load = require('express-load')
const bodyParser = require('body-parser')
const http = require('http')
const mongoose = require('mongoose')

mongoose.connect( credentials.db_host )
.then( () => {
    console.log('Mongoose connection o/', credentials.db_host);
})
.catch( (err) => {
    console.log('Mongoose errrou!!!! ' + err )
})

const app = express()
const server = http.createServer()

app.set('view engine', 'ejs')
app.set('views', './web')

app.use('/public', express.static('./web/public'))
app.use('/node_modules', express.static('./node_modules'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


load('models', {cwd:'app'})
.then('controllers')
.then('routes')
.into( app )

app.get('/', (req, res) => {
    res.render('index.ejs')
})

server.listen( credentials.port )
.on('listening', () => {
    console.log('Run, forest run', process.env.NODE_ENV, credentials.port )
})

module.exports = app
