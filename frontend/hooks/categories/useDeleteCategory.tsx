import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { STORE_URL } from '@/config/url.config'
import { categoryService } from '@/services/category.service'

export const useDeleteCategory = () => {
	const params = useParams<{ storeId: string }>()
	const queryClient = useQueryClient()
	const { push } = useRouter()

	const { mutate: deleteCategory, isPending: isDeleteCategoryLoading } =
		useMutation({
			mutationKey: ['delete category', params.storeId],
			mutationFn: (id: string) => categoryService.delete(id),
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: ['categories', params.storeId]
				})
				toast.success('Категория удалена')
				push(STORE_URL.categories(params.storeId))
			},
			onError: () => {
				toast.error('Ошибка при удалении категории')
			}
		})

	return useMemo(
		() => ({
			deleteCategory,
			isDeleteCategoryLoading
		}),
		[deleteCategory, isDeleteCategoryLoading]
	)
}
