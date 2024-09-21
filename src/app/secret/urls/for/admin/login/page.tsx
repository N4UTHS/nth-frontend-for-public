'use client';

import React from 'react';
import useAdminLogin from '@/hooks/adminPage/login/useAdminLogin';

const LoginForm: React.FC = () => {
    const {
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
    } = useAdminLogin();

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
