import { NextResponse } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

export async function middleware(req) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const { pathname } = req.nextUrl

  console.log('Middleware running for path:', pathname)

  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  console.log('Session:', session ? 'exists' : 'does not exist')

  // Always allow access to authentication-related routes
  if (pathname.startsWith('/auth')) {
    console.log('Allowing access to auth route')
    return res
  }

  // Allow access to home page
  if (pathname === '/') {
    console.log('Allowing access to home page')
    return res
  }

  // Allow access to user profile pages (/[displayName])
  if (pathname.match(/^\/[\w-]+$/)) {
    console.log('Allowing access to user profile page')
    return res
  }

  // Handle edit pages
  if (pathname.match(/\/[\w-]+\/edit/)) {
    console.log('Handling edit page')
    // If no user is logged in, redirect to home page
    if (!session) {
      console.log('No session, redirecting to home')
      return NextResponse.redirect(new URL('/', req.url))
    }

    // Check if user is trying to access their own edit page
    const displayName = pathname.split('/')[1]
    console.log('URL display name:', displayName)
    console.log('User display name:', session.user?.user_metadata?.display_name)
    
    if (session.user?.user_metadata?.display_name !== displayName) {
      console.log('Mismatch in display names, redirecting to own edit page')
      return NextResponse.redirect(new URL(`/${session.user.user_metadata.display_name}/edit`, req.url))
    }
    
    console.log('User authorized for this edit page')
  }


  // Handle case where user logs out on any other page
  if (!session && pathname !== '/') {
    console.log('No session on protected page, redirecting to home')
    return NextResponse.redirect(new URL('/', req.url))
  }

  console.log('Allowing access to page:', pathname)
  // Allow all other requests to pass through
  return res
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
