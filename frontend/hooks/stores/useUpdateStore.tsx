import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import { toast } from 'react-hot-toast'
import { storeService } from '@/services/store.service'
import type { IStoreEdit } from '@/shared/types/store.interface'

const useUpdateStore = () => {
	const params = useParams<{ storeId: string }>()
	const queryClient = useQueryClient()

	const { data: store } = useQuery({
		queryKey: ['store', params.storeId],
		queryFn: () => storeService.getById(params.storeId)
	})

	const { mutate: updateStore, isPending: isLoading } = useMutation({
		mutationKey: ['update store', params.storeId],
		mutationFn: (data: IStoreEdit) => storeService.update(params.storeId, data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['store', params.storeId]
			})
			queryClient.invalidateQueries({
				queryKey: ['profile']
			})
		},
		onError: () => {
			toast.error('Ошибка при обновлении магазина')
		}
	})

	return useMemo(
		() => ({ store, updateStore, isLoading }),
		[store, updateStore, isLoading]
	)
}

export default useUpdateStore
