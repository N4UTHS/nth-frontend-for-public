import { useEffect, useState } from 'react';
import { fetchAdminData } from '@/apis/adminPage/announcement/create/fetchForAnnouncement';
import { useRouter } from 'next/navigation';

const useAdminData = () => {
  const router = useRouter();
  const [adminData, setAdminData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
      return;
    }

    const getData = async () => {
      try {
        const data = await fetchAdminData(token);
        setAdminData(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('알 수 없는 오류가 발생했습니다.');
        }
        router.push('/');
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [router]);

  return { adminData, isLoading, error };
};

export default useAdminData;