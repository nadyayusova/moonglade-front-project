import { StaticImageData } from 'next/image'
import Frame1 from '@/shared/img/pic01.jpg'
import Frame2 from '@/shared/img/pic01.jpg'
import Frame3 from '@/shared/img/pic01.jpg'
import Frame4 from '@/shared/img/pic01.jpg'
import Frame5 from '@/shared/img/pic01.jpg'

export interface FrameData {
	id: number
	currentFrame?: number
	photo: StaticImageData
	width: number
	height: number
	alt: string
	text1: string
	text2: string
	text3: string
	text4: string
	text5: string
	from: number
	to: number
	onMouseMove?: any
	onMouseLeave?: any
	onMouseEnter?: any
}

export const frameData: FrameData[] = [
	{
		id: 0,
		photo: Frame1,
		width: 1000,
		height: 671,
		alt: 'image description',
		text1: '53',
		text2: 'M5',
		text3: 'FF800-1',
		text4: '050',
		text5: 'LA',
		from: -3,
		to: 7,
	},
	{
		id: 1,
		photo: Frame2,
		width: 1000,
		height: 1007,
		alt: 'image description',
		text1: '16',
		text2: 'G7',
		text3: 'RG603-1',
		text4: '090',
		text5: 'BARCELONA',
		from: 5,
		to: -7,
	},
	{
		id: 2,
		photo: Frame3,
		width: 1000,
		height: 1068,
		alt: 'image description',
		text1: '69',
		text2: 'BJ',
		text3: 'T-MAX',
		text4: '696',
		text5: 'BATU KARAS',
		from: -5,
		to: 1,
	},
	{
		id: 3,
		photo: Frame4,
		width: 1000,
		height: 528,
		alt: 'image description',
		text1: '01',
		text2: 'K9',
		text3: 'OP100-2',
		text4: '900',
		text5: 'BALI',
		from: 0,
		to: 0,
	},
	{
		id: 4,
		photo: Frame5,
		width: 1000,
		height: 667,
		alt: 'image description',
		text1: '10',
		text2: 'B9',
		text3: 'ROLLEI',
		text4: '047',
		text5: 'LOMBOK',
		from: -5,
		to: 2,
	},
]
