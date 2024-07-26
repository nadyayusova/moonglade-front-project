import BgLayer1 from '@/shared/img/layer1.png'
import BgLayer2 from '@/shared/img/layer2.png'
import BgLayer3 from '@/shared/img/layer3.png'
import BgLayer4 from '@/shared/img/layer4.png'
import BgLayer5 from '@/shared/img/layer5.jpg'
import BgLayer1mobile from '@/shared/img/layer1-mobile.png'
import BgLayer2mobile from '@/shared/img/layer2-mobile.png'
import BgLayer3mobile from '@/shared/img/layer3-mobile.png'
import BgLayer4mobile from '@/shared/img/layer4-mobile.png'
import BgLayer5mobile from '@/shared/img/layer5-mobile.jpg'
import { StaticImageData } from 'next/image'
import Product0 from '@/shared/img/some-package.png'
import Plant0 from '@/shared/img/some-plant.png'
import Product1 from '@/shared/img/some-package.png'
import Plant1 from '@/shared/img/some-plant.png'
import Product2 from '@/shared/img/some-package.png'
import Plant2 from '@/shared/img/some-plant.png'
import Product3 from '@/shared/img/some-package.png'
import Plant3 from '@/shared/img/some-plant.png'
import Product4 from '@/shared/img/some-package.png'
import Plant4 from '@/shared/img/some-plant.png'
import Product5 from '@/shared/img/some-package.png'
import Plant5 from '@/shared/img/some-plant.png'
import Product6 from '@/shared/img/some-package.png'
import Plant6 from '@/shared/img/some-plant.png'
import Product7 from '@/shared/img/some-package.png'
import Plant7 from '@/shared/img/some-plant.png'
import Product8 from '@/shared/img/some-package.png'
import Plant8 from '@/shared/img/some-plant.png'
import Product9 from '@/shared/img/some-package.png'
import Plant9 from '@/shared/img/some-plant.png'
import Product10 from '@/shared/img/some-package.png'
import Plant10 from '@/shared/img/some-plant.png'

export interface SuperfoodImageItem {
	id: number
	src: StaticImageData
	imgClass?: string
	width: number
	height: number
	wrapperPos?: string
	from?: number
	to?: number
}

export const superfoodImage: SuperfoodImageItem[] = [
	{
		id: 0,
		src: BgLayer1,
		imgClass: 'scale-[1.15]',
		width: 1440,
		height: 1045,
		wrapperPos: 'relative',
		from: 0,
		to: 0,
	},
	{
		id: 1,
		src: BgLayer2,
		width: 1440,
		height: 1045,
		from: 0,
		to: 0,
	},
	{
		id: 2,
		src: BgLayer3,
		width: 1440,
		height: 1045,
		from: 0,
		to: 0,
	},
	{
		id: 3,
		src: BgLayer4,
		width: 1440,
		height: 1045,
		from: 0,
		to: 0,
	},
	{
		id: 4,
		src: BgLayer5,
		width: 1280,
		height: 929,
	},
]

export const superfoodMobileImage: SuperfoodImageItem[] = [
	{
		id: 0,
		src: BgLayer1mobile,
		imgClass: 'scale-[1.15]',
		width: 828,
		height: 1166,
		wrapperPos: 'relative',
	},
	{
		id: 1,
		src: BgLayer2mobile,
		width: 828,
		height: 1166,
	},
	{
		id: 2,
		src: BgLayer3mobile,
		width: 828,
		height: 1166,
	},
	{
		id: 3,
		src: BgLayer4mobile,
		width: 828,
		height: 1166,
	},
	{
		id: 4,
		src: BgLayer5mobile,
		width: 320,
		height: 451,
	},
]

export interface SuperfoodDataItem {
	id: number
	title: string
	form: string
	currency: string
	price?: number
	srcProduct: StaticImageData
	widthProduct?: number
	heightProduct?: number
	srcPlant: StaticImageData
	widthPlant?: number
	heightPlant?: number
}

export const superfoodData: SuperfoodDataItem[] = [
	{
		id: 0,
		title: 'ASHITABA',
		form: 'powder',
		currency: 'idr',
		srcProduct: Product0,
		srcPlant: Plant0,
	},
	{
		id: 1,
		title: 'COCONUT CHARCOAL',
		form: 'powder',
		currency: 'idr',
		srcProduct: Product1,
		srcPlant: Plant1,
	},
	{
		id: 2,
		title: 'RED GINGER',
		form: 'powder',
		currency: 'idr',
		srcProduct: Product2,
		srcPlant: Plant2,
	},
	{
		id: 3,
		title: 'MORINGA',
		form: 'powder',
		currency: 'idr',
		srcProduct: Product3,
		srcPlant: Plant3,
	},
	{
		id: 4,
		title: 'TURMERIC',
		form: 'powder',
		currency: 'idr',
		srcProduct: Product4,
		srcPlant: Plant4,
	},
	{
		id: 5,
		title: 'MANGOSTEEN',
		form: 'powder',
		currency: 'idr',
		srcProduct: Product5,
		srcPlant: Plant5,
	},
	{
		id: 6,
		title: 'NONI',
		form: 'powder',
		currency: 'idr',
		srcProduct: Product6,
		srcPlant: Plant6,
	},
	{
		id: 7,
		title: 'TURMERIC LATTE',
		form: 'powder',
		currency: 'idr',
		srcProduct: Product7,
		srcPlant: Plant7,
	},
	{
		id: 8,
		title: 'PAPAYA',
		form: 'powder',
		currency: 'idr',
		srcProduct: Product8,
		srcPlant: Plant8,
	},
	{
		id: 9,
		title: 'DRAGON FRUIT',
		form: 'powder',
		currency: 'idr',
		srcProduct: Product9,
		srcPlant: Plant9,
	},
	{
		id: 10,
		title: 'RED SPINACH',
		form: 'powder',
		currency: 'idr',
		srcProduct: Product10,
		srcPlant: Plant10,
	},
]
