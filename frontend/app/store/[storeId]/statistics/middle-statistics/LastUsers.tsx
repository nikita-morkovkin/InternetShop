import Image from 'next/image'
import type { ILastUsers } from '@/app/shared/types/statistics.interface'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import styles from './MiddleStatistics.module.scss'
import formatPrice from '@/lib/utils/format-price'

interface LastUsersProps {
	data: ILastUsers[]
}

const LastUsers = ({ data }: LastUsersProps) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Последние пользователи</CardTitle>
			</CardHeader>
			<CardContent>
				{data.length > 0 ? (
					data.map((user) => (
						<div className={styles.user} key={user.id}>
							<Image
								src={user.picture}
								alt={user.name}
								width={40}
								height={40}
							/>
							<div className={styles.info}>
								<p className={styles.name}>{user.name}</p>
								<p className={styles.email}>{user.email}</p>
							</div>
							<div className={styles.total}>+{formatPrice(user.total)}</div>
						</div>
					))
				) : (
					<div>У этого магазина нет пока-что покупателей :(</div>
				)}
			</CardContent>
		</Card>
	)
}

export default LastUsers
