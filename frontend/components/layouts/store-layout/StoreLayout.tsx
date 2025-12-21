import type { PropsWithChildren } from 'react'
import styles from './Store-layout.module.scss'
import Header from './header/Header'
import Sidebar from './sidebar/Sidebar'

const StoreLayout = ({ children }: PropsWithChildren) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.layout}>
				<div className={styles.sidebar}>
					<Sidebar />
				</div>
				<div className={styles.header}>
					<Header />
				</div>
				<main>{children}</main>
			</div>
		</div>
	)
}

export default StoreLayout
