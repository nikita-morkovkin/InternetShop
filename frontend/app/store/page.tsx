import { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/constants/seo.constant'

const metadata: Metadata = {
	title: 'Управление магазином',
	...NO_INDEX_PAGE
}

const StorePage = () => {
	return <div>page</div>
}

export default StorePage
