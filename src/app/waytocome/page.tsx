'use client';

import { Suspense } from 'react';
import LoadingSpinner from '@/components/UI/Loading';
import MapComponent from '@/components/NormalUserPage/WayToCome/Map';
import TransportationInfo from '@/components/NormalUserPage/WayToCome/TransportationInfo';

const MainPage: React.FC = () => {
  return (
    <div className="container mx-auto p-2 min-h-screen flex flex-col justify-start pt-[2cm] md:pt-[3cm]">
      <div className="mb-7 text-center">
        <h1 className="text-xl md:text-3xl font-bold text-gray-800">오시는 길</h1>
      </div>
      <Suspense fallback={<LoadingSpinner />}>
        <MapComponent />
        <div className="hidden md:block">
          <TransportationInfo />
        </div>
      </Suspense>
    </div>
  );
};

export default MainPage;
