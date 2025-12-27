import type { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/constants/seo.constant'
import Settings from './Settings'

export const metadata: Metadata = {
	title: 'Настройки магазина',
	...NO_INDEX_PAGE
}

const StoreSettingsPage = () => {
	return <Settings />
}

export default StoreSettingsPage
