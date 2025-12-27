import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { STORE_URL } from '@/config/url.config'
import { colorService } from '@/services/color.service'

export const useDeleteColor = () => {
	const queryClient = useQueryClient()
	const params = useParams<{ storeId: string }>()
	const { push } = useRouter()

	const { mutate: deleteColor, isPending: isDeleteColorLoading } = useMutation({
		mutationKey: ['delete color', params.storeId],
		mutationFn: (id: string) => colorService.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['colors', params.storeId] })
			toast.success('Цвет удален')
			push(STORE_URL.colors(params.storeId))
		},
		onError: () => {
			toast.error('Ошибка при удалении цвета')
		}
	})

	return useMemo(
		() => ({ deleteColor, isDeleteColorLoading }),
		[deleteColor, isDeleteColorLoading]
	)
}
