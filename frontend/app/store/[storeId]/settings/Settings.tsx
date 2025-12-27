'use client'

import { Trash } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Heading from '@/components/ui/Heading'
import { Button } from '@/components/ui/button'
import ConfirmModal from '@/components/ui/modals/ConfirmModal'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/shadcn/form'
import { Input } from '@/components/ui/shadcn/input'
import { Textarea } from '@/components/ui/textarea'
import { useDeleteStore } from '@/hooks/stores/useDeleteStore'
import useUpdateStore from '@/hooks/stores/useUpdateStore'
import { type IStoreEdit } from '@/shared/types/store.interface'
import styles from './Settings.module.scss'

const Settings = () => {
	const { store, updateStore, isLoading: isUpdateLoading } = useUpdateStore()
	const { deleteStore, isLoading: isDeleteLoading } = useDeleteStore()

	const form = useForm<IStoreEdit>({
		mode: 'onChange',
		values: {
			title: store?.title || '',
			description: store?.description || ''
		}
	})

	const onSubmit: SubmitHandler<IStoreEdit> = (data) => {
		updateStore(data)
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<Heading
					title='Настройки магазина'
					description='Управление настройками вашего магазина'
				/>
				<ConfirmModal handleClick={() => deleteStore()}>
					<Button variant='default' size={'icon'} disabled={isDeleteLoading}>
						<Trash className='size-4' />
					</Button>
				</ConfirmModal>
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className={styles.fields}>
						<FormField
							control={form.control}
							name='title'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Название магазина</FormLabel>
									<FormControl>
										<Input
											placeholder='Название магазина'
											disabled={isUpdateLoading}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name='description'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Описание магазина</FormLabel>
								<FormControl>
									<Textarea placeholder='Описание магазина' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						type='submit'
						variant={'default'}
						disabled={isUpdateLoading}
						className={styles.saveButton}
					>
						Сохранить
					</Button>
				</form>
			</Form>
		</div>
	)
}

export default Settings
