import express from 'express'
import HolidayFunctions from '../Functions/HolidaysFunctions.js'

const holidayRoute = express.Router()

holidayRoute.get('/holidays', HolidayFunctions.getHolidays)
holidayRoute.get('/countries', HolidayFunctions.getCountries)

export default holidayRoute
