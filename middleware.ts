import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server';

const adminIp = process.env.ACCESS_IP ? process.env.ACCESS_IP.split(',').map(ip => ip.trim()) : [];
const adminPath = process.env.ADMIN_URL_START_PATH;

function normalizeIp(ip: string): string {
  if (ip.startsWith('::ffff:')) {
    return ip.substring(7);
  }
  return ip;
}

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return normalizeIp(forwardedFor.split(',')[0].trim());
  }
  return normalizeIp(request.ip || '');
}

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith(`${adminPath}`)) {
    const clientIp = getClientIp(request);

    if (!adminIp.includes(clientIp)) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: `${adminPath}/:path*`,
}