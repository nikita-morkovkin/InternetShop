import { axiosWithAuth } from '@/app/api/api.interceptors'
import { API_URL } from '@/app/config/api.config'
import {
	EnumOrderStatus,
	IPaymentResponse
} from '@/app/shared/types/order.interface'

type TypeData = {
	status?: EnumOrderStatus
	items: {
		quantity: number
		price: number
		productId: string
		storeId: string
	}
}

class OrderService {
	async place(data: TypeData) {
		return axiosWithAuth<IPaymentResponse>({
			url: API_URL.orders('/place'),
			method: 'POST',
			data
		})
	}
}
