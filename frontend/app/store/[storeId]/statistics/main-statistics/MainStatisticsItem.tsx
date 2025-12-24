import CountUp from 'react-countup'
import { IMainStatistics } from '@/app/shared/types/statistics.interface'
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle
} from '@/components/ui/shadcn/card'
import styles from './MainStatistics.module.scss'
import getIcon from './statistics.util'
import formatPrice from '@/lib/utils/format-price'

interface MainStatisticsItemProps {
	item: IMainStatistics
}

const MainStatisticsItemProps = ({ item }: MainStatisticsItemProps) => {
	const Icon = getIcon(item.id)

	return (
		<Card className={styles.card}>
			<CardHeader className={styles.header}>
				<CardTitle>{item.name}</CardTitle>
				{/* Fix it later */}
				<Icon />
			</CardHeader>
			<CardContent className={styles.content}>
				<h2>
					{item.id !== 1 ? (
						<CountUp end={item.value} />
					) : (
						<CountUp end={item.value} formattingFn={formatPrice} />
					)}
				</h2>
			</CardContent>
		</Card>
	)
}

export default MainStatisticsItemProps
