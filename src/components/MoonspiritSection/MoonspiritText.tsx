'use client'

import { FC } from 'react'

export const MoonspiritText: FC = () => {
	return (
		<div
			className="relative md:grid md:grid-cols-12 mb-20 md:mb-40 lg:pt-40 xl:mb-60"
			data-text-block
		>
			<div className="md:col-start-3 md:col-span-9 xl:col-start-4 xl:col-span-8">
				<p
					className="mt-0 mb-8 uppercase text-[0.8rem] md:text-[1.3rem]"
					data-small-text
				>
					Moon InSpiration
				</p>
				<div className="mb-[1.5em] text-[2rem] md:text-[3rem] lg:text-[4.4rem] text-gray font-moonglade leading-none">
					<div className="clip-words relative">
						<span className="shift-word inline-block">
							Mooonglade is a lifestyle brand
						</span>
					</div>
					<div className="clip-words relative">
						<span className="shift-word inline-block">
							inspired by surfing, traveling, and
						</span>
					</div>
					<div className="clip-words relative">
						<span className="shift-word inline-block">
							performing arts. Our mission is to
						</span>
					</div>
					<div className="clip-words relative">
						<span className="shift-word inline-block">
							show conscious, sustainable, and
						</span>
					</div>
					<div className="clip-words relative">
						<span className="shift-word inline-block">
							healthy way of living. We believe that
						</span>
					</div>
					<div className="clip-words relative">
						<span className="shift-word inline-block">
							by connecting with yourself, other
						</span>
					</div>
					<div className="clip-words relative">
						<span className="shift-word inline-block">
							humans, and our planet, you can{' '}
						</span>
					</div>
					<div className="clip-words relative">
						<span className="shift-word inline-block">
							unlock your full potential.
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}
