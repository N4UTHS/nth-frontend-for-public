import { useState, useEffect } from 'react';
import { fetchAnnouncements } from '@/apis/userPage/announcement/fetchForAllAnnouncements';

export function useAnnouncements() {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadAnnouncements() {
      try {
        const data = await fetchAnnouncements();
        setAnnouncements(data);
      } catch (error) {
        setAnnouncements([]);
      } finally {
        setIsLoading(false);
      }
    }

    loadAnnouncements();
  }, []);

  return { announcements, isLoading };
}
