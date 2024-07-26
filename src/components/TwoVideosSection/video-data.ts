import VideosBgRight from '@/shared/img/videos-bg-right.jpg'
import VideosBgLeft from '@/shared/img/videos-bg-left.jpg'
import { VideoText1 } from './VideoText1'
import { VideoText2 } from './VideoText2'
import { StaticImageData } from 'next/image'
import { FC } from 'react'

export type VideoData = {
	bgSrc: StaticImageData
	text: FC
	bgClass: string
	wrapperClasses: string
	videoWrapperClasses: string
	videoSrc: string
	videos?: HTMLVideoElement[]
}

export const videoData: VideoData[] = [
	{
		bgSrc: VideosBgRight,
		text: VideoText1,
		bgClass: 'top-0 lg:top-20 right-0',
		wrapperClasses: 'pt-20 xl:pt-32 1440:pt-40',
		videoWrapperClasses: '',
		videoSrc: 'cloudy-sky-stock-footage-weather.mp4',
	},
	{
		bgSrc: VideosBgLeft,
		text: VideoText2,
		bgClass: '-top-[5rem] left-0',
		wrapperClasses: '',
		videoWrapperClasses: 'mt-20 lg:mt-[15rem] mx-auto',
		videoSrc: 'cloudy-sky-stock-footage-weather.mp4',
	},
]
