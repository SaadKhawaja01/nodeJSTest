import dotenv from 'dotenv'
dotenv.config()
const environments = {
	PORT: process.env.PORT ?? 3000,
	CALENDAR_IFIC_API_KEY: process.env.CALENDAR_IFIC_API_KEY ?? '',
	API_URL: process.env.API_URL ?? '',
	CACHE_TTL: process.env.CACHE_TTL ?? '86400',
}
export default environments
