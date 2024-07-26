import PhotoTop from '@/shared/img/pic01.jpg'
import PhotoBottom from '@/shared/img/pic01.jpg'
import { StaticImageData } from 'next/image'

export interface PhotoData {
	src: StaticImageData
	width: number
	height: number
	alt: string
	frameClass: string
	text1: string
	text2?: string
	from: number
	to: number
	zi?: number
}

export const photoData: PhotoData[] = [
	{
		src: PhotoTop,
		width: 667,
		height: 1000,
		alt: 'A surfing man',
		frameClass: 'mr-auto',
		text1: 'BODY IS THE TEMPLE\nOF YOUR SOUL',
		from: -5,
		to: 10,
		zi: 2,
	},
	{
		src: PhotoBottom,
		width: 1000,
		height: 667,
		alt: 'Road in the forest',
		frameClass: 'ml-auto xl:-mt-[10rem]',
		text1: 'PATH OF ZEN\nIS LED BY FUN',
		text2: 'WE CAN CHANGE\nTHE FUTURE',
		from: 9,
		to: -3,
	},
]
