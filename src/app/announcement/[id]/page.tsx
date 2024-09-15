'use client'

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/UI/Loading';
import { AnnouncementProps } from '@/types/Props';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

async function getAnnouncement(id: string): Promise<AnnouncementProps | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch announcement');
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching announcement:', error);
    return null;
  }
}

const AnnouncementDetailPage: React.FC<{ params: { id: string } }> = ({ params }) => {
  const [announcement, setAnnouncement] = useState<AnnouncementProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnnouncement() {
      const data = await getAnnouncement(params.id);
      setAnnouncement(data);
      setLoading(false);
    }
    fetchAnnouncement();
  }, [params.id]);

  const handleFileDownload = () => {
    if (announcement?.file && announcement.file_name && announcement.fileContentType) {
      try {
        const byteCharacters = atob(announcement.file);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: announcement.fileContentType });

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;

        const fileName = decodeURIComponent(announcement.file_name);
        a.download = fileName;

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error handling file download:', error);
      }
    } else {
      console.error('File data is missing or corrupted');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!announcement) {
    return <div>공지사항을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto p-4 flex flex-col justify-start pt-[2cm] md:pt-[3cm]">
        <div className="bg-white shadow-md rounded-lg overflow-hidden mx-auto w-[95%] min-h-[700px] max-h-[800px] flex flex-col">
          <div className="p-6 flex-grow overflow-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{announcement.title}</h1>
            <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
              <div>
                <span className="text-base mr-2">{announcement.writer}</span>
                {announcement.is_updated && <span className="text-xs text-black-600">수정됨</span>}
              </div>
              <div>
                <span className="mr-4">조회수: {announcement.views}</span>
                <span>{new Date(announcement.created).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <div
                className="text-gray-700 whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: announcement.main_text }}
              />
            </div>
          </div>
          {announcement.file_name && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <h2 className="text-sm font-semibold mb-2">첨부파일</h2>
              <button
                onClick={handleFileDownload}
                className="text-blue-600 hover:underline cursor-pointer text-sm flex items-center"
              >
                <span className="mr-2">🗂️</span>
                {announcement.file_name}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementDetailPage;