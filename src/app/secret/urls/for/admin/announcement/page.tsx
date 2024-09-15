'use client';

import { useState, useEffect } from 'react';
import AdminAnnouncementList from '@/components/Admin/Announcement/List';
import LoadingSpinner from '@/components/UI/Loading';
import { useRouter } from 'next/navigation';

const AdminAnnouncementPage: React.FC = () => {
  const router = useRouter();
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAnnouncements() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api${process.env.NEXT_PUBLIC_ADMIN_URL}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          router.push('/');
          throw new Error('Failed to fetch announcements');
        }

        const data = await response.json();
        setAnnouncements(data);
      } catch (error) {
        console.error('Error fetching announcements:', error);
        setAnnouncements([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAnnouncements();
  }, [router]);

  return (
    <div className="container mx-auto p-4 min-h-screen flex flex-col justify-start pt-[2cm] md:pt-[3cm]">
      <div className="mb-8 text-center">
        <h1 className="text-xl md:text-3xl font-bold text-gray-800">공지사항 관리</h1>
      </div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <AdminAnnouncementList announcements={announcements} />
      )}
    </div>
  );
};

export default AdminAnnouncementPage;
