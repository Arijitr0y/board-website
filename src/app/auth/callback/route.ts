import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/'
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!siteUrl) {
    // In a real app, you'd want to log this error and have a better error page.
    // For now, we'll redirect to a generic error page.
    return NextResponse.redirect('/auth/auth-code-error');
  }

  if (code) {
    const supabase = createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      const redirectUrl = new URL(next, siteUrl);
      return NextResponse.redirect(redirectUrl.toString())
    }
  }

  // return the user to an error page with instructions
  const errorUrl = new URL('/auth/auth-code-error', siteUrl);
  return NextResponse.redirect(errorUrl.toString())
}
