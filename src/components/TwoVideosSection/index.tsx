'use client'

import { FC, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Section } from '../Section'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FlipButton } from '@/components/FlipButton'
import { VideoBlock } from './VideoBlock'
import { videoData } from './video-data'

export const TwoVideosSection: FC = () => {
	gsap.registerPlugin(ScrollTrigger)
	const contain = useRef(null)
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

			const wrappers: HTMLDivElement[] = gsap.utils.toArray('[data-wrapper]')
			const tls: GSAPTimeline[] = []
			const sts: ScrollTrigger[] = []

			if (wrappers.length) {
				wrappers.forEach((wrapper) => {
					const q = gsap.utils.selector(wrapper)
					const videoWrapper = q('[data-video-wrapper]')[0]
					const video = q('[data-video-media]')[0] as HTMLVideoElement
					const button = q('[data-play-btn]')[0]
					const textBlock = q('[data-text-block]')[0]
					const smallText = q('[data-small-text]')
					const words = q('.shift-word')

					// reveal content on enter
					const tl = gsap
						.timeline({
							defaults: { ease: 'none' },
							scrollTrigger: {
								trigger: wrapper,
								start: 'top 90%',
								end: 'bottom top',
								once: true,
							},
						})
						.to(videoWrapper, {
							clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
							duration: 1,
						})
						.to(button, { opacity: 1, duration: 0.5 }, '-=25%')

					tls.push(tl)

					const tl2 = gsap
						.timeline({
							defaults: { ease: 'none' },
							scrollTrigger: {
								trigger: textBlock,
								start: 'top 90%',
								end: 'bottom top',
								once: true,
							},
						})
						.fromTo(
							smallText,
							{ opacity: 0, yPercent: 50 },
							{ opacity: 1, yPercent: 0 },
						)
						.to(words, { y: 0, stagger: 0.02 }, 0)

					tls.push(tl2)

					// video parallax
					const tl3 = gsap
						.timeline({
							defaults: { ease: 'none' },
							scrollTrigger: {
								trigger: video,
								start: 'top bottom',
								end: 'bottom top',
								scrub: true,
							},
						})
						.fromTo(video, { yPercent: -4.5 }, { yPercent: 4.5 })

					tls.push(tl3)

					// stop video on leave
					const st = ScrollTrigger.create({
						trigger: video,
						start: 'top bottom',
						end: 'bottom top',
						onEnter: () => video.play(),
						onLeave: () => video.pause(),
						onEnterBack: () => video.play(),
						onLeaveBack: () => video.pause(),
					})

					sts.push(st)
				})
			}

			return () => {
				tls.forEach((tl) => tl.kill())
				sts.forEach((tl) => tl.kill())
				stBasic.kill()
			}
		},
		{ scope: contain },
	)

	return (
		<Section className="video-one pt-0 xl:pt-0 1440:pt-0">
			<div ref={contain} className="md:mb-20 xl:mb-40">
				<VideoBlock {...videoData[0]} videos={videos.current} />
				<VideoBlock {...videoData[1]} videos={videos.current} />
				<div className="my-20 md:hidden text-center">
					<FlipButton
						className="flip-btn--text flip-btn--dark"
						dataVideoLink="https://share.macwel.app/wp-content/uploads/2022/09/welcome-monglade-1.mov"
					>
						<span>moonglade films</span>
					</FlipButton>
				</div>
			</div>
		</Section>
	)
}
