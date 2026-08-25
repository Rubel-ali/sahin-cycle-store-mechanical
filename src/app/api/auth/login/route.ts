import { NextResponse } from 'next/server';
import { login } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.error("ADMIN_EMAIL or ADMIN_PASSWORD not configured in .env");
      return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
    }

    if (email === adminEmail && password === adminPassword) {
      await login(email);
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
