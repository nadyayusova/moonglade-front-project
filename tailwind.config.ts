import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				text: 'var(--color-text)',
				bgbasic: 'var(--color-background)',
			},
			spacing: {
				'480': '480px',
				'993': '993px',
			},
			padding: {
				'loader-img': '21.25%',
			},
			fontSize: {
				'18': '18px',
				'12': '12px',
				'10': '10px',
			},
			fontFamily: {
				plain: 'Plain, Arial, sans-serif',
				moonglade: 'Moonglade, Times New Roman, serif',
				icomoon: 'Icomoon',
			},
			screens: {
				'520': '520px',
				'1025': '1025px',
				'1440': '1440px',
			},
		},
	},
	plugins: [],
}
export default config
