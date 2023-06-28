import express from "express";
import paymentRoute from './routes/payment.route.js'
import {PORT} from "./config.js";
import morgan from "morgan";
import path from 'path'

const app = express ()

app.use (paymentRoute)
app.use (morgan ('dev'))

app.use(express.static(path.resolve('src/public')))

app.listen(PORT)
console.log ("Server on port", PORT)

