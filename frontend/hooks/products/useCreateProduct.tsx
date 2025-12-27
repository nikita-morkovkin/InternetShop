import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { STORE_URL } from '@/config/url.config'
import { productService } from '@/services/product.service'
import { IProductInput } from '@/shared/types/product.interface'

export const useCreateProduct = () => {
	const params = useParams<{ storeId: string }>()
	const queryClient = useQueryClient()
	const { push } = useRouter()

	const { mutate: createProduct, isPending: isCreateProductLoading } =
		useMutation({
			mutationKey: ['create product', params.storeId],
			mutationFn: (data: IProductInput) =>
				productService.create(data, params.storeId),
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: ['products', params.storeId]
				})
				toast.success('Продукт создан')
				push(STORE_URL.products(params.storeId))
			},
			onError: () => {
				toast.error('Ошибка при создании продукта')
			}
		})

	return useMemo(
		() => ({ createProduct, isCreateProductLoading }),
		[createProduct, isCreateProductLoading]
	)
}
