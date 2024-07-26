'use client'

import { LENIS_LERP } from '@/constants/lenis'
import { ReactLenis } from 'lenis/react'

function SmoothScrolling({ children }: { children: React.ReactNode }) {
	return (
		<ReactLenis root options={{ lerp: LENIS_LERP }}>
			{children}
		</ReactLenis>
	)
}

export default SmoothScrolling
