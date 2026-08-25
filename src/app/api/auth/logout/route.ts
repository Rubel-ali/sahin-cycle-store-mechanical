import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true, message: 'Logged out successfully' });
  
  // Clear the admin_token cookie
  response.cookies.set({
    name: 'admin_token',
    value: '',
    maxAge: 0,
    expires: new Date(0),
    path: '/',
  });

  return response;
}
