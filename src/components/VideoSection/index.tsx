'use client'

import { FC, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Section } from '../Section'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PlayButton } from '../PlayButton'
import { VIDEO_SRC } from '@/constants/video'

export const VideoSection: FC = () => {
	gsap.registerPlugin(ScrollTrigger)
	const contain = useRef<HTMLDivElement>(null)
	const video = useRef<HTMLVideoElement>(null)
	const button = useRef<HTMLDivElement>(null)
	const videos = useRef<HTMLVideoElement[]>([])

	useGSAP(
		() => {
			videos.current = gsap.utils.toArray('video')

			const stBasic = ScrollTrigger.create({
				trigger: contain.current,
				start: 'top bottom',
				end: 'top 50%',
				once: true,
				onEnter: () => {
					ScrollTrigger.refresh()
				},
			})

			// reveal play-button
			const tl = gsap
				.timeline({
					scrollTrigger: {
						trigger: button.current,
						start: 'top 80%',
						end: 'bottom top',
						once: true,
					},
				})
				.to(button.current, {
					opacity: 1,
					duration: 1,
					ease: 'none',
				})

			// stop video on leave
			const st2 = ScrollTrigger.create({
				trigger: contain.current,
				start: 'top bottom',
				end: 'bottom top',
				onEnter: () => {
					if (video && video.current) {
						video.current.play()
					}
				},
				onLeave: () => {
					if (video && video.current) {
						video.current.pause()
					}
				},
				onEnterBack: () => {
					if (video && video.current) {
						video.current.play()
					}
				},
				onLeaveBack: () => {
					if (video && video.current) {
						video.current.pause()
					}
				},
			})

			// video parallax
			const tl2 = gsap
				.timeline({
					defaults: { ease: 'none' },
					scrollTrigger: {
						trigger: video.current,
						start: 'top bottom',
						end: 'bottom top',
						scrub: true,
					},
				})
				.fromTo(video.current, { yPercent: -4.5 }, { yPercent: 4.5 })

			return () => {
				tl.kill()
				tl2.kill()
				stBasic.kill()
				st2.kill()
			}
		},
		{ scope: contain },
	)

	return (
		<Section className="video-one">
			<h2 className="visually-hidden">Video section</h2>
			<div className="container" ref={contain}>
				<div className="video-wrapper min-h-[35rem] p-0 aspect-ratio-holder aspect-ratio-1270-800">
					<video
						ref={video}
						className="cropped-media scale-110 select-none"
						width="1270"
						height="800"
						muted
						loop
						playsInline
						preload="none"
					>
						<source src="/videos/cloudy-sky-stock-footage-weather.mp4" />
						Your browser does not support the video tag.
					</video>
					<div ref={button} className="absolute-center opacity-0">
						<PlayButton videoSrc={VIDEO_SRC} videos={videos.current} />
					</div>
				</div>
			</div>
		</Section>
	)
}
