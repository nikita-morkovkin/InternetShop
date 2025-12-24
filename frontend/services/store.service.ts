import { axiosWithAuth } from '@/app/api/api.interceptors'
import { API_URL } from '@/app/config/api.config'
import {
	IStore,
	IStoreCreate,
	IStoreEdit
} from '@/app/shared/types/store.interface'

class StoreService {
	async getById(id: string) {
		const { data } = await axiosWithAuth<IStore>({
			url: API_URL.stores(`by-id/${id}`),
			method: 'GET'
		})
		return data
	}

	async getByStoreId(storeId: string) {
		const { data } = await axiosWithAuth<IStore[]>({
			url: API_URL.stores(`by-store-id/${storeId}`),
			method: 'GET'
		})
		return data || []
	}

	async create(data: IStoreCreate) {
		const { data: createdStore } = await axiosWithAuth<IStore>({
			url: API_URL.stores(''),
			method: 'POST',
			data
		})
		return createdStore
	}

	async update(id: string, data: IStoreEdit) {
		const { data: updatedStore } = await axiosWithAuth<IStore>({
			url: API_URL.stores(`${id}`),
			method: 'PUT',
			data
		})
		return updatedStore
	}

	async delete(id: string) {
		const { data } = await axiosWithAuth<IStore>({
			url: API_URL.stores(`${id}`),
			method: 'DELETE'
		})
		return data
	}
}

export const storeService = new StoreService()
