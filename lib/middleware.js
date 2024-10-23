import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(req) {
  const res = NextResponse.next();
  
  // Create a Supabase client with proper cookie handling
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
        cookies: {
          // Use `getAll` to retrieve all cookies
          getAll: () => {
            return req.cookies.getAll(); // or some other method to retrieve all cookies
          },
          // Use `setAll` to set all cookies in the response
          setAll: (cookies) => {
            cookies.forEach((cookie) => {
              res.cookies.set(cookie.name, cookie.value, cookie.options);
            });
          },
        },
      }
    );

  const { pathname } = req.nextUrl;

  console.log('Middleware running for path:', pathname);

  // Use getUser() instead of getSession() to check for authenticated session
  const { data: { user }, error } = await supabase.auth.getUser();

  console.log('User:', user ? 'authenticated' : 'not authenticated');

  // Allow access to authentication-related routes
  if (pathname.startsWith('/auth')) {
    return res;
  }

  // Allow access to home page
  if (pathname === '/') {
    return res;
  }

  // Allow access to user profile pages (/[displayName])
  if (pathname.match(/^\/[\w-]+$/)) {
    return res;
  }

  // Handle edit pages
  if (pathname.match(/\/[\w-]+\/edit/)) {
    if (!user) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    const displayName = pathname.split('/')[1];
    if (user.user_metadata?.display_name !== displayName) {
      return NextResponse.redirect(new URL(`/${user.user_metadata.display_name}/edit`, req.url));
    }
  }

  return res;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
