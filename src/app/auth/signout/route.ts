import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies })

  // Check if a user's session exists
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    await supabase.auth.signOut()
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;
  if (!siteUrl) {
    // Fallback if the site URL isn't set, though it should be.
    return new NextResponse('Configuration error: Site URL not set.', { status: 500 });
  }

  const loginUrl = new URL('/login', siteUrl)
  return NextResponse.redirect(loginUrl, {
    status: 302,
  })
}
