'use client';

import { useState, useEffect, Suspense } from 'react';
import AnnouncementList from '@/components/NormalUserPage/Announcement/List';
import LoadingSpinner from '@/components/UI/Loading';

export default function AnnouncementPage() {
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAnnouncements() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, { 
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        
        if (!res.ok) {
          throw new Error('Failed to fetch announcements');
        }
        
        const data = await res.json();
        setAnnouncements(data);
      } catch (error) {
        console.error('Error fetching announcements:', error);
        setAnnouncements([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAnnouncements();
  }, []);

  return (
    <div className="container mx-auto p-4 min-h-screen flex flex-col justify-start pt-[2cm] md:pt-[3cm]">
      <div className="mb-8 text-center">
        <h1 className="text-xl md:text-3xl font-bold text-gray-800">공지사항</h1>
      </div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <AnnouncementList announcements={announcements} />
      )}
    </div>
  );
}
