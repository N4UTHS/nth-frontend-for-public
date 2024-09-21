export const fetchAdminData = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api${process.env.NEXT_PUBLIC_ADMIN_URL}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('서버 응답이 올바르지 않습니다.');
    }
    return await response.json();
};

export const postFirstAuth = async (username: string, password: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api${process.env.NEXT_PUBLIC_ADMIN_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || '접근 권한이 없습니다.');
    }
};

export const postFinalAuth = async (authCode: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api${process.env.NEXT_PUBLIC_ADMIN_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ authCode }),
        credentials: 'include',
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || '인증에 실패했습니다.');
    }
};
