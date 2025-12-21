import { axiosWithAuth } from '@/app/api/api.interceptors'
import { API_URL } from '@/app/config/api.config'
import { IUser } from '@/app/shared/types/user.interface'

class UserService {
	async getProfile() {
		const { data } = await axiosWithAuth<IUser>({
			url: API_URL.users(`/profile`),
			method: 'GET'
		})

		return data
	}

	async toggleFavorites(productId: string) {
		return axiosWithAuth<IUser>({
			url: API_URL.users(`/profile/favorites/${productId}`),
			method: 'PATCH'
		})
	}
}

export const userService = new UserService()
