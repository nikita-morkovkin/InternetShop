import Logo from '../../main-layout/header/logo/Logo'
import Navigation from './navigation/Navigation'
import styles from './Sidebar.module.scss'

const Sidebar = () => {
	return (
		<div className={styles.sidebar}>
			<Logo />
      <Navigation />
		</div>
	)
}

export default Sidebar
