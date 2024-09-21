import { useState, useEffect } from 'react';
import { fetchAnnouncements } from '@/apis/userPage/announcement/fetchForAllAnnouncements';
import { useRouter } from 'next/navigation';

const useAdminAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getAnnouncements = async () => {
      try {
        const data = await fetchAnnouncements();
        setAnnouncements(data);
      } catch (error) {
        console.error('Error fetching announcements:', error);
        setAnnouncements([]);
        router.push('/');
      } finally {
        setIsLoading(false);
      }
    };

    getAnnouncements();
  }, [router]);

  return { announcements, isLoading };
};

export default useAdminAnnouncements;
