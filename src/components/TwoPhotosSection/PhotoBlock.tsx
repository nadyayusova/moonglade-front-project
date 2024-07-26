'use client'

import { FC } from 'react'
import Image from 'next/image'
import { PhotoData } from './photo-data'

export const PhotoBlock: FC<PhotoData> = (props) => {
	const {
		src,
		width,
		height,
		alt,
		frameClass,
		text1,
		text2,
		from = 0,
		to = 0,
		zi = 0,
	} = props

	return (
		<div
			className={`relative ${frameClass} z-[${zi}]`}
			data-frame-wrapper
			data-from={from}
			data-to={to}
		>
			<div className="relative">
				<div
					className={'image-wrapper relative w-full h-full overflow-hidden'}
					style={{ backfaceVisibility: 'hidden' }}
					data-image-wrapper
				>
					<Image
						className="scale-[1.2] w-auto h-auto object-cover bg-black select-none"
						data-image
						src={src}
						width={width}
						height={height}
						alt={alt}
						// без priority ScrollTrigger не может определить размеры
						priority
					/>
					<div className="absolute left-0 top-0 w-full h-full bg-black opacity-25 pointer-events-none"></div>
				</div>
				<div className="block md:grid grid-flow-col gap-x-[1rem] mt-4 lg:mt-8 text-[0.8rem] md:text-[1.3rem] uppercase">
					<p>
						{text1.split('\n').map((t, i) => {
							return (
								<span className="block text-left" key={i}>
									{t}
								</span>
							)
						})}
					</p>
					{text2 && (
						<p>
							{text2.split('\n').map((t, i) => {
								return (
									<span className="block text-left" key={i}>
										{t}
									</span>
								)
							})}
						</p>
					)}
				</div>
			</div>
		</div>
	)
}
