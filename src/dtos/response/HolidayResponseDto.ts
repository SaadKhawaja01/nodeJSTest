export interface HolidayResponseDto {
	name: string
	description: string
	country: CountryDto
	date: DateDto
	type: string[]
	primary_type: string
	canonical_url: string
	urlid: string
	locations: string
	states: string | StateDto[]
}

export interface CountryDto {
	id: string
	name: string
}

export interface DateDto {
	iso: string
	datetime: DateTimeDto
}

export interface DateTimeDto {
	year: number
	month: number
	day: number
}

export interface StateDto {
	id: number
	abbrev: string
	name: string
	exception: string | null
	iso: string
}
