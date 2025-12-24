import { PropsWithChildren, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useCreateStore } from '@/app/hooks/queries/useCreateStore'
import { type IStoreCreate } from '@/app/shared/types/store.interface'
import { Button } from '../shadcn/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '../shadcn/dialog'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '../shadcn/form'
import { Input } from '../shadcn/input'

const CreateStoreModal = ({ children }: PropsWithChildren) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const { createStore, isLoading } = useCreateStore()

	const form = useForm<IStoreCreate>({
		mode: 'onChange'
	})

	const onSubmit: SubmitHandler<IStoreCreate> = (data) => {
		createStore(data, {
			onSuccess: () => setIsOpen(false)
		})
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger className='w-full'>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Создание магазина</DialogTitle>
					<DialogDescription>
						Для создания магазина нужно указать описание
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
						<FormField
							control={form.control}
							name='title'
							rules={{
								required: 'Название обязательно'
							}}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Название магазина</FormLabel>
									<FormControl>
										<Input
											placeholder='Название магазина'
											disabled={isLoading}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className='flex justify-end'>
							<Button type='submit' variant={'primary'} disabled={isLoading}>
								{isLoading ? 'Создание...' : 'Создать'}
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}

export default CreateStoreModal
