import { useQuery } from '@tanstack/react-query'
import { userService } from '@/services/user.service'

export function useProfile() {
	const {
		data: user,
		isLoading,
		error
	} = useQuery({
		queryKey: ['profile'],
		queryFn: () => userService.getProfile(),
		retry: false
	})

	return { user, isLoading, error }
}
