export const APP_URL = process.env.APP_URL as string

export const PUBLIC_URL = {
	root: (url = '') => `${url ? url : ''}`,

	home: () => PUBLIC_URL.root('/'),
	auth: () => PUBLIC_URL.root('/auth'),
	explorer: (query: string = '') => PUBLIC_URL.root(`/explorer${query}`),

	product: (id: string = '') => PUBLIC_URL.root(`/product/${id}`),
	category: (id: string = '') => PUBLIC_URL.root(`/category/${id}`)
}

export const DASHBOARD_URL = {
	root: (url = '') => `/dashboard${url ? url : ''}`,

	home: () => PUBLIC_URL.root('/'),
	favorites: () => PUBLIC_URL.root('/favorites')
}

export const STORE_URL = {
	root: (url: string = '') => `/store${url ? url : ''}`,

	home: (storeId: string = '') => STORE_URL.root(`/${storeId}`),
	products: (storeId: string = '') => STORE_URL.root(`/${storeId}/products`),
	productCreate: (storeId: string = '') =>
		STORE_URL.root(`/${storeId}/products/create`),
	productEdit: (storeId: string = '', id: string = '') =>
		STORE_URL.root(`/${storeId}/products/${id}`),

	categories: (storeId: string = '') =>
		STORE_URL.root(`/${storeId}/categories`),
	categoryCreate: (storeId: string = '') =>
		STORE_URL.root(`/${storeId}/categories/create`),
	categoryEdit: (storeId: string = '', id: string = '') =>
		STORE_URL.root(`/${storeId}/categories/${id}`),

	colors: (storeId: string = '') => STORE_URL.root(`/${storeId}/colors`),
	colorCreate: (storeId: string = '') =>
		STORE_URL.root(`/${storeId}/colors/create`),
	colorEdit: (storeId: string = '', id: string = '') =>
		STORE_URL.root(`/${storeId}/colors/${id}`),

	reviews: (storeId: string = '') => STORE_URL.root(`/${storeId}/reviews`),
	settings: (storeId: string = '') => STORE_URL.root(`/${storeId}/settings`)
}
