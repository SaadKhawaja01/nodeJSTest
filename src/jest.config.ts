import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	testMatch: ['**/?(*.)+(spec|test).ts'],
	transformIgnorePatterns: ['/node_modules/'],
	extensionsToTreatAsEsm: ['.ts'],
}

export default config
