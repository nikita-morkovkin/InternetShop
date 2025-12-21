import type { Metadata } from 'next'
import Home from '../(root)/Home'

const metadata: Metadata = {
	title: 'Ваш шопинг - ваше удовольствие и все в одном месте'
}

const HomePage = () => {
	return <Home />
}

export default HomePage
