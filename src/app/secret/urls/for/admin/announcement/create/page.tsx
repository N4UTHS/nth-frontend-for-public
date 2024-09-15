'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import LoadingSpinner from '@/components/UI/Loading';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

const AnnouncementPage: React.FC = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [main_text, setMainText] = useState('');
  const [category, setCategory] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [currentFileName, setCurrentFileName] = useState('');
  const [adminData, setAdminData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const categoryMap: { [key: string]: string } = {
    '사업': 'business',
    '소식': 'news',
    '채용': 'jobs'
  };

  const categories = ['사업', '소식', '채용'];

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api${process.env.NEXT_PUBLIC_ADMIN_URL}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          credentials: 'include'
        });

        if (!response.ok) {
          router.push('/');
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setAdminData(data);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdminData();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (!title || !main_text) {
      alert('제목과 본문을 입력해주세요.');
      return;
    }

    const confirmSubmit = window.confirm('공지사항을 작성하시겠습니까?');
    if (!confirmSubmit) return;

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('main_text', main_text);
    if (category) formData.append('category', categoryMap[category]);
    if (file) {
      formData.append('file', file);
      formData.append('file_name', file.name);
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api${process.env.NEXT_PUBLIC_ADMIN_URL}`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        credentials: 'include'
      });

      if (!response.ok) {
        router.push('/');
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('응답 데이터:', data);
      alert('성공적으로 업로드되었습니다.');
      resetForm();
      router.push(`${process.env.NEXT_PUBLIC_ADMIN_URL}/announcement`);
    } catch (error) {
      console.error('업로드 오류:', error);
      alert('업로드 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setMainText('');
    setCategory('');
    setFile(null);
    setCurrentFileName('');
  };

  const handleRemoveFile = () => {
    setFile(null);
    setCurrentFileName('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setCurrentFileName(e.target.files[0].name);
    }
  };

  const handleCancel = () => {
    const confirmCancel = window.confirm('공지사항 작성을 취소하시겠습니까?');
    if (confirmCancel) {
      router.push('/announcement');
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto p-4 flex flex-col justify-start pt-[2cm] md:pt-[3cm]">
        <div className="bg-white shadow-md rounded-lg overflow-hidden mx-auto w-[95%] flex flex-col">
          <form onSubmit={handleSubmit} className="p-6 flex-grow flex flex-col">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="공지사항 제목을 입력해 주세요."
              className="md:text-2xl text-xl font-bold text-gray-800 mb-2 w-full border-b border-gray-300 focus:outline-none focus:border-blue-500"
              required
            />
            <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
              <div>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="text-base mr-2 border rounded p-1"
                >
                  <option value="">카테고리 없음</option>
                  {categories.map((cat, index) => (
                    <option key={index} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <span>작성: {new Date().toLocaleDateString()}</span>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-4 flex-grow flex flex-col h-[600px]">
              <ReactQuill
                value={main_text}
                onChange={setMainText}
                modules={modules}
                formats={formats}
                placeholder="공지사항 본문을 입력해 주세요."
                className="h-full overflow-y-auto"
              />
            </div>
            <div className="border-t border-gray-200 pt-4 mt-4 flex justify-end gap-4">
              <button
                type="submit"
                onClick={handleSubmit}
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? '제출 중...' : '작성'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                취소
              </button>
            </div>
          </form>
          <div className="px-6 py-4 bg-gray-100 border-t border-gray-200">
            <h2 className="text-sm font-semibold mb-2">첨부파일</h2>
            {currentFileName && (
              <div className="flex items-center mb-2">
                <p className="text-sm text-gray-600 mr-2">현재 파일: {currentFileName}</p>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="text-red-500 hover:text-red-700"
                >
                  &times;
                </button>
              </div>
            )}
            {!currentFileName && (
              <input
                type="file"
                onChange={handleFileChange}
                className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementPage;
