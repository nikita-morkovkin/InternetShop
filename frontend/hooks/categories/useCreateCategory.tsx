import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { STORE_URL } from '@/config/url.config'
import { categoryService } from '@/services/category.service'
import type { ICategoryInput } from '@/shared/types/category.interface'

export const useCreateCategory = () => {
	const queryClient = useQueryClient()
	const params = useParams<{ storeId: string }>()
	const { push } = useRouter()

	const { mutate: createCategory, isPending: isCreateCategoryLoading } =
		useMutation({
			mutationKey: ['create category', params.storeId],
			mutationFn: (data: ICategoryInput) =>
				categoryService.create(data, params.storeId),
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: ['categories', params.storeId]
				})
				toast.success('Категория создана')
				push(STORE_URL.categories(params.storeId))
			},
			onError: () => {
				toast.error('Ошибка при создании категории')
			}
		})

	return useMemo(
		() => ({ createCategory, isCreateCategoryLoading }),
		[createCategory, isCreateCategoryLoading]
	)
}
