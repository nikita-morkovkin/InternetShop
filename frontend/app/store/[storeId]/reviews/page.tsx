import type { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/constants/seo.constant'

export const metadata: Metadata = {
	title: 'Отзывы магазина',
	...NO_INDEX_PAGE
}

const ReviewsPage = () => {
	return <div>Reviews Page</div>
}

export default ReviewsPage
