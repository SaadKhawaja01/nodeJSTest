import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import environments from './Config/environments.js'
import holidayRoute from './Routes/HolidayRouter.js'

const app = express()
dotenv.config()
app.use(express.json({ limit: '500mb' }))
app.use(express.urlencoded({ extended: true, limit: '500mb' }))
app.use(
	cors({
		origin: '*',
		methods: '*',
		optionsSuccessStatus: 200,
		allowedHeaders: ['Authorization', 'content-type'],
	})
)
const PORT = environments.PORT

app.use('/', holidayRoute)

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
