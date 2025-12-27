import Loader from '../Loader'
import { Card, CardContent } from '../shadcn/card'
import { Skeleton } from '../skeleton'
import styles from './DataTable.module.scss'

const DataTableLoading = () => {
	return (
		<div className={styles.loading}>
			<Skeleton className={styles.heading} />
			<Skeleton className={styles.search} />
			<Card className={styles.table}>
				<CardContent>
					<div className={styles.loader_wrapper}>
						<Loader />
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

export default DataTableLoading
