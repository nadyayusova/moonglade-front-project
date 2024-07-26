'use client'

import { FC } from 'react'

export const MoonspiritTitleStatic: FC = () => {
	return (
		<div className="mb-20 xl:hidden">
			<div
				className="relative font-moonglade text-[3.5rem] md:text-[7rem] lg:text-[10rem] xl:text-[12rem] leading-[1.1] text-center uppercase"
				data-title-static
			>
				<span className="letter-static opacity-0 invisible">M</span>
				<span className="letter-static opacity-0 invisible">O</span>
				<span className="letter-static opacity-0 invisible">O</span>
				<span className="letter-static opacity-0 invisible">N</span>{' '}
				<span className="letter-static opacity-0 invisible">S</span>
				<span className="letter-static opacity-0 invisible">P</span>
				<span className="letter-static opacity-0 invisible">I</span>
				<span className="letter-static opacity-0 invisible">R</span>
				<span className="letter-static opacity-0 invisible">I</span>
				<span className="letter-static opacity-0 invisible">T</span>
			</div>
		</div>
	)
}
