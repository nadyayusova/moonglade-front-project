'use client'

import Link from 'next/link'
import { FC, HTMLProps } from 'react'

interface FlipButtonProps extends HTMLProps<HTMLAnchorElement> {
	ariaLabel?: string
	dataVideoLink?: string
	onClick?: any
}

export const FlipButton: FC<FlipButtonProps> = ({
	className,
	children,
	href,
	ariaLabel,
	dataVideoLink,
	onClick,
}) => {
	if (href) {
		return (
			<Link
				href={href}
				className={`btn flip-btn ${className}`}
				target="_blank"
				rel="noopener, nofollow, noreferrer"
				aria-label={ariaLabel}
			>
				{children}
			</Link>
		)
	}

	return (
		<button
			className={`btn flip-btn ${className}`}
			type="button"
			aria-label={ariaLabel}
			data-video-link={dataVideoLink}
			onClick={onClick}
		>
			{children}
		</button>
	)
}
