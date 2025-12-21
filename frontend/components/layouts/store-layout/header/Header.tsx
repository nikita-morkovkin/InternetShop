'use client'

import Image from 'next/image'
import Link from 'next/link'
import { DASHBOARD_URL } from '@/app/config/url.config'
import { useProfile } from '@/app/hooks/useProfile'
import Loader from '@/components/ui/Loader'
import MobileSidebar from '../sidebar/MobileSidebar'
import styles from './Header.module.scss'

const Header = () => {
	const { user, isLoading } = useProfile()

	return (
		<div className={styles.header}>
			<MobileSidebar />
			<div className={styles.header__menu}>
				{isLoading ? (
					<Loader size={'sm'} />
				) : (
					user && (
						<>
							<Link href={DASHBOARD_URL.home()}>
								<Image
									src={user.avatar}
									alt={user.name}
									width={42}
									height={42}
								/>
							</Link>
						</>
					)
				)}
			</div>
		</div>
	)
}

export default Header
