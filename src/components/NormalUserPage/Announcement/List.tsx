'use client'

import { useState, useEffect, KeyboardEvent } from 'react';
import Link from 'next/link';
import { FC } from 'react';
import { AnnouncementForListProps } from '@/types/Props';

interface AnnouncementListProps {
  announcements: AnnouncementForListProps[];
}

const AnnouncementList: FC<AnnouncementListProps> = ({ announcements }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 10;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const reversedAnnouncements = announcements.slice().reverse();

  const categoryMap: { [key: string]: string } = {
    '사업': 'business',
    '소식': 'news',
    '채용': 'jobs'
  };

  const filteredAnnouncements = selectedCategory === 'all'
    ? reversedAnnouncements
    : reversedAnnouncements.filter((a) => a.category === categoryMap[selectedCategory]);

  const filteredAndSearchedAnnouncements = filteredAnnouncements.filter((announcement) =>
    announcement.title.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchInputKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const handleCategoryChange = (newCategory: string) => {
    setSelectedCategory(newCategory);
    setCurrentPage(1);
  };

  const paginatedAnnouncements = filteredAndSearchedAnnouncements.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
        <div>
          <input
            id="search-input"
            type="text"
            value={searchTerm}
            onChange={handleSearchInputChange}
            onKeyPress={handleSearchInputKeyPress}
            className="border rounded p-1"
            placeholder="제목 검색"
          />
        </div>
      </div>
      <div className={`bg-white shadow-md rounded-lg overflow-hidden ${isMobile ? 'pb-1' : ''}`}>
        {paginatedAnnouncements.map((announcement, index) => {
          const itemNumber = filteredAndSearchedAnnouncements.length - ((currentPage - 1) * itemsPerPage + index);
          return (
            <Link href={`/announcement/${announcement._id}`} key={announcement._id}>
              <div className={`border-b border-gray-200 hover:bg-gray-50 transition duration-150 ease-in-out ${index === paginatedAnnouncements.length - 1 ? 'border-b-0' : ''}`}>
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
                  {!isMobile && (
                    <div className="text-sm text-gray-500">
                      조회수: {announcement.views}
                    </div>
                  )}
                </div>
              </div>
            </Link>
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
              className={`px-3 py-2 border border-gray-300 bg-white text-xs font-medium ${currentPage === page ? 'text-blue-600 bg-blue-50' : 'text-gray-500 hover:bg-gray-50'
                }`}
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

export default AnnouncementList;