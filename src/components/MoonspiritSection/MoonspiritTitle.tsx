'use client'

import { FC } from 'react'

export const MoonspiritTitle: FC = () => {
	return (
		<div className="hidden xl:fixed xl:top-0 xl:left-0 xl:w-full xl:h-full xl:flex xl:justify-center xl:items-center z-10 pointer-events-none select-none">
			<div
				className="relative font-moonglade text-[3.5rem] md:text-[7rem] lg:text-[10rem] xl:text-[12rem] leading-[1.1] text-center uppercase"
				data-title
			>
				<span className="letter opacity-0 invisible">M</span>
				<span className="letter opacity-0 invisible">O</span>
				<span className="letter opacity-0 invisible">O</span>
				<span className="letter opacity-0 invisible">N</span>{' '}
				<span className="letter opacity-0 invisible">S</span>
				<span className="letter opacity-0 invisible">P</span>
				<span className="letter opacity-0 invisible">I</span>
				<span className="letter opacity-0 invisible">R</span>
				<span className="letter opacity-0 invisible">I</span>
				<span className="letter opacity-0 invisible">T</span>
			</div>
		</div>
	)
}
