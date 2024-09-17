import { useState, useEffect } from 'react';
import { AnnouncementProps } from '@/types/Props';
import { getAnnouncement } from '@/apis/userPage/announcement/fetchForSingleAnnouncement';

export const useAnnouncement = (id: string) => {
  const [announcement, setAnnouncement] = useState<AnnouncementProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnnouncement() {
      const data = await getAnnouncement(id);
      setAnnouncement(data);
      setLoading(false);
    }
    fetchAnnouncement();
  }, [id]);

  return { announcement, loading };
};
