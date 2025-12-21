'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Navigation.module.scss'
import { IMenuItem } from './menu.interface'
import { cn } from '@/lib/utils'

interface MenuItemProps {
	item: IMenuItem
}

const MenuItem = ({ item }: MenuItemProps) => {
	const pathname = usePathname()

	return (
		<Link
			href={item.link}
			className={cn(styles.route, {
				[styles.active]: pathname === item.link
			})}
		>
			<item.icon />
			{item.value}
		</Link>
	)
}

export default MenuItem
