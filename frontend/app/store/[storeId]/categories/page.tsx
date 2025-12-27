import type { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/constants/seo.constant'

export const metadata: Metadata = {
	title: 'Категории магазина',
	...NO_INDEX_PAGE
}

const CategoriesPage = () => {
	return <div>Categories Page</div>
}

export default CategoriesPage
