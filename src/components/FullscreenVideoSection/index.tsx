'use client'

import { FC, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Section } from '../Section'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PlayButton } from '../PlayButton'
import { VIDEO_SRC } from '@/constants/video'

export const FullscreenVideoSection: FC = () => {
	gsap.registerPlugin(ScrollTrigger)
	const contain = useRef(null)
	const wrapper = useRef<HTMLDivElement>(null)
	const video = useRef<HTMLVideoElement>(null)
	const button = useRef<HTMLDivElement>(null)

	useGSAP(
		() => {
			const stBasic = ScrollTrigger.create({
				trigger: contain.current,
				start: 'top bottom',
				end: 'top 50%',
				once: true,
				onEnter: () => {
					ScrollTrigger.refresh()
				},
			})

			const mm = gsap.matchMedia()
			let tl: GSAPTimeline
			let tl2: GSAPTimeline
			let tl3: GSAPTimeline

			// desktop setup code here...
			mm.add('(width > 1023px)', () => {
				// reveal play-button
				tl = gsap
					.timeline({
						scrollTrigger: {
							trigger: contain.current,
							start: 'top 40%',
							end: 'bottom top',
							once: true,
						},
					})
					.to(button.current, {
						opacity: 1,
						duration: 1,
						ease: 'none',
					})

				// video parallax
				gsap.set(video.current, { scale: 1.1 })
				gsap.set(wrapper.current, { yPercent: -100 })

				tl2 = gsap
					.timeline({
						defaults: {
							ease: 'none',
						},
						scrollTrigger: {
							trigger: contain.current,
							start: 'top bottom',
							end: 'top top',
							scrub: true,
						},
					})
					.to(wrapper.current, { yPercent: 0 })

				// video crop
				tl3 = gsap
					.timeline({
						defaults: {
							ease: 'none',
						},
						scrollTrigger: {
							trigger: contain.current,
							start: 'top top',
							end: 'bottom top',
							scrub: true,
						},
					})
					.fromTo(
						wrapper.current,
						{ clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)' },
						{ clipPath: 'polygon(10% 90%, 90% 90%, 90% 10%, 10% 10%)' },
					)
			})

			// mobile setup code here...
			mm.add('(width < 1024px)', () => {
				// reveal play-button
				tl = gsap
					.timeline({
						scrollTrigger: {
							trigger: contain.current,
							start: 'top 70%',
							end: 'bottom top',
							once: true,
						},
					})
					.to(button.current, {
						opacity: 1,
						duration: 1,
						ease: 'none',
					})

				// video parallax
				tl2 = gsap
					.timeline({
						defaults: {
							ease: 'none',
						},
						scrollTrigger: {
							trigger: contain.current,
							start: 'top 10%',
							end: 'bottom 10%',
							scrub: true,
						},
					})
					.to(video.current, { scale: 1.2 })
			})

			// stop video on leave
			const st = ScrollTrigger.create({
				trigger: contain.current,
				start: 'top bottom',
				end: 'bottom top',
				onEnter: () => {
					if (video && video.current) video.current.play()
				},
				onLeave: () => {
					if (video && video.current) video.current.pause()
				},
				onEnterBack: () => {
					if (video && video.current) video.current.play()
				},
				onLeaveBack: () => {
					if (video && video.current) video.current.pause()
				},
			})

			return () => {
				if (tl) tl.kill()
				if (tl2) tl2.kill()
				if (tl3) tl3.kill()
				st.kill()
				stBasic.kill()
			}
		},
		{ scope: contain },
	)

	return (
		<Section className="video-fullscreen lg:h-screen pt-0 pb-0 xl:pt-0 xl:pb-0 1440:pt-0 1440:pb-0">
			<h2 className="visually-hidden">Video section</h2>
			<div
				ref={contain}
				className="h-full w-full relative px-6 lg:px-0 overflow-hidden"
			>
				<div
					className="w-full lg:h-full min-h-[35rem] aspect-ratio-holder aspect-ratio-1280-676"
					ref={wrapper}
				>
					<video
						ref={video}
						className="cropped-media select-none"
						width="1280"
						height="676"
						muted
						loop
						playsInline
						preload="none"
					>
						<source src="/videos/cloudy-sky-stock-footage-weather.mp4" />
						Your browser does not support the video tag.
					</video>
					<div className="absolute left-0 top-0 w-full h-full bg-black opacity-20 pointer-events-none"></div>
					<div
						className="absolute left-0 top-0 w-full h-full bg-repeat opacity-50 pointer-events-none"
						style={{ backgroundImage: 'url(/images/noise.png)' }}
					></div>
					<div ref={button} className="absolute-center opacity-0">
						<PlayButton
							videoSrc={VIDEO_SRC}
							videos={video.current ? [video.current] : []}
						/>
					</div>
				</div>
			</div>
		</Section>
	)
}
