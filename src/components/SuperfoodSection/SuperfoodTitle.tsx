'use client'

import { FC } from 'react'

export const SuperfoodTitle: FC = () => {
	return (
		<div className="mb-[3rem] lg:mb-[10rem] text-center" data-title>
			<h2 className="flex justify-center mb-8 xl:mb-10 leading-[1.1] font-moonglade text-[3.5rem] md:text-[5rem] lg:text-[10rem] uppercase">
				<span className="letter inline-block opacity-0">s</span>
				<span className="letter inline-block opacity-0">u</span>
				<span className="letter inline-block opacity-0">p</span>
				<span className="letter inline-block opacity-0">e</span>
				<span className="letter inline-block opacity-0">r</span>
				<span className="letter inline-block opacity-0">f</span>
				<span className="letter inline-block opacity-0">oo</span>
				<span className="letter inline-block opacity-0">d</span>
			</h2>
		</div>
	)
}
