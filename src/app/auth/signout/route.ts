import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const supabase = createClient()

  // Check if a user's session exists
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    await supabase.auth.signOut()
    revalidatePath('/', 'layout')
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  if (!siteUrl) {
    // Fallback if the site URL isn't set, though it should be.
    return new NextResponse('Configuration error: Site URL not set.', { status: 500 });
  }


  const loginUrl = new URL('/login', siteUrl)
  return NextResponse.redirect(loginUrl, {
    status: 302,
  })
}
