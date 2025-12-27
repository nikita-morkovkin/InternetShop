import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { STORE_URL } from '@/config/url.config'
import { productService } from '@/services/product.service'

export const useDeleteProduct = () => {
	const params = useParams<{ storeId: string }>()
	const queryClient = useQueryClient()
	const { push } = useRouter()

	const { mutate: deleteProduct, isPending: isDeleteProductLoading } =
		useMutation({
			mutationKey: ['delete product', params.storeId],
			mutationFn: (id: string) => productService.delete(id),
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: ['products', params.storeId]
				})
				toast.success('Продукт удален')
				push(STORE_URL.products(params.storeId))
			},
			onError: () => {
				toast.error('Ошибка при удалении продукта')
			}
		})

	return useMemo(
		() => ({ deleteProduct, isDeleteProductLoading }),
		[deleteProduct, isDeleteProductLoading]
	)
}
