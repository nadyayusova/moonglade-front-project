'use client'

import { FC, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Section } from '../Section'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export const SmallTextSection: FC = () => {
	gsap.registerPlugin(ScrollTrigger)
	const contain = useRef(null)

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

			const lines: HTMLElement[] = gsap.utils.toArray('[data-text-line]')

			lines.forEach((line) => {
				const letters = gsap.utils.toArray(line.querySelectorAll('span'))

				gsap.to(letters, {
					opacity: 1,
					stagger: {
						each: 0.05,
						from: 'center',
					},
					scrollTrigger: {
						trigger: contain.current,
						start: 'top 90%',
						once: true,
					},
				})
			})

			return () => {
				stBasic.kill()
			}
		},
		{ scope: contain },
	)

	return (
		<Section className="text">
			<div className="container md:grid md:grid-cols-12" ref={contain}>
				<div className="md:col-span-10 md:col-start-2 flex justify-center">
					<h2 className="visually-hidden">Ride in a state of yin</h2>
					<div className="font-moonglade text-[2.4rem] md:text-[5rem] lg:text-[7rem] leading-[1.1] uppercase">
						<div className="relative text-start" data-text-line>
							<span className="inline-block opacity-0">R</span>{' '}
							<span className="inline-block opacity-0">I</span>
							<span className="inline-block opacity-0">D</span>
							<span className="inline-block opacity-0">E</span>
							<span className="inline-block opacity-0">&nbsp;</span>
							<span className="inline-block opacity-0">I</span>
							<span className="inline-block opacity-0">N</span>
						</div>
						<div className="relative pl-[15%] text-start" data-text-line>
							<span className="inline-block opacity-0">A</span>
							<span className="inline-block opacity-0">&nbsp;</span>
							<span className="inline-block opacity-0">S</span>
							<span className="inline-block opacity-0">T</span>
							<span className="inline-block opacity-0">A</span>{' '}
							<span className="inline-block opacity-0">T</span>{' '}
							<span className="inline-block opacity-0">E</span>
							<span className="inline-block opacity-0">&nbsp;</span>
							<span className="inline-block opacity-0">O</span>
							<span className="inline-block opacity-0">F</span>
							<span className="inline-block opacity-0">&nbsp;</span>{' '}
							<span className="inline-block opacity-0">Y</span>{' '}
							<span className="inline-block opacity-0">I</span>
							<span className="inline-block opacity-0">N</span>
							<span className="inline-block opacity-0">’</span>
						</div>
					</div>
				</div>
			</div>
		</Section>
	)
}
