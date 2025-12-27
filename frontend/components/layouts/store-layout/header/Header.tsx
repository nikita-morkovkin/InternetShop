'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useProfile } from '@/hooks/useProfile'
import Loader from '@/components/ui/Loader'
import { DASHBOARD_URL } from '@/config/url.config'
import StoreSwitcher from '../StoreSwitcher'
import MobileSidebar from '../sidebar/MobileSidebar'
import styles from './Header.module.scss'

const Header = () => {
	const { user, isLoading, error } = useProfile()
	const router = useRouter()

	useEffect(() => {
		if (!isLoading && (!user || error)) {
			router.push('/auth')
		}
	}, [user, isLoading, error, router])

	if (isLoading) {
		return (
			<div className={styles.header}>
				<MobileSidebar />
				<div className={styles.header__menu}>
					<Loader size={'sm'} />
				</div>
			</div>
		)
	}

	if (!user) {
		return null
	}

	return (
		<div className={styles.header}>
			<MobileSidebar />
			<div className={styles.header__menu}>
				<StoreSwitcher storeItems={user.stores} />
				<Link href={DASHBOARD_URL.home()}>
					<Image src={user.avatar} alt={user.name} width={42} height={42} />
				</Link>
			</div>
		</div>
	)
}

export default Header
