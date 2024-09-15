'use client'

import React, { useState, useEffect } from 'react';
import SubsidiaryList from '@/components/NormalUserPage/Subsidiaries/List';
import LoadingSpinner from '@/components/UI/Loading';

interface Subsidiary {
  id: string;
  name: string;
  explain: string;
}

const SubsidiaryPage: React.FC = () => {
  const [subsidiaries, setSubsidiaries] = useState<Subsidiary[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSubsidiaries() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, { 
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        
        if (!res.ok) {
          throw new Error('Failed to fetch subsidiaries');
        }
        
        const data: Subsidiary[] = await res.json();
        setSubsidiaries(data);
      } catch (error) {
        console.error('Error fetching subsidiaries:', error);
        setSubsidiaries([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSubsidiaries();
  }, []);

  return (
    <div className="container mx-auto p-4 min-h-screen flex flex-col justify-start pt-[2cm] md:pt-[3cm]">
      <div className="mb-8 text-center">
        <h1 className="text-xl md:text-3xl font-bold text-gray-800">자회사</h1>
      </div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <SubsidiaryList subsidiaries={subsidiaries} />
      )}
    </div>
  );
};

export default SubsidiaryPage;
