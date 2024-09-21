'use client'

import React from 'react';
import SubsidiaryList from '@/components/NormalUserPage/Subsidiaries/List';
import LoadingSpinner from '@/components/UI/Loading';
import { useSubsidiaries } from '@/hooks/userPage/subsidiaries/useSubsidiaries';

const SubsidiaryPage: React.FC = () => {
  const { subsidiaries, isLoading } = useSubsidiaries();

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
