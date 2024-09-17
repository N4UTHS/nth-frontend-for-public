'use client';

import { Suspense } from 'react';
import AnnouncementList from '@/components/NormalUserPage/Announcement/List';
import LoadingSpinner from '@/components/UI/Loading';
import { useAnnouncements } from '@/hooks/userPage/announcement/useAnnouncements';

export default function AnnouncementPage() {
  const { announcements, isLoading } = useAnnouncements();

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
