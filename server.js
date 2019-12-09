// External Modules Imports
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session');
const mongoStore = require('connect-mongo')(session)
const app = express();
const cors = require('cors')

// Setting up PORT 
const PORT = 4000

// Internal Module Imports 
const routes = require('./routes/api')

// Middle-Ware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

const corsOptions = {
    origin: ['http://localhost:3000'],
    credentials : true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions))

// Routes 
app.use('/api/v1', routes)

// Server
app.listen(PORT, ()=>{
    console.log(`Server Started on ${PORT}` )
})
