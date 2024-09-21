export const fetchAnnouncements = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api${process.env.NEXT_PUBLIC_ADMIN_URL}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch announcements');
    }
  
    const data = await response.json();
    return data;
  };
  