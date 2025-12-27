import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { STORE_URL } from '@/config/url.config'
import { categoryService } from '@/services/category.service'
import type { ICategoryInput } from '@/shared/types/category.interface'

export const useUpdateCategory = () => {
	const params = useParams<{ storeId: string }>()
	const queryClient = useQueryClient()
	const { push } = useRouter()

	const { mutate: updateCategory, isPending: isUpdateCategoryLoading } =
		useMutation({
			mutationKey: ['update category', params.storeId],
			mutationFn: (data: ICategoryInput) =>
				categoryService.update(params.storeId, data),
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: ['categories', params.storeId]
				})
				toast.success('Категория обновлена')
				push(STORE_URL.categories(params.storeId))
			}
		})

	return useMemo(
		() => ({ updateCategory, isUpdateCategoryLoading }),
		[updateCategory, isUpdateCategoryLoading]
	)
}
