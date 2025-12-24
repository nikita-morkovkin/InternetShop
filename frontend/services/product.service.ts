import { axiosClassic, axiosWithAuth } from '@/app/api/api.interceptors'
import { API_URL } from '@/app/config/api.config'
import { IProduct, IProductInput } from '@/app/shared/types/product.interface'

class ProductService {
	async getAll(searchTerm: string | null) {
		const { data } = await axiosClassic<IProduct[]>({
			url: API_URL.products(),
			method: 'GET',
			params: searchTerm
				? {
						searchTerm
					}
				: {}
		})

		return data || []
	}

	async getByStoreId(id: string) {
		const { data } = await axiosWithAuth<IProduct[]>({
			url: API_URL.products(`by-store-id/${id}`),
			method: 'GET'
		})

		return data || []
	}

	async getById(id: string) {
		const { data } = await axiosClassic<IProduct>({
			url: API_URL.products(`by-id/${id}`),
			method: 'GET'
		})

		return data
	}

	async getByCategory(categoryId: string) {
		const { data } = await axiosClassic<IProduct[]>({
			url: API_URL.products(`by-category/${categoryId}`),
			method: 'GET'
		})

		return data
	}

	async getMostPopular() {
		const { data } = await axiosClassic<IProduct[]>({
			url: API_URL.products(`most-popular`),
			method: 'GET'
		})

		return data
	}

	async getSimilar(id: string) {
		const { data } = await axiosClassic<IProduct[]>({
			url: API_URL.products(`similar/${id}`),
			method: 'GET'
		})

		return data
	}

	async create(data: IProductInput, storeId: string) {
		const { data: createdProduct } = await axiosWithAuth<IProduct>({
			url: API_URL.products(`${storeId}`),
			method: 'POST',
			data
		})

		return createdProduct
	}

	async update(id: string, data: IProductInput) {
		const { data: updatedProduct } = await axiosWithAuth<IProduct>({
			url: API_URL.products(`${id}`),
			method: 'PUT',
			data
		})

		return updatedProduct
	}

	async delete(id: string) {
		const { data } = await axiosWithAuth<IProduct>({
			url: API_URL.products(`${id}`),
			method: 'DELETE'
		})

		return data
	}
}

export const productService = new ProductService()
