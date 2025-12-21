import Image from 'next/image'
import Link from 'next/link'
import { PUBLIC_URL } from '@/app/config/url.config'
import { SITE_NAME } from '@/constants/seo.constant'
import logoSvg from '../../../../../public/images/auth.svg'
import styles from './Logo.module.scss'

const Logo = () => {
	return (
		<Link href={PUBLIC_URL.home()} className={styles.logo}>
			<Image src={logoSvg} alt={SITE_NAME} />
			<div>{SITE_NAME}</div>
		</Link>
	)
}

export default Logo
