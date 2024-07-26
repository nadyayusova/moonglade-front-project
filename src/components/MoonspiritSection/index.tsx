'use client'

import { FC, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Section } from '../Section'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MoonspiritBg } from './MoonspiritBg'
import { MoonspiritText } from './MoonspiritText'
import { MoonspiritTitle } from './MoonspiritTitle'
import { MoonspiritFrame } from './MoonspiritFrame'
import { frameData } from './frame-data'
import { MoonspiritTitleStatic } from './MoonspiritTitleStatic'

export const MoonspiritSection: FC = () => {
	gsap.registerPlugin(ScrollTrigger)
	const contain = useRef(null)
	const gallery = useRef<HTMLDivElement>(null)
	const [localCoords, setLocalCoords] = useState<{ x: number; y: number }[]>([
		{ x: 0, y: 0 },
	])
	const [isTouchDevice, setIsTouchDevice] = useState(false)
	const currentFrame = useRef<number>(-1)
	const masks = useRef<HTMLDivElement[]>([])
	const wrappers = useRef<HTMLDivElement[]>([])

	const handleWindowResize = () => {
		wrappers.current.forEach((wrapper, index) => {
			// set mask size
			gsap.set(masks.current[index], {
				width: wrapper.offsetWidth * 0.45,
				height: wrapper.offsetWidth * 0.45,
			})
		})
	}

	const handleMouseMove = (evt: any) => {
		if (currentFrame.current >= 0) {
			const parent = evt.target.closest('[data-image-wrapper]')
			const rect = parent.getBoundingClientRect()

			// 👇️ Get the mouse position relative to the element
			const newCoords: { x: number; y: number } = {
				x: evt.clientX - rect.x,
				y: evt.clientY - rect.y,
			}

			const newState: { x: number; y: number }[] = [...localCoords]

			newState[currentFrame.current] = newCoords
			setLocalCoords(newState)
		}
	}

	const handleMouseLeave = (evt: any) => {
		const parent = evt.target.closest('[data-photo-frame]')
		if (parent) {
			const mask = parent.querySelector('[data-mask]')

			if (mask) {
				// light disappearing
				gsap.to(mask, {
					autoAlpha: 0,
					scale: 0,
					duration: 0.3,
					ease: 'power1.in',
				})
			}
		}

		// clear hovered frame
		currentFrame.current = -1
	}

	const handleMouseEnter = (evt: any) => {
		// set hovered frame
		const parent = evt.target.closest('[data-photo-frame]')
		if (parent) {
			const frameNumber = parent.dataset.photoFrame

			if (frameNumber >= 0) {
				currentFrame.current = frameNumber

				// light revealing
				const mask = parent.querySelector('[data-mask]')

				const imageWrapper = parent.querySelector('[data-image-wrapper]')
				const rect = imageWrapper.getBoundingClientRect()
				const x = evt.clientX - rect.x
				const y = evt.clientY - rect.y

				gsap.set(mask, {
					x: x,
					y: y,
				})

				gsap.to(mask, {
					autoAlpha: 1,
					scale: 1,
					duration: 0.3,
					ease: 'power1.in',
				})
			}
		}
	}

	useGSAP(
		() => {
			setIsTouchDevice(ScrollTrigger.isTouch === 1)
			const stBasic = ScrollTrigger.create({
				trigger: contain.current,
				start: 'top bottom',
				end: 'top 50%',
				once: true,
				onEnter: () => {
					ScrollTrigger.refresh()
				},
			})

			const smallText = gsap.utils.toArray('[data-small-text]')
			const lines = gsap.utils.toArray('.shift-word')
			const frames: HTMLDivElement[] = gsap.utils.toArray('[data-photo-frame]')
			wrappers.current = gsap.utils.toArray('[data-image-wrapper]')
			const letters: HTMLDivElement[] = gsap.utils.toArray('.letter')
			const lettersStatic: HTMLDivElement[] =
				gsap.utils.toArray('.letter-static')

			const tls: GSAPTimeline[] = []
			const sts: ScrollTrigger[] = []

			// fill the array of coordinates and set masks size
			masks.current = gsap.utils.toArray('[data-mask]')
			if (masks.current.length) {
				const state: { x: number; y: number }[] = []
				masks.current.forEach(() => {
					state.push({ x: 0, y: 0 })
				})
				setLocalCoords(state)
				handleWindowResize()
				window.addEventListener('resize', handleWindowResize)
			}

			// reveal text
			const tl = gsap
				.timeline({
					defaults: { ease: 'none' },
					scrollTrigger: {
						trigger: '[data-text-block]',
						start: 'top 80%',
						once: true,
					},
				})
				.fromTo(
					smallText,
					{ opacity: 0, yPercent: 50 },
					{ opacity: 1, yPercent: 0 },
				)
				.to(lines, { y: 0, stagger: 0.02 }, 0)

			tls.push(tl)

			// images parallax
			wrappers.current.forEach((wrapper) => {
				const q = gsap.utils.selector(wrapper)

				const tl2 = gsap
					.timeline({
						defaults: { ease: 'none' },
						scrollTrigger: {
							trigger: wrapper,
							start: 'top bottom',
							end: 'bottom top',
							scrub: true,
						},
					})
					.fromTo(q('[data-image]'), { yPercent: -8 }, { yPercent: 8 })

				tls.push(tl2)
			})

			// letters reveal wide desktop
			if (letters.length) {
				const tl4 = gsap
					.timeline({ paused: true })
					.to('.letter', { opacity: 0, duration: 0.01, ease: 'none' })
					.to('.letter', {
						autoAlpha: 1,
						stagger: {
							each: 0.05,
							from: 'center',
						},
						ease: 'none',
					})

				const st = ScrollTrigger.create({
					id: 'letters-reveal-desktop',
					trigger: gallery.current,
					start: 'top center',
					end: 'bottom center',
					onEnter: () => tl4.restart(),
					onLeave: () => tl4.reverse(),
					onEnterBack: () => tl4.restart(),
					onLeaveBack: () => tl4.reverse(),
				})

				tls.push(tl4)
				sts.push(st)
			}

			// letters reveal narrow desktop/mobile
			if (lettersStatic.length) {
				const tl5 = gsap
					.timeline({
						scrollTrigger: {
							trigger: '[data-title-static]',
							start: 'top 90%',
							once: true,
						},
					})
					.to('.letter-static', {
						autoAlpha: 1,
						stagger: {
							each: 0.05,
							from: 'center',
						},
						ease: 'none',
					})

				tls.push(tl5)
			}

			const mm = gsap.matchMedia()

			// desktop setup code here...
			mm.add('(min-width: 1280px)', () => {
				// frames parallax
				frames.forEach((frame) => {
					const tl3 = gsap
						.timeline({
							defaults: { ease: 'none' },
							scrollTrigger: {
								trigger: frame,
								start: 'top bottom',
								end: 'bottom top',
								scrub: true,
							},
						})
						.fromTo(
							frame,
							{ yPercent: (_, elem) => elem.dataset.from * 2 || 0 },
							{ yPercent: (_, elem) => elem.dataset.to || 0 },
							0,
						)

					tls.push(tl3)
				})
			})

			return () => {
				tls.forEach((tl) => tl.kill())
				sts.forEach((st) => st.kill())
				stBasic.kill()
				window.removeEventListener('resize', handleWindowResize)
			}
		},
		{ scope: contain },
	)

	useGSAP(
		() => {
			// light movement
			if (masks.current.length && currentFrame.current >= 0) {
				const mask = masks.current[currentFrame.current] as HTMLDivElement

				const xTo = gsap.quickTo(mask, 'x', { duration: 1, ease: 'power3' })
				const yTo = gsap.quickTo(mask, 'y', { duration: 1, ease: 'power3' })

				xTo(localCoords[currentFrame.current].x)
				yTo(localCoords[currentFrame.current].y)
			}
		},
		{ scope: contain, dependencies: [localCoords] },
	)

	return (
		<Section className="moonspirit">
			<h2 className="visually-hidden">Moonspirit - section with photos</h2>
			<div className="container" ref={contain}>
				<MoonspiritBg />
				<MoonspiritText />
				<MoonspiritTitle />
				<MoonspiritTitleStatic />
				<div
					className="grid gap-x-0 gap-y-[5rem] md:gap-y-[10rem]"
					data-photo-gallery
					ref={gallery}
				>
					{frameData.map((frame) => (
						<MoonspiritFrame
							key={frame.id}
							{...frame}
							onMouseMove={isTouchDevice ? undefined : handleMouseMove}
							onMouseEnter={isTouchDevice ? undefined : handleMouseEnter}
							onMouseLeave={isTouchDevice ? undefined : handleMouseLeave}
						/>
					))}
				</div>
			</div>
		</Section>
	)
}
