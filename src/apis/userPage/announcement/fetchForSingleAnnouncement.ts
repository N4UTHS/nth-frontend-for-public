import { AnnouncementProps } from '@/types/Props';

export async function getAnnouncement(id: string): Promise<AnnouncementProps | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch announcement');
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching announcement:', error);
    return null;
  }
}
