import { axiosWithAuth } from '@/api/api.interceptors'
import { API_URL } from '@/app/config/api.config'
import { IReview, IReviewInput } from '@/app/shared/types/review.interface'

class ReviewService {
	async getByStoreId(id: string) {
		const { data } = await axiosWithAuth<IReview[]>({
			url: API_URL.reviews(`/by-store-id/${id}`),
			method: 'GET'
		})

		return data
	}

	async create(data: IReviewInput, storeId: string) {
		const { data: createdReview } = await axiosWithAuth<IReview>({
			url: API_URL.reviews(`/${storeId}`),
			method: 'POST',
			data
		})

		return createdReview
	}

	async delete(id: string) {
		const { data } = await axiosWithAuth<IReview>({
			url: API_URL.reviews(`/${id}`),
			method: 'DELETE'
		})

		return data
	}
}

export const reviewService = new ReviewService()
