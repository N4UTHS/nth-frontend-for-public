import { SubsidiaryProps } from '@/types/Props';

export const fetchSubsidiaries = async (): Promise<SubsidiaryProps[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch subsidiaries');
  }

  return res.json();
};
