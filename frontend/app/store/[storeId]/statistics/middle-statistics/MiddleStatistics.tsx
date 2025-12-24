import { useGetMiddleStatistics } from '@/app/hooks/queries/useGetStatistics'
import { Skeleton } from '@/components/ui/skeleton'
import LastUsers from './LastUsers'
import styles from './MiddleStatistics.module.scss'
import Overview from './Overview'

const MiddleStatistics = () => {
	const { middleStatistics, isLoading } = useGetMiddleStatistics()

	if (isLoading) {
		return (
			<div className={styles.middle}>
				<Skeleton className='h-[400px] w-full' />
				<Skeleton className='h-[400px] w-full' />
			</div>
		)
	}

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
