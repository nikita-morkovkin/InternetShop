'use client'

import { Plus } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Heading from '@/components/ui/Heading'
import { DataTable } from '@/components/ui/data-table/DataTable'
import DataTableLoading from '@/components/ui/data-table/DataTableLoading'
import { Button } from '@/components/ui/shadcn/button'
import { STORE_URL } from '@/config/url.config'
import { useGetProducts } from '@/hooks/products/useGetProducts'
import { productsColumns, type IProductColumn } from './ProductColumns'
import styles from './Products.module.scss'

const Products = () => {
	const params = useParams<{ storeId: string }>()

	const { products, isProductsLoading } = useGetProducts()

	const formattedProducts: IProductColumn[] = products
		? products.map((product) => ({
				id: product.id,
				title: product.title,
				price: product.price.toString(),
				category: product.category.title,
				color: product.color.name,
				storeId: product.storeId
			}))
		: []

	return (
		<div className={styles.wrapper}>
			{isProductsLoading ? (
				<DataTableLoading />
			) : (
				<>
					<div className={styles.header}>
						<Heading
							title={`Товары (${products?.length})`}
							description='Все товары вашего магазина'
						/>
						<div className={styles.buttons}>
							<Link href={STORE_URL.productCreate(params.storeId)}>
								<Button variant='default'>
									<Plus className='size-4' />
									Создать товар
								</Button>
							</Link>
						</div>
					</div>
					<div className={styles.table}>
						<DataTable
							columns={productsColumns}
							data={formattedProducts}
							filterKey='title'
						/>
					</div>
				</>
			)}
		</div>
	)
}

export default Products
