'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Loading from './loading'
import { PRELOADER_PASSED_KEY } from '@/constants/sessionStorage'
import {
	HorizontalGallerySection,
	HorizontalImageSection,
	VideoSection,
	Intro,
	VerticalScaledImgSection,
	TwoVideosSection,
	FullscreenVideoSection,
	MoonspiritSection,
	SmallTextSection,
	TwoPhotosSection,
	SuperfoodSection,
	LastBlockSection,
	Footer,
	Header,
	Cookies,
} from '@/components'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HEADER_DISPLAY_THRESHOLD } from '@/constants/animations'
import { LENIS_LERP } from '@/constants/lenis'
import { Scrollbar } from '@/components'

export default function Home() {
	const [isLoading, setIsLoading] = useState(true)
	const [isPreloaderPassed, setIsPreloaderPassed] = useState(false)

	const [direction, setDirection] = useState(0)
	const [scroll, setScroll] = useState(0)
	const progress = useRef<number>(0)
	const maxScroll = useRef<number>(0)
	const [prevScroll, setPrevScroll] = useState(0)
	const contain = useRef<HTMLDivElement>(null)
	const header = useRef<any>(null)
	const slideUpMenuAnimation = useRef<GSAPTimeline | null>(null)
	const locomotiveScroll = useRef<LocomotiveScroll | null>(null)
	const stPage = useRef<ScrollTrigger | null>(null)
	const [isTouch, setIsTouch] = useState<boolean>(false)

	useGSAP(
		() => {
			setIsTouch(ScrollTrigger.isTouch === 1)

			const stBasic = ScrollTrigger.create({
				trigger: contain.current,
				start: 'top bottom',
				end: 'top 50%',
				once: true,
				onEnter: () => {
					ScrollTrigger.refresh()
				},
			})

			header.current = contain.current?.querySelector('.page-header')

			slideUpMenuAnimation.current = gsap
				.timeline({
					paused: true,
				})
				.fromTo(
					header.current,
					{ yPercent: 0, duration: 0.3, delay: 0.2, ease: 'none' },
					{ yPercent: -110 },
				)

			stPage.current = ScrollTrigger.create({
				id: 'PageScroll',
				trigger: contain.current,
				start: 'top top',
				end: 'bottom bottom',
				invalidateOnRefresh: true,
				onRefresh: (self) => {
					maxScroll.current = self.end
				},
				onUpdate: (self) => {
					progress.current = self.progress

					setDirection((prev) => {
						const dirChanged = prev != self.direction
						if (dirChanged) {
							setPrevScroll(self.scroll())
						}
						return self.direction
					})

					setScroll(self.scroll())
				},
			})

			maxScroll.current = stPage.current.end

			return () => {
				stBasic.kill()
				if (stPage) stPage.current?.kill()
			}
		},
		{ scope: contain },
	)

	useEffect(() => {
		if (direction === -1 && prevScroll - scroll > HEADER_DISPLAY_THRESHOLD) {
			slideUpMenuAnimation.current?.reverse()
		}
		if (direction === 1 && scroll - prevScroll > HEADER_DISPLAY_THRESHOLD) {
			slideUpMenuAnimation.current?.play()
		}
	}, [scroll, prevScroll, direction])

	useEffect(() => {
		const key = Boolean(sessionStorage.getItem(PRELOADER_PASSED_KEY))
		setIsLoading(!key)
		setIsPreloaderPassed(key)
	}, [])

	useLayoutEffect(() => {
		;(async () => {
			if (!isTouch) {
				const LocomotiveScroll = (await import('locomotive-scroll')).default
				locomotiveScroll.current = new LocomotiveScroll({ lerp: LENIS_LERP })
			}
		})()
	}, [isTouch])

	return (
		<>
			{isLoading && !isPreloaderPassed && (
				<Loading setIsLoading={setIsLoading} />
			)}
			<div
				ref={contain}
				className={`wrapper ${
					isLoading ? 'fixed overflow-hidden' : 'relative'
				} min-h-screen min-h-svh flex flex-col`}
			>
				<Header loco={locomotiveScroll.current} />
				<main className="flex-grow">
					<Intro isPreloaderPlaying={isLoading} />
					<VideoSection />
					<HorizontalGallerySection />
					<HorizontalImageSection />
					<VerticalScaledImgSection />
					<TwoVideosSection />
					<FullscreenVideoSection />
					<MoonspiritSection />
					<SmallTextSection />
					<TwoPhotosSection />
					<SuperfoodSection />
					<LastBlockSection />
				</main>
				<Footer loco={locomotiveScroll.current} />
				<Cookies />
				{!isTouch && (
					<Scrollbar
						progress={progress.current}
						max={maxScroll.current}
						st={stPage.current}
					/>
				)}
			</div>
			<div id="modal" className="relative z-[30]" />
		</>
	)
}
