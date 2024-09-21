import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchAdminData, postFirstAuth, postFinalAuth } from '@/apis/adminPage/login/fetchForAdminLogin';

const useAdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [authCode, setAuthCode] = useState('');
    const [error, setError] = useState('');
    const [isFirstAuthPassed, setIsFirstAuthPassed] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchAdminData();
                if (data.message === '있음') {
                    router.push(`${process.env.NEXT_PUBLIC_ADMIN_URL}/announcement`);
                }
            } catch (error) {
                console.error('Error fetching admin data:', error);
                alert(error);
            }
        };
        fetchData();
    }, [router]);

    const handleFirstAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            await postFirstAuth(username, password);
            setIsFirstAuthPassed(true);
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleFinalAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            await postFinalAuth(authCode);
            alert('관리자 로그인 성공');
            router.push(`${process.env.NEXT_PUBLIC_ADMIN_URL}/announcement`);
        } catch (err: any) {
            setError(err.message);
        }
    };

    return {
        username,
        password,
        authCode,
        error,
        isFirstAuthPassed,
        setUsername,
        setPassword,
        setAuthCode,
        handleFirstAuth,
        handleFinalAuth,
    };
};

export default useAdminLogin;
