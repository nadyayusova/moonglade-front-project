'use client'

import { FC } from 'react'
import Image from 'next/image'
import { PlayButton } from '@/components/PlayButton'
import { VideoData } from './video-data'
import { VIDEO_SRC } from '@/constants/video'

export const VideoBlock: FC<VideoData> = (props) => {
	const {
		bgSrc,
		text: VideoText,
		bgClass,
		wrapperClasses,
		videoWrapperClasses,
		videoSrc,
		videos = [],
	} = props

	return (
		<div className={`relative ${wrapperClasses}`}>
			<div className="absolute left-0 top-0 w-full h-full -z-[1]">
				<Image
					className={`absolute ${bgClass} block h-auto w-1/2 object-contain object-right-top select-none -z-[1]`}
					src={bgSrc}
					width="720"
					height="745"
					alt=""
					aria-hidden="true"
					unoptimized
				/>
			</div>
			<div className="container">
				<div className={`max-w-[94.6rem] ${videoWrapperClasses}`} data-wrapper>
					<div
						className="clip-video mb-[1.5rem] lg:mb-[3rem] p-0 aspect-ratio-holder aspect-ratio-946-540"
						data-video-wrapper
					>
						<video
							className="cropped-media scale-110 select-none"
							data-video-media
							width="946"
							height="540"
							muted
							loop
							playsInline
							poster="/images/poster.jpg"
							preload="none"
						>
							<source src={`/videos/${videoSrc}`} />
							Your browser does not support the video tag.
						</video>
						<div className="absolute left-0 top-0 w-full h-full bg-black opacity-20 pointer-events-none"></div>
						<div data-play-btn className="absolute-center opacity-0">
							<PlayButton videoSrc={VIDEO_SRC} videos={videos} />
						</div>
					</div>
					<VideoText />
				</div>
			</div>
		</div>
	)
}
