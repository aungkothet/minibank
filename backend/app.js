require('dotenv').config()
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')
const morgan = require('morgan')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const transactionRoutes = require('./routes/transaction')
const http = require('http')
const server = http.createServer(app)
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
})
const cors = require('cors')
global.io = io
app.use(
  cors({
    origin: true,
    credentials: true,
  })
)
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(expressValidator())
app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', transactionRoutes)
server.listen(4001)
const port = process.env.PORT || 8000
app.listen(port)
