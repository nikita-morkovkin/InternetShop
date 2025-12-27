import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { STORE_URL } from '@/config/url.config'
import { colorService } from '@/services/color.service'
import type { IColorInput } from '@/shared/types/color.interface'

export const useUpdateColor = () => {
	const queryClient = useQueryClient()
	const params = useParams<{ storeId: string }>()
	const { push } = useRouter()

	const { mutate: updateColor, isPending: isUpdateColorLoading } = useMutation({
		mutationKey: ['update color', params.storeId],
		mutationFn: (data: IColorInput) =>
			colorService.update(params.storeId, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['colors', params.storeId] })
			toast.success('Цвет обновлен')
			push(STORE_URL.colors(params.storeId))
		},
		onError: () => {
			toast.error('Ошибка при обновлении цвета')
		}
	})

	return useMemo(
		() => ({ updateColor, isUpdateColorLoading }),
		[updateColor, isUpdateColorLoading]
	)
}
