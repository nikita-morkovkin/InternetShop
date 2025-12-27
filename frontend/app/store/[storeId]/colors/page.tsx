import type { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/constants/seo.constant'

export const metadata: Metadata = {
	title: 'Цвета магазина',
	...NO_INDEX_PAGE
}

const ColorsPage = () => {
	return <div>Colors Page</div>
}

export default ColorsPage
