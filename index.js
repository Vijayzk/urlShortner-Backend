import express from 'express'
import urlRoute from './routes/url.router.js'
import userRoute from './routes/user.router.js'
import connectDB from './db/connect.js'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()
const PORT = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(
    cors({
        origin:'*',
    })
)


connectDB(DATABASE_URL);


app.use('/user',userRoute)
app.use('/url', urlRoute)


app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
})