import axios from 'axios'
import NodeCache from 'node-cache'
import environments from '../Config/environments'
import { HolidayResponseDto } from '../dtos/response/HolidayResponseDto'

class HolidaysRepository {
	private cache: NodeCache

	constructor() {
		this.cache = new NodeCache({ stdTTL: Number(environments.CACHE_TTL) })
	}

	public async getHolidays(
		country: string,
		year: string
	): Promise<HolidayResponseDto[]> {
		const cacheKey = `holidays_${country}_${year}`
		if (this.cache.has(cacheKey)) {
			return this.cache.get(cacheKey) as Promise<HolidayResponseDto[]>
		}

		const response = await axios.get(`${environments.API_URL}/holidays`, {
			params: {
				api_key: environments.CALENDAR_IFIC_API_KEY,
				country,
				year,
			},
		})

		const holidays = response.data.response.holidays

		this.cache.set(cacheKey, holidays)

		return holidays
	}

	public async getCountries() {
		const cacheKey = `countries`

		if (this.cache.has(cacheKey)) {
			console.log('cache hit for countries ===================')
			return this.cache.get(cacheKey)
		}

		const response = await axios.get(`${environments.API_URL}/countries`, {
			params: {
				api_key: environments.CALENDAR_IFIC_API_KEY,
			},
		})

		const countries = response.data.response.countries

		this.cache.set(cacheKey, countries)

		return countries
	}
}
export default new HolidaysRepository()
