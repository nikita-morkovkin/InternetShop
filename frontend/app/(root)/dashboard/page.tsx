import type { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/constants/seo.constant'

const metadata: Metadata = {
	title: 'Личный кабинет',
	...NO_INDEX_PAGE
}

const DashboardPage = () => {
	return <DashboardPage />
}

export default DashboardPage
