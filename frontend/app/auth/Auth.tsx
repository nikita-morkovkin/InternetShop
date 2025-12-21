'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Button } from '@/components/ui/shadcn/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/shadcn/card'
import { Form } from '@/components/ui/shadcn/form'
import authImage from '../../public/images/auth.svg'
import styles from './Auth.module.scss'
import AuthFields from './AuthFields'
import Social from './Social'
import { useAuthForm } from './useAuthForm'

const Auth = () => {
	const [isReg, setIsReg] = useState<boolean>(false)
	const { onSubmit, isPending, form } = useAuthForm(isReg)

	return (
		<div className={styles.wrapper}>
			<div className={styles.left}>
				<Image
					src={authImage}
					width={100}
					height={100}
					alt='Internet Sop Auth'
					priority
					draggable={false}
				/>
			</div>
			<div className={styles.right}>
				<Card className={styles.card}>
					<CardHeader className={styles.header}>
						<CardTitle>
							{isReg ? 'Создать аккаунт' : 'Войти в аккаунт'}
						</CardTitle>
						<CardDescription>
							Войдите или создайте учетную запись, чтобы оформлять покупки!
						</CardDescription>
					</CardHeader>
					<CardContent className={styles.content}>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)}>
								{/* Auth Fields */}
								<AuthFields form={form} isPending={isPending} isReg={isReg} />

								<Button disabled={isPending}>Продолжить</Button>
							</form>
						</Form>
						{/* Social */}
						<Social />
					</CardContent>
					<CardFooter className={styles.footer}>
						{isReg ? 'Уже есть аккаунт?' : 'Еще нет аккаунта?'}
						<button onClick={() => setIsReg(!isReg)}>
							{isReg ? 'Войти' : 'Создать'}
						</button>
					</CardFooter>
				</Card>
			</div>
		</div>
	)
}

export default Auth
