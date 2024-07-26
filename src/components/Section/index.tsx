'use client'

import { FC, HTMLProps } from 'react'

export const Section: FC<HTMLProps<HTMLDivElement>> = ({
	children,
	className,
}) => {
	const classes = `${className} relative py-20 xl:py-32 1440:py-40`

	return <section className={classes}>{children}</section>
}
