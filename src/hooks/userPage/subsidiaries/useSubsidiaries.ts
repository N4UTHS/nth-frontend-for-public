import { useState, useEffect } from 'react';
import { SubsidiaryProps } from '@/types/Props';
import { fetchSubsidiaries } from '@/apis/userPage/subsidiaries/fetchForSubsidiaries';

export const useSubsidiaries = () => {
  const [subsidiaries, setSubsidiaries] = useState<SubsidiaryProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSubsidiaries();
        setSubsidiaries(data);
      } catch (error) {
        console.error('Error fetching subsidiaries:', error);
        setSubsidiaries([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { subsidiaries, isLoading };
};
