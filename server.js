const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const colors = require('colors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

// =====env config=====
dotenv.config();


// Router import =============
const userRoute = require('./routes/userRoute')
const blogRoute = require('./routes/blogRoute')

//==== mongoose connection=====
connectDB();

// rest objects 

const app = express()

//========middlewhere========
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//===========routes=======

// app.get('/', async(req, resp)=>{
//     resp.status(200).send({
//         "message":"Node server"
//     })
// })

app.use("/api/v1/user", userRoute)
app.use("/api/v1/blog", blogRoute)
//======port======
const PORT = process.env.PORT || 8080



//============listen==========
app.listen(PORT, () => {
    console.log(`server running on ${process.env.DEV_MODE} mode port no ${PORT}`.bgCyan.white)
})