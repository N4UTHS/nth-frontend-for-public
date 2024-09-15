'use client';

import React, { useState, useEffect, useCallback } from 'react';
import LoadingSpinner from '@/components/UI/Loading';
import { useRouter } from 'next/navigation';

interface Subsidiary {
  _id: string;
  name: string;
  explain: string;
}

const SubsidiaryManagement: React.FC = () => {
  const router = useRouter();
  const [subsidiaries, setSubsidiaries] = useState<Subsidiary[]>([]);
  const [selectedSubsidiary, setSelectedSubsidiary] = useState<Subsidiary | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  useEffect(() => {
    async function fetchSubsidiaries() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api${process.env.NEXT_PUBLIC_ADMIN_URL}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          credentials: 'include',
        });

        if (!response.ok) {
          router.push('/');
          throw new Error('Failed to fetch subsidiaries');
        }

        const data = await response.json();
        setSubsidiaries(data);
      } catch (error) {
        console.error('Error fetching subsidiaries:', error);
        setSubsidiaries([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSubsidiaries();
  }, [router]);

  const closePopup = useCallback(() => {
    setSelectedSubsidiary(null);
    setIsAdding(false);
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (event.target instanceof HTMLElement) {
      if (!event.target.closest('.popup')) {
        closePopup();
      }
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api${process.env.NEXT_PUBLIC_ADMIN_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        credentials: 'include',
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error('자회사 삭제에 실패했습니다.');
      }

      alert('자회사가 삭제되었습니다.');
      window.location.reload();

      setSubsidiaries(subsidiaries.filter((subsidiary) => subsidiary._id !== id));
      closePopup();
    } catch (error) {
      console.error('Error deleting subsidiary:', error);
    }
  };

  const handleUpdate = async () => {
    if (selectedSubsidiary) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api${process.env.NEXT_PUBLIC_ADMIN_URL}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          credentials: 'include',
          body: JSON.stringify(selectedSubsidiary),
        });

        if (!response.ok) {
          throw new Error('자회사 수정에 실패했습니다.');
        }

        alert('자회사가 수정되었습니다.');
        window.location.reload();

        setSubsidiaries(subsidiaries.map((subsidiary) =>
          subsidiary._id === selectedSubsidiary._id ? selectedSubsidiary : subsidiary
        ));
        closePopup();
      } catch (error) {
        console.error('Error updating subsidiary:', error);
      }
    }
  };

  const handleCreate = async (newSubsidiary: Omit<Subsidiary, 'id'>) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api${process.env.NEXT_PUBLIC_ADMIN_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        credentials: 'include',
        body: JSON.stringify(newSubsidiary),
      });

      if (!response.ok) {
        throw new Error('자회사 추가에 실패했습니다.');
      }

      const createdSubsidiary = await response.json();
      setSubsidiaries([...subsidiaries, createdSubsidiary]);
      closePopup();
      alert("자회사가 추가되었습니다.");
      window.location.reload();
    } catch (error) {
      console.error('Error creating subsidiary:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (selectedSubsidiary) {
      const { name, value } = e.target;
      setSelectedSubsidiary(prev => prev ? { ...prev, [name]: value } : prev);
    }
  };

  return (
    <div className="container mx-auto p-4 min-h-screen flex flex-col justify-start pt-[2cm] md:pt-[3cm]">
      <div className="mb-8 text-center">
        <h1 className="text-xl md:text-3xl font-bold text-gray-800">자회사 관리</h1>
      </div>

      <div className="container mx-auto px-4">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {subsidiaries.length === 0 ? (
                <p className="text-center text-gray-500 col-span-full">No subsidiaries available.</p>
              ) : (
                subsidiaries.map((subsidiary) => (
                  <div
                    key={subsidiary._id}
                    className="p-4 border rounded shadow-sm cursor-pointer"
                    onClick={() => {
                      setSelectedSubsidiary(subsidiary);
                      setIsAdding(false);
                    }}
                  >
                    <h2 className="text-sm font-semibold">{subsidiary.name}</h2>
                  </div>
                ))
              )}
              <div
                key="create-button" 
                className="p-2 border rounded shadow-sm cursor-pointer flex items-center justify-center"
                onClick={() => {
                  setSelectedSubsidiary({ _id: '', name: '', explain: '' });
                  setIsAdding(true);
                }}
              >
                <span className="text-2xl">+</span>
              </div>
            </div>

            {(selectedSubsidiary || isAdding) && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded shadow-lg popup max-w-sm w-full">
                  {isAdding ? (
                    <div>
                      <h2 className="text-xl font-semibold mb-2">Add Subsidiary</h2>
                      <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        className="w-full mb-2 p-2 border border-gray-300 rounded"
                        onChange={handleChange}
                      />
                      <textarea
                        name="explain"
                        placeholder="Description"
                        className="w-full mb-2 p-2 border border-gray-300 rounded"
                        onChange={handleChange}
                      />
                      <button
                        className="mt-4 text-blue-500 hover:underline"
                        onClick={() => selectedSubsidiary && handleCreate(selectedSubsidiary)}
                      >
                        Create
                      </button>
                    </div>
                  ) : (
                    <div>
                      <h2 className="text-xl font-semibold mb-2">Edit Subsidiary</h2>
                      <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        className="w-full mb-2 p-2 border border-gray-300 rounded"
                        value={selectedSubsidiary?.name || ''}
                        onChange={handleChange}
                      />
                      <textarea
                        name="explain"
                        placeholder="Description"
                        className="w-full mb-2 p-2 border border-gray-300 rounded"
                        value={selectedSubsidiary?.explain || ''}
                        onChange={handleChange}
                      />
                      <button
                        className="mt-4 mr-2 text-blue-500 hover:underline"
                        onClick={handleUpdate}
                      >
                        Update
                      </button>
                      <button
                        className="mt-4 text-red-500 hover:underline"
                        onClick={() => selectedSubsidiary?._id && handleDelete(selectedSubsidiary._id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubsidiaryManagement;