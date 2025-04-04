import express from 'express'
import dotenv from 'dotenv'
import router from './src/routes/index.js'
const app = express()
dotenv.config()
// middleware
app.use( express.json() )
// router
app.use( "/api", router )

app.use((err, req, res, next) => {
    console.log("Error", err)
    return res.status(500).json({
        errror : err.message
    })
})

const Port = process.env.Port || 3000
app.listen(Port, (req, res) => {
    console.log(`Server run at http://localhost:${Port}`)
})