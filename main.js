import express from 'express'
import dotenv from 'dotenv'
import router from './src/routes/index.js'
const app = express()
dotenv.config()
// middleware
app.use( express.json() )
// router
app.use( "/api", router )

const Port = process.env.Port || 3000
app.listen(Port, (req, res) => {
    console.log(`Server run at http://localhost:${Port}`)
})