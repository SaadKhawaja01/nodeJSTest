import express from 'express'
import request from 'supertest'
import HolidayFunctions from '../Functions/HolidaysFunctions'
import HolidayRepository from '../Repositories/HolidayRepository'
import { HttpError } from '../Utils/exception.helper'

const app = express()
app.use(express.json())
app.get('/holidays', HolidayFunctions.getHolidays)

jest.mock('../Repositories/HolidayRepository')

describe('GET /holidays', () => {
	it('should return 400 if country or year is missing', async () => {
		const response = await request(app)
			.get('/holidays')
			.query({ country: 'PAK' })

		expect(response.status).toBe(400)
		expect(response.body).toEqual({ error: 'Country or year is missing' })
	})

	it('should return 404 if no holidays are found', async () => {
		;(HolidayRepository.getHolidays as jest.Mock).mockResolvedValue([])

		const response = await request(app)
			.get('/holidays')
			.query({ country: 'PAK', year: '2024' })

		expect(response.status).toBe(404)
		expect(response.body).toEqual({ error: 'No holidays found' })
	})

	it('should handle errors from the repository', async () => {
		;(HolidayRepository.getHolidays as jest.Mock).mockRejectedValue(
			new Error('Internal Server Error') as HttpError
		)

		const response = await request(app)
			.get('/holidays')
			.query({ country: 'PAK', year: '2024' })

		expect(response.status).toBe(500)
		expect(response.body).toEqual({
			code: 500,
			error: 'Internal Server Error',
		})
	})
})
