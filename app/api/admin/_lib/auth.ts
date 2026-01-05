import { NextRequest, NextResponse } from 'next/server'

export function authGuard(req: NextRequest): NextResponse | null {
  const token = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '')
  
  if (!token || token !== process.env.ADMIN_API_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  return null
}
