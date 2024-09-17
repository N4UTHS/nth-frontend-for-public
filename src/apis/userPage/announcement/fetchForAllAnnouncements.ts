export async function fetchAnnouncements() {
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

        return await res.json();
    } catch (error) {
        console.error('Error fetching announcements:', error);
        throw error;
    }
}