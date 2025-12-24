import { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/constants/seo.constant'
import Store from './Store'

const metadata: Metadata = {
	title: 'Управление магазином',
	...NO_INDEX_PAGE
}

const StorePage = () => {
	return (
		<div>
			<Store />
		</div>
	)
}

export default StorePage
