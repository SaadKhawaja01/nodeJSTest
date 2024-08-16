import { Request, Response } from 'express'

import HolidayRepository from '../Repositories/HolidayRepository'
import { Exception } from '../Utils/exception.helper'

const HolidayFunctions = {
	getHolidays: async (req: Request, res: Response) => {
		try {
			const { country, year } = req.query as { country: string; year: string }
			if (!country || !year) {
				const error = Exception.badRequest('Country or year is missing')
				return res.status(error.status).json({ error: error.message })
			}

			const holidays = await HolidayRepository.getHolidays(country, year)

			if (!holidays.length) {
				const error = Exception.notFound('No holidays found')
				return res.status(error.status).json({ error: error.message })
			}

			res.status(200).json(holidays)
		} catch (error: any) {
			res.status(error.statusCode || 500).json({
				error: error.message || 'Failed to fetch holidays',
				code: error.statusCode || 500,
			})
		}
	},

	getCountries: async (_: Request, res: Response) => {
		try {
			const countries = await HolidayRepository.getCountries()

			if (!countries.length) {
				throw Exception.notFound('No countries found')
			}

			res.status(200).json(countries)
		} catch (error: any) {
			res.status(error.statusCode || 500).json({
				error: error.message || 'Failed to fetch countries',
				code: error.statusCode || 500,
			})
		}
	},
}
export default HolidayFunctions
