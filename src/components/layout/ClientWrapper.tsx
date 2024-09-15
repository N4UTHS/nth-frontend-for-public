'use client';

import { usePathname } from 'next/navigation';
import Navigation from './Navigation';
import Footer from './Footer';
import AdminNavigation from '../Admin/AdminNavigation';

export default function ClientWrapper ({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <>
      {isAdminRoute ? <AdminNavigation /> : <Navigation />}
      {children}
      {<Footer />}
    </>
  );
};