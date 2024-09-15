import React, { useState, useCallback, useEffect } from 'react';

interface Subsidiary {
  id: string;
  name: string;
  explain: string;
}

interface SubsidiaryListProps {
  subsidiaries: Subsidiary[];
}

const SubsidiaryList: React.FC<SubsidiaryListProps> = ({ subsidiaries }) => {
  const [selectedSubsidiary, setSelectedSubsidiary] = useState<Subsidiary | null>(null);

  const closePopup = useCallback(() => {
    setSelectedSubsidiary(null);
  }, []);

  const handleClickOutside = ((event: MouseEvent) => {
    if (event.target instanceof HTMLElement) {
      if (!event.target.closest('.popup')) {
        closePopup();
      }
    }
  });

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {subsidiaries.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">자회사가 없습니다.</p>
        ) : (
          subsidiaries.map((subsidiary) => (
            <div
              key={subsidiary.id}
              className="p-4 border rounded shadow-sm cursor-pointer"
              onClick={() => setSelectedSubsidiary(subsidiary)}
            >
              <h2 className="text-sm font-semibold">{subsidiary.name}</h2>
            </div>
          ))
        )}
      </div>

      {selectedSubsidiary && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg popup max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-2">{selectedSubsidiary.name}</h2>
            <p>{selectedSubsidiary.explain}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubsidiaryList;
