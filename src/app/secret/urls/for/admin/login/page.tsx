'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const LoginForm: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [authCode, setAuthCode] = useState('');
    const [error, setError] = useState('');
    const [isFirstAuthPassed, setIsFirstAuthPassed] = useState(false);
    const [adminData, setAdminData] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api${process.env.NEXT_PUBLIC_ADMIN_URL}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.message === '있음') {
                        router.push(`${process.env.NEXT_PUBLIC_ADMIN_URL}/announcement`);
                    }
                } else {
                    console.error('서버 응답이 올바르지 않습니다.');
                    alert('서버 응답이 올바르지 않습니다.');
                }
            } catch (error) {
                console.error('Error fetching admin data:', error);
                alert(error);
            }
        };

        fetchAdminData();
    }, [router]);

    const handleFirstAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api${process.env.NEXT_PUBLIC_ADMIN_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
                credentials: 'include',
            });

            if (response.ok) {
                setIsFirstAuthPassed(true);
            } else {
                const data = await response.json();
                setError(data.message || '접근 권한이 없습니다.');
            }
        } catch (err) {
            alert(err);
            router.push('/');
        }
    };

    const handleFinalAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api${process.env.NEXT_PUBLIC_ADMIN_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ authCode }),
                credentials: 'include',
            });

            if (response.ok) {
                alert("관리자 로그인 성공");
                router.push(`${process.env.NEXT_PUBLIC_ADMIN_URL}/announcement`);
            } else {
                const data = await response.json();
                setError(data.message || '인증에 실패했습니다.');
            }
        } catch (err) {
            setError('서버와의 통신 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col justify-start items-center px-4">
            <div className="w-full max-w-md mt-[15vh] sm:mt-[25vh]">
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="p-10">
                        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">LOGIN</h1>
                        <form onSubmit={isFirstAuthPassed ? handleFinalAuth : handleFirstAuth}>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                    disabled={isFirstAuthPassed}
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                    disabled={isFirstAuthPassed}
                                />
                            </div>
                            {isFirstAuthPassed && (
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        id="authCode"
                                        value={authCode}
                                        onChange={(e) => setAuthCode(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                            )}
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                {isFirstAuthPassed ? '인증하기' : '로그인'}
                            </button>
                        </form>
                        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
