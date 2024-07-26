import { Navigation, Pagination } from 'swiper/modules'
import { SwiperOptions } from 'swiper/types'

export const swiperOptions: SwiperOptions = {
	navigation: {
		nextEl: null,
		prevEl: null,
	},
	breakpoints: {
		320: {
			slidesPerView: 1,
		},
		575: {
			slidesPerGroup: 1,
			slidesPerView: 3,
		},
	},
	pagination: {
		type: 'bullets',
		clickable: true,
		el: '[data-gallery-pagination]',
	},
	spaceBetween: 16,
	modules: [Navigation, Pagination],
}
