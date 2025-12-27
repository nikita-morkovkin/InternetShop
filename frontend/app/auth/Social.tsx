import { useRouter } from 'next/navigation'
import { FaYandex } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { Button } from '@/components/ui/shadcn/button'
import { SERVER_URL } from '../../config/api.config'
import styles from './Auth.module.scss'

const Social = () => {
	const router = useRouter()

	return (
		<div className={styles.social}>
			<Button
				variant={'outline'}
				onClick={() => router.push(`${SERVER_URL}/auth/google`)}
			>
				<FcGoogle />
				Продолжить через Google
			</Button>

			<Button
				variant={'outline'}
				onClick={() => router.push(`${SERVER_URL}/auth/yandex`)}
			>
				<FaYandex color='red' />
				Продолжить через Yandex
			</Button>
		</div>
	)
}

export default Social
