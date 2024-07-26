'use client'

import { FC } from 'react'

export const VideoText1: FC = () => {
	return (
		<div
			className="flex md:grid md:grid-cols-12 md:gap-x-[1.5rem] items-start"
			data-text-block
		>
			<div
				className="col-span-1 flex min-w-[3rem] text-[0.8rem] md:text-[1.3rem]"
				data-small-text
			>
				<span className="inline-block">01</span>
			</div>
			<h2 className="visually-hidden">
				Taking cre about our bodies and souls - finding balance in life
				dualities
			</h2>
			<div
				className="col-span-10 md:col-span-9 flex-grow w-full max-w-[25rem] md:max-w-[50rem] lg:max-w-full my-0 mx-auto font-moonglade text-[2rem] md:text-[3.3rem] lg:text-[4.4rem] leading-[1] uppercase"
				aria-hidden="true"
			>
				<div className="clip-words relative md:pl-[30px] text-left">
					<span className="shift-word inline-block">TAKING</span>{' '}
					<span className="shift-word inline-block">CARE</span>{' '}
					<span className="shift-word inline-block">ABOUT</span>
				</div>
				<div className="clip-words relative text-right">
					<span className="shift-word inline-block">OUR</span>{' '}
					<span className="shift-word inline-block">BODIES</span>{' '}
					<span className="shift-word inline-block">AND</span>{' '}
					<span className="shift-word inline-block">SOULS</span>{' '}
					<span className="shift-word inline-block">~</span>
				</div>
				<div className="clip-words relative md:pl-[15%] text-left">
					<span className="shift-word inline-block">FINDING</span>{' '}
					<span className="shift-word inline-block">BALANCE</span>{' '}
					<span className="shift-word inline-block">IN</span>{' '}
					<span className="shift-word inline-block">LIFE</span>
				</div>
				<div className="clip-words relative pl-[30px] text-center">
					<span className="shift-word inline-block">`</span>{' '}
					<span className="shift-word inline-block">DUALITIES.</span>
				</div>
			</div>

			<div
				className="hidden md:col-span-2 md:inline-flex justify-end justify-self-end"
				data-small-text
			>
				<button
					className="btn btn--link btn--small-text"
					data-video-link="https://share.macwel.app/wp-content/uploads/2022/09/welcome-monglade-1.mov"
				>
					<span className="inline-block">moonglade</span>
					<br />
					<span className="inline-block">Films</span>
				</button>
			</div>
		</div>
	)
}
