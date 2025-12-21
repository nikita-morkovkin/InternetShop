import { NextResponse, type NextRequest } from 'next/server'
import { PUBLIC_URL } from './app/config/url.config'
import { EnumTokens } from './services/auth/auth-token.service'

export async function proxy(request: NextRequest) {
	const accessToken = request.cookies.get(EnumTokens.ACCESS_TOKEN)?.value
	const pathname = request.nextUrl.pathname

	const isAuthPage = pathname.startsWith(PUBLIC_URL.auth())

	if (isAuthPage) {
		if (accessToken) {
			return NextResponse.redirect(new URL(PUBLIC_URL.home(), request.nextUrl))
		}
		return NextResponse.next()
	}

	if (!accessToken) {
		return NextResponse.redirect(new URL(PUBLIC_URL.auth(), request.nextUrl))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
