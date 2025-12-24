import { cn } from '@/lib/utils'

interface HeadingProps {
	title: string
	description?: string
	className?: string
}

const Heading = (props: HeadingProps) => {
	const { title, className, description } = props

	return (
		<div className='space-y-1 mb-3'>
			<h2 className={cn('text-2xl font-medium', className)}>{title}</h2>
			{description && (
				<p className='text-sm text-muted-foreground'>{description}</p>
			)}
		</div>
	)
}

export default Heading
