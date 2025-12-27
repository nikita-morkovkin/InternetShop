import type { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/constants/seo.constant'

export const metadata: Metadata = {
	title: 'Товары магазина',
	...NO_INDEX_PAGE
}

const ProductsPage = () => {
	return <div>Products Page</div>
}

export default ProductsPage
