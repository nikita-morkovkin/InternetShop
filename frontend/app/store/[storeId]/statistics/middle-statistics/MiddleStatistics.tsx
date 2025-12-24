import { useGetMiddleStatistics } from '@/app/hooks/queries/useGetStatistics'
import LastUsers from './LastUsers'
import styles from './MiddleStatistics.module.scss'
import Overview from './Overview'

const MiddleStatistics = () => {
	const { middleStatistics } = useGetMiddleStatistics()

	return (
		<div className={styles.middle}>
			<div className={styles.overview}>
				<Overview data={middleStatistics?.monthlySales || []} />
			</div>
			<div>
				<LastUsers data={middleStatistics?.lastUsers || []} />
			</div>
		</div>
	)
}

export default MiddleStatistics
