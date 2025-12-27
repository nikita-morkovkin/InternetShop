import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import { colorService } from '@/services/color.service'

export const useGetColors = () => {
	const params = useParams<{ storeId: string }>()

	const { data: colors, isLoading: isColorsLoading } = useQuery({
		queryKey: ['colors', params.storeId],
		queryFn: () => colorService.getByStoreId(params.storeId)
	})

	return useMemo(() => ({ colors, isColorsLoading }), [colors, isColorsLoading])
}
