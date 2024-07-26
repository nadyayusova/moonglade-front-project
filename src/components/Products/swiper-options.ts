import { Navigation, Pagination, FreeMode } from 'swiper/modules'
import { SwiperOptions } from 'swiper/types'

export const swiperOptions: SwiperOptions = {
	navigation: {
		nextEl: null,
		prevEl: null,
	},
	slidesPerView: 1,
	spaceBetween: 16,
	breakpoints: {
		0: {
			slidesPerView: 1,
			slidesPerGroup: 1,
			spaceBetween: 16,
			freeMode: false,
			pagination: {
				enabled: true,
			},
		},
		768: {
			slidesPerView: 2,
			slidesPerGroup: 1,
			spaceBetween: 16,
			freeMode: false,
			pagination: {
				enabled: true,
			},
		},
		1024: {
			slidesPerView: 'auto',
			spaceBetween: 45,
			updateOnWindowResize: true,
			// freemode is not restored after changing backpoints
			// without explicitly specifying all the settings
			freeMode: {
				enabled: true,
				sticky: false,
				momentum: true,
				momentumRatio: 1,
				momentumVelocityRatio: 1,
				momentumBounce: true,
				momentumBounceRatio: 1,
			},
			pagination: {
				enabled: false,
			},
		},
	},
	pagination: {
		type: 'bullets',
		clickable: true,
		el: '[data-products-pagination]',
	},
	modules: [Navigation, Pagination, FreeMode],
}
