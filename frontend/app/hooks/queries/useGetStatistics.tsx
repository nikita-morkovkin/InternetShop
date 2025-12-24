import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import { statisticsService } from '@/services/statistics.service'

export function useGetMainStatistics() {
	const params = useParams<{ storeId: string }>()

	const {
		data: mainStatistics,
		isLoading,
		error
	} = useQuery({
		queryKey: ['main statistics'],
		queryFn: () => statisticsService.getMainStatistics(params.storeId)
	})

	return useMemo(
		() => ({ mainStatistics, isLoading, error }),
		[mainStatistics, isLoading, error]
	)
}

export function useGetMiddleStatistics() {
	const params = useParams<{ storeId: string }>()

	const {
		data: middleStatistics,
		isLoading,
		error
	} = useQuery({
		queryKey: ['middle statistics', params.storeId],
		queryFn: () => statisticsService.getMiddleStatistics(params.storeId)
	})

	return useMemo(
		() => ({ middleStatistics, isLoading, error }),
		[middleStatistics, isLoading, error]
	)
}
