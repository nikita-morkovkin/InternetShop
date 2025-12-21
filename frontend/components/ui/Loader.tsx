import { cva, VariantProps } from 'class-variance-authority'
import { LoaderCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const iconVariants = cva('animate-spin text-muted-foreground', {
	variants: {
		size: {
			default: 'size-9',
			sm: 'size-6'
		}
	},
	defaultVariants: {
		size: 'default'
	}
})

type TypeIconVariants = VariantProps<typeof iconVariants>

interface ILoader extends TypeIconVariants {}

const Loader = ({ size }: ILoader) => {
	return <LoaderCircle className={cn(iconVariants({ size }))} />
}

export default Loader
