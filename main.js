import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import router from './src/routes/index.js'
const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config()
// middleware
app.use( express.json() )
app.set('view engine', 'ejs') // setup view engine ejs
app.set('views', path.join(__dirname, 'src', 'views'))
app.use(express.static( path.join(__dirname, 'src', 'public'))) // static serving
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
    console.log("filename : ", __filename)
    console.log("dirname : ", __dirname)
    console.log(`Server run at http://localhost:${Port}`)
})