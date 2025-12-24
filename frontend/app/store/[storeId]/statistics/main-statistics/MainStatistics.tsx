import { useGetMainStatistics } from '@/app/hooks/queries/useGetStatistics'
import MainStatisticsItem from './MainStatisticsItem'

const MainStatistics = () => {
	const { mainStatistics, isLoading, error } = useGetMainStatistics()

	if (isLoading) {
		return (
			<div className='flex items-center justify-center py-8'>
				<div className='text-muted-foreground'>Загрузка статистики...</div>
			</div>
		)
	}

	if (error) {
		return (
			<div className='flex items-center justify-center py-8'>
				<div className='text-destructive'>
					Ошибка при загрузке статистики: {error.message}
				</div>
			</div>
		)
	}

	if (!mainStatistics || mainStatistics.length === 0) {
		return (
			<div className='flex items-center justify-center py-8'>
				<div className='text-muted-foreground'>Статистика недоступна</div>
			</div>
		)
	}

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
			{mainStatistics.map((mainStatisticsItem) => (
				<MainStatisticsItem
					key={mainStatisticsItem.id}
					item={mainStatisticsItem}
				/>
			))}
		</div>
	)
}

export default MainStatistics
