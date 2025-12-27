import { ColumnDef } from '@tanstack/react-table'
import {
	Currency,
	ExternalLink,
	MoreHorizontal,
	Palette,
	Pencil,
	Settings2,
	Tag,
	User
} from 'lucide-react'
import Link from 'next/link'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/shadcn/button'
import { PUBLIC_URL, STORE_URL } from '@/config/url.config'

export interface IProductColumn {
	id: string
	title: string
	price: string
	category: string
	color: string
	storeId: string
}

export const productsColumns: ColumnDef<IProductColumn>[] = [
	{
		accessorKey: 'title',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					className='h-auto p-0 font-medium'
				>
					Название
					<User className='size-4 ml-2' />
				</Button>
			)
		},
		cell: ({ getValue }) => {
			return <div>{getValue() as string}</div>
		}
	},
	{
		accessorKey: 'price',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					className='h-auto p-0 font-medium'
				>
					Цена
					<Currency className='size-4 ml-2' />
				</Button>
			)
		},
		cell: ({ getValue }) => {
			return <div>{getValue() as string}</div>
		}
	},
	{
		accessorKey: 'category',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					className='h-auto p-0 font-medium'
				>
					Категория
					<Tag className='size-4 ml-2' />
				</Button>
			)
		},
		cell: ({ getValue }) => {
			return <div>{getValue() as string}</div>
		}
	},
	{
		accessorKey: 'color',
		header: ({ column }) => {
			return (
				<Button variant='ghost' className='h-auto p-0 font-medium'>
					Цвет
					<Palette className='size-4 ml-2' />
				</Button>
			)
		},
		cell: ({ row }) => {
			return (
				<div className='flex items-center gap-x-3'>
					{row.original.color}
					<div
						className='size-5 rounded-full border'
						style={{ backgroundColor: row.original.color }}
					></div>
				</div>
			)
		}
	},
	{
		accessorKey: 'actions',
		header: ({ column }) => {
			return (
				<Button variant='ghost' disabled className='h-auto p-0 font-medium'>
					Действия
					<Settings2 className='size-4 ml-2' />
				</Button>
			)
		},
		cell: ({ row }) => {
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='ghost'>
							<MoreHorizontal className='size-4 p-0' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						<DropdownMenuLabel>Действия</DropdownMenuLabel>

						<Link href={PUBLIC_URL.product(row.original.id)} target='_blank'>
							<DropdownMenuItem>
								<ExternalLink className='size-4 mr-2'>
									Страница с продуктом
								</ExternalLink>
							</DropdownMenuItem>
						</Link>
						<Link
							href={STORE_URL.productEdit(
								row.original.storeId,
								row.original.id
							)}
							target='_blank'
						>
							<DropdownMenuItem>
								<Pencil className='size-4 mr-2' />
								Редактировать
							</DropdownMenuItem>
						</Link>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		}
	}
]
