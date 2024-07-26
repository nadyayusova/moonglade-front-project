import React from 'react'

export const Cross: React.FC<React.SVGProps<SVGSVGElement>> = () => {
	return (
		<svg
			width="10"
			height="10"
			viewBox="0 0 8 8"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M.409 7.003a.578.578 0 0 1 0-.817L6.186.408a.578.578 0 1 1 .817.817L1.226 7.003a.578.578 0 0 1-.817 0Z"
				fill="currentColor"
			></path>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M.409.409a.578.578 0 0 1 .817 0l5.777 5.777a.578.578 0 1 1-.817.817L.409 1.226a.578.578 0 0 1 0-.817Z"
				fill="currentColor"
			></path>
		</svg>
	)
}
