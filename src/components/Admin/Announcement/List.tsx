'use client';

import { useState, useEffect, useMemo, KeyboardEvent } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface Announcement {
    _id: string;
    created: string;
    title: string;
    writer: string;
    category: string;
    views: number;
}

interface AnnouncementListProps {
    announcements: Announcement[];
}

const AdminAnnouncementList: React.FC<AnnouncementListProps> = ({ announcements }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [isMobile, setIsMobile] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 10;
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const validAnnouncements = Array.isArray(announcements) ? announcements : [];

    const categoryMap: { [key: string]: string } = {
        사업: 'business',
        소식: 'news',
        채용: 'jobs'
    };    

    const filteredAnnouncements = useMemo(() => {
        const reversed = validAnnouncements.slice().reverse();
        return selectedCategory === 'all'
            ? reversed
            : reversed.filter((a) => a.category === categoryMap[selectedCategory]);
    }, [selectedCategory, validAnnouncements, categoryMap]);

    const filteredAndSearchedAnnouncements = useMemo(() => 
        filteredAnnouncements.filter((announcement) =>
            announcement.title.toLowerCase().includes(searchTerm.toLowerCase())
        ), 
        [filteredAnnouncements, searchTerm]
    );

    const totalPages = Math.ceil(filteredAndSearchedAnnouncements.length / itemsPerPage);

    const getPaginationRange = () => {
        const range = [];
        const leftOffset = Math.max(1, currentPage - 2);
        const rightOffset = Math.min(totalPages, currentPage + 2);

        for (let i = leftOffset; i <= rightOffset; i++) {
            range.push(i);
        }
        return range;
    };

    const handlePageChange = (page: number) => setCurrentPage(page);

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value);

    const handleSearchInputKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    const handleCategoryChange = (newCategory: string) => {
        setSelectedCategory(newCategory);
        setCurrentPage(1);
    };

    const handleEdit = (id: string) => router.push(`${process.env.NEXT_PUBLIC_ADMIN_URL}/announcement/update/${id}`);

    const handleDelete = async (id: string) => {
        if (window.confirm('정말로 이 공지사항을 삭제하시겠습니까?')) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api${process.env.NEXT_PUBLIC_ADMIN_URL}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({ id }),
                    credentials: 'include'
                });

                if (response.ok) {
                    alert('공지사항이 삭제되었습니다.');
                    window.location.reload();
                } else {
                    alert('공지사항 삭제에 실패했습니다.');
                }
            } catch (error) {
                console.error('Error deleting announcement:', error);
                alert('공지사항 삭제 중 오류가 발생했습니다.');
            }
        }
    };

    const paginatedAnnouncements = useMemo(() => 
        filteredAndSearchedAnnouncements.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        ), 
        [filteredAndSearchedAnnouncements, currentPage, itemsPerPage]
    );

    const handleCreate = () => router.push(`${process.env.NEXT_PUBLIC_ADMIN_URL}/announcement/create`);

    const categoryOptions = ['all', '사업', '소식', '채용'];

    return (
        <>
            <div className="mb-4 flex justify-between items-center">
                <div>
                    <select
                        id="category-select"
                        value={selectedCategory}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        className="border rounded p-1"
                    >
                        {categoryOptions.map(category => (
                            <option key={category} value={category}>
                                {category === 'all' ? '전체' : category}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-end items-center">
                    <button
                        onClick={handleCreate}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 mr-2 rounded h-[34px]"
                    >
                        작성
                    </button>
                    <input
                        id="search-input"
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchInputChange}
                        onKeyPress={handleSearchInputKeyPress}
                        className="border rounded p-1 w-1/2 md:w-auto"
                        placeholder="제목 검색"
                    />
                </div>
            </div>
            <div className={`bg-white shadow-md rounded-lg overflow-hidden ${isMobile ? 'pb-1' : ''}`}>
                {paginatedAnnouncements.map((announcement, index) => {
                    const itemNumber = filteredAndSearchedAnnouncements.length - ((currentPage - 1) * itemsPerPage + index);
                    return (
                        <div key={announcement._id} className={`border-b border-gray-200 hover:bg-gray-50 transition duration-150 ease-in-out ${index === paginatedAnnouncements.length - 1 ? 'border-b-0' : ''}`}>
                            <div className="px-6 py-4 flex justify-between items-center">
                                <div className="text-xs font-medium text-gray-400">{itemNumber}</div>
                                <div className="flex-grow ml-4">
                                    <div className={`text-md font-semibold text-gray-800 ${isMobile ? 'text-base' : ''}`}>{announcement.title}</div>
                                    {!isMobile && (
                                        <div className="text-sm text-gray-600">
                                            {announcement.writer} &nbsp;|&nbsp; {new Date(announcement.created).toLocaleDateString()}
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center">
                                    <div className="text-sm text-gray-500 mr-4">
                                        조회수: {announcement.views}
                                    </div>
                                    <button
                                        onClick={() => handleEdit(announcement._id)}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                                    >
                                        수정
                                    </button>
                                    <button
                                        onClick={() => handleDelete(announcement._id)}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        삭제
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="flex justify-center mt-6">
                <nav className="inline-flex rounded-md shadow">
                    <button
                        onClick={() => handlePageChange(1)}
                        className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-xs font-medium text-gray-500 hover:bg-gray-50"
                    >
                        {'<<'}
                    </button>
                    {getPaginationRange().map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-3 py-2 border border-gray-300 bg-white text-xs font-medium ${currentPage === page ? 'text-blue-600 bg-blue-50' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        onClick={() => handlePageChange(totalPages)}
                        className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-xs font-medium text-gray-500 hover:bg-gray-50"
                    >
                        {'>>'}
                    </button>
                </nav>
            </div>
        </>
    );
};

export default AdminAnnouncementList;
