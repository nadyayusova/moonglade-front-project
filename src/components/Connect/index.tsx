'use client'

import Link from 'next/link'
import { FC, HTMLProps } from 'react'

export const Connect: FC<HTMLProps<HTMLDivElement>> = ({ className = '' }) => {
	const classes = `connect ${className}`

	return (
		<div className={classes}>
			<p className="mb-[1.5rem] font-plain text-[20px] leading-[1.3] text-center opacity-50">
				SHARING OUR VISION?
				<br />
				JOIN MOONGLADE WORLD.
				<br />
				LETS CO-CREATE
				<br />{' '}
				<Link
					href="mailto:connect@192.168.31.103"
					className="btn btn--link text-inherit text-[20px]"
				>
					<span className="inline-block">connect@192.168.31.103</span>
				</Link>
			</p>
		</div>
	)
}
