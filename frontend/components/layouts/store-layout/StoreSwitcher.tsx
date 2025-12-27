'use client'

import { ChevronsUpDown, PlusIcon, StoreIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import CreateStoreModal from '@/components/ui/modals/CreateStoreModal'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'
import { Button } from '@/components/ui/shadcn/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator
} from '@/components/ui/shadcn/command'
import { STORE_URL } from '@/config/url.config'
import { IStore } from '@/shared/types/store.interface'

interface StoreSwitcherProps {
	storeItems: IStore[]
}

const StoreSwitcher = ({ storeItems }: StoreSwitcherProps) => {
	const router = useRouter()
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const onStoreSelect = (storeId: string) => {
		setIsOpen(false)
		router.push(STORE_URL.home(storeId))
	}

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<Button
					variant={'outline'}
					size={'sm'}
					role='combobox'
					aria-expanded={isOpen}
					aria-label='Выберите магазин'
				>
					<StoreIcon className='mr-2 size-4' />
					Текущий магазин
					<ChevronsUpDown className='ml-auto size-4 shrink-0' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-52 p-0'>
				<Command>
					<CommandList>
						<CommandInput placeholder='Найти магазин' />
						<CommandEmpty>Ничего не найдено</CommandEmpty>
						<CommandGroup heading={'Магазины'}>
							{storeItems.map((store) => (
								<CommandItem
									key={store.id}
									onSelect={() => onStoreSelect(store.id)}
								>
									<StoreIcon className='mr-2 size-4' />
									<div className='line-clamp-1'>{store.title}</div>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
					<CommandSeparator>
						<CommandGroup>
							<CreateStoreModal>
								<CommandItem>
									<PlusIcon className='mr-2 size-4' />
								</CommandItem>
							</CreateStoreModal>
						</CommandGroup>
					</CommandSeparator>
				</Command>
				<div className='p-2'>
					<CreateStoreModal>
						<Button
							variant='outline'
							className='w-full justify-start'
							size='sm'
						>
							<PlusIcon className='mr-2 size-4' />
							Создать магазин
						</Button>
					</CreateStoreModal>
				</div>
			</PopoverContent>
		</Popover>
	)
}

export default StoreSwitcher
