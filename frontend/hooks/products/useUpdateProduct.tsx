import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { STORE_URL } from '@/config/url.config'
import { productService } from '@/services/product.service'
import type { IProductInput } from '@/shared/types/product.interface'

export const useUpdateProduct = () => {
	const params = useParams<{ storeId: string }>()
	const queryClient = useQueryClient()
	const { push } = useRouter()

	const { data: updateProduct, isPending: isUpdateProductLoading } =
		useMutation({
			mutationKey: ['update product', params.storeId],
			mutationFn: (data: IProductInput) =>
				productService.update(params.storeId, data),
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: ['products', params.storeId]
				})
				toast.success('Продукт обновлен')
				push(STORE_URL.products(params.storeId))
			},
			onError: () => {
				toast.error('Ошибка при обновлении продукта')
			}
		})

	return useMemo(
		() => ({ updateProduct, isUpdateProductLoading }),
		[updateProduct, isUpdateProductLoading]
	)
}
