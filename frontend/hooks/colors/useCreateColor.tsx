import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { STORE_URL } from '@/config/url.config'
import { colorService } from '@/services/color.service'
import type { IColorInput } from '@/shared/types/color.interface'

export const useCreateColor = () => {
	const queryClient = useQueryClient()
	const params = useParams<{ storeId: string }>()
	const { push } = useRouter()

	const { mutate: createColor, isPending: isCreateColorLoading } = useMutation({
		mutationKey: ['create color', params.storeId],
		mutationFn: (data: IColorInput) =>
			colorService.create(data, params.storeId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['colors', params.storeId] })
			toast.success('Цвет создан')
			push(STORE_URL.colors(params.storeId))
		},
		onError: () => {
			toast.error('Ошибка при создании цвета')
		}
	})

	return useMemo(
		() => ({ createColor, isCreateColorLoading }),
		[createColor, isCreateColorLoading]
	)
}
