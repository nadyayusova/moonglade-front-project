import Slide1 from '@/shared/img/pic01.jpg'
import Slide2 from '@/shared/img/pic01.jpg'
import Slide3 from '@/shared/img/pic01.jpg'
import Slide4 from '@/shared/img/pic01.jpg'
import Slide5 from '@/shared/img/pic01.jpg'
import Slide6 from '@/shared/img/pic01.jpg'
import { StaticImageData } from 'next/image'

type GalleryDataItem = {
	id: number
	src: StaticImageData
	width: number
	height: number
	alt: string
	caption1: string
	caption2?: string
	from?: number
	to?: number
}

export const GalleryData: GalleryDataItem[] = [
	{
		id: 0,
		src: Slide1,
		width: 1000,
		height: 629,
		alt: '',
		caption1: 'LIFESTYLE AND HEALTH',
		caption2: 'SUPPORT',
		from: 0,
		to: 30,
	},
	{
		id: 1,
		src: Slide2,
		width: 1000,
		height: 667,
		alt: '',
		caption1: 'UNIQUE BEING',
		caption2: 'PROJECT / BRAND',
		from: 0,
		to: 60,
	},
	{
		id: 2,
		src: Slide3,
		width: 1000,
		height: 667,
		alt: '',
		caption1: 'TIMELESS VISION',
		from: 0,
		to: -5,
	},
	{
		id: 3,
		src: Slide4,
		width: 1000,
		height: 595,
		alt: '',
		caption1: 'GREEN PLANET',
		caption2: 'ACTIVIST',
		from: 0,
		to: 15,
	},
	{
		id: 4,
		src: Slide5,
		width: 500,
		height: 625,
		alt: '',
		caption1: 'MYSTIC MIND',
		from: 25,
		to: 10,
	},
	{
		id: 5,
		src: Slide6,
		width: 1000,
		height: 672,
		alt: '',
		caption1: 'LIVING IS AN ART',
		from: 10,
		to: -10,
	},
]
