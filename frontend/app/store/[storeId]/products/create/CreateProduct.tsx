'use client'

import Heading from '@/components/ui/Heading'
import { useGetCategories } from '@/hooks/categories/useGetCategories'
import { useGetColors } from '@/hooks/colors/useGetColors'
import styles from './CreateProduct.module.scss'
import ProductForm from './ProductForm'

const CreateProduct = () => {
	const { categories } = useGetCategories()
	const { colors } = useGetColors()

	return (
		<div className={styles.wrapper}>
			<div className={styles.heading}>
				<Heading
					className={styles.heading}
					title='Создание товара'
					description='Создайте новый товар для вашего магазина'
				/>
			</div>
			<div>
				<ProductForm categories={categories || []} colors={colors || []} />
			</div>
		</div>
	)
}

export default CreateProduct
