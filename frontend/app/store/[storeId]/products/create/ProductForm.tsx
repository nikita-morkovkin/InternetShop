import { Trash } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'
import ConfirmModal from '@/components/ui/modals/ConfirmModal'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import { Button } from '@/components/ui/shadcn/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/shadcn/form'
import { Input } from '@/components/ui/shadcn/input'
import { Textarea } from '@/components/ui/textarea'
import { useCreateProduct } from '@/hooks/products/useCreateProduct'
import { useDeleteProduct } from '@/hooks/products/useDeleteProduct'
import { useUpdateProduct } from '@/hooks/products/useUpdateProduct'
import type { ICategory } from '@/shared/types/category.interface'
import type { IColor } from '@/shared/types/color.interface'
import type { IProduct, IProductInput } from '@/shared/types/product.interface'
import styles from './ProductForm.module.scss'

interface ProductFormProps {
	product?: IProduct
	categories: ICategory[]
	colors: IColor[]
}

const ProductForm = ({ product, categories, colors }: ProductFormProps) => {
	const { createProduct, isCreateProductLoading } = useCreateProduct()
	const { updateProduct, isUpdateProductLoading } = useUpdateProduct()
	const { deleteProduct, isDeleteProductLoading } = useDeleteProduct()

	const action = product ? 'Сохранить' : 'Создать'

	const form = useForm<IProductInput>({
		mode: 'onChange',
		values: {
			title: product?.title || '',
			description: product?.description || '',
			images: product?.images || [],
			price: product?.price || 0,
			colorId: product?.color?.id || '',
			categoryId: product?.category?.id || ''
		}
	})

	const onSubmit: SubmitHandler<IProductInput> = (data) => {
		if (product) {
			updateProduct({
				...data,
				id: product.id
			})
		} else {
			createProduct(data)
		}
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.content}>
				{product && (
					<div className={styles.header}>
						<ConfirmModal handleClick={() => deleteProduct(product.id)}>
							<Button
								size={'icon'}
								variant={'default'}
								disabled={isDeleteProductLoading}
							>
								<Trash className='size-4' />
							</Button>
						</ConfirmModal>
					</div>
				)}
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
						<div className={styles.grid}>
							<FormField
								control={form.control}
								name='title'
								rules={{
									required: 'Название обязательно'
								}}
								render={({ field }) => (
									<FormItem className={styles.gridItem}>
										<FormLabel>Название</FormLabel>
										<FormControl>
											<Input
												placeholder='Название товара'
												disabled={
													isCreateProductLoading || isUpdateProductLoading
												}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='price'
								rules={{
									required: 'Цена обязательна'
								}}
								render={({ field }) => (
									<FormItem className={styles.gridItem}>
										<FormLabel>Цена</FormLabel>
										<FormControl>
											<Input
												placeholder='Цена товара'
												disabled={
													isCreateProductLoading || isUpdateProductLoading
												}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='categoryId'
								rules={{
									required: 'Категория обязательна'
								}}
								render={({ field }) => (
									<FormItem className={styles.gridItem}>
										<FormLabel>Категория товара</FormLabel>
										<Select
											onValueChange={field.onChange}
											disabled={
												isCreateProductLoading || isUpdateProductLoading
											}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Выберите категорию' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectGroup>
													{categories.map((categoryItem) => (
														<SelectItem
															value={categoryItem.id}
															key={categoryItem.id}
														>
															{categoryItem.title}
														</SelectItem>
													))}
												</SelectGroup>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='colorId'
								rules={{
									required: 'Цвет обязательна'
								}}
								render={({ field }) => (
									<FormItem className={styles.gridItem}>
										<FormLabel>Цвет товара</FormLabel>
										<Select
											onValueChange={field.onChange}
											disabled={
												isCreateProductLoading || isUpdateProductLoading
											}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Выберите цвет' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectGroup>
													{colors.map((colorItem) => (
														<SelectItem value={colorItem.id} key={colorItem.id}>
															{colorItem.value}
														</SelectItem>
													))}
												</SelectGroup>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<FormField
							control={form.control}
							name='description'
							rules={{
								required: 'Описание обязательно'
							}}
							render={({ field }) => (
								<FormItem className={styles.description}>
									<FormLabel>Описание</FormLabel>
									<FormControl>
										<Textarea
											placeholder='Описание товара'
											disabled={
												isCreateProductLoading || isUpdateProductLoading
											}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button
							variant={'default'}
							disabled={isCreateProductLoading || isUpdateProductLoading}
							type='submit'
							className={styles.button}
						>
							{action}
						</Button>
					</form>
				</Form>
			</div>
		</div>
	)
}

export default ProductForm
