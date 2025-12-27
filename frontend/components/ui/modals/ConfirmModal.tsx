import { PropsWithChildren } from 'react'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from '../alert-dialog'

interface ConfirmModalProps {
	handleClick: () => void
}

const ConfirmModal = (props: PropsWithChildren<ConfirmModalProps>) => {
	const { handleClick, children } = props

	return (
		<AlertDialog>
			<AlertDialogTrigger>{children}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Вы уверены?</AlertDialogTitle>
					<AlertDialogDescription>
						Это действие не может быть отменено. Это приведет к удалению вашего
						магазина и удалению ваших данных с наших серверов.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Закрыть</AlertDialogCancel>
					<AlertDialogAction
						onClick={handleClick}
						className='bg-red-500 hover:bg-red-600/90'
					>
						Продолжить
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export default ConfirmModal
