// import { useState, useEffect, useCallback } from 'react';
// import { useRouter } from 'next/navigation';
// import { SubsidiaryProps } from '@/types/Props';
// import { fetchSubsidiaries, handleDeleteSubsidiary, handleUpdateSubsidiary, handleCreateSubsidiary } from '@/apis/adminPage/subsidiaries/fetchForSubsidiaries';

// export const useSubsidiaries = () => {
//   const [subsidiaries, setSubsidiaries] = useState<SubsidiaryProps[]>([]);
//   const [selectedSubsidiary, setSelectedSubsidiary] = useState<SubsidiaryProps | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [isAdding, setIsAdding] = useState<boolean>(false);
//   const router = useRouter();

//   useEffect(() => {
//     async function loadSubsidiaries() {
//       try {
//         const data = await fetchSubsidiaries();
//         setSubsidiaries(data);
//       } catch (error) {
//         console.error('Error fetching subsidiaries:', error);
//         setSubsidiaries([]);
//         router.push('/');
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     loadSubsidiaries();
//   }, [router]);

//   const closePopup = useCallback(() => {
//     setSelectedSubsidiary(null);
//     setIsAdding(false);
//   }, []);

//   const deleteSubsidiary = async (id: string) => {
//     try {
//       await handleDeleteSubsidiary(id);
//       setSubsidiaries(subsidiaries.filter((subsidiary) => subsidiary._id !== id));
//       closePopup();
//     } catch (error) {
//       console.error('Error deleting subsidiary:', error);
//     }
//   };

//   const updateSubsidiary = async () => {
//     if (selectedSubsidiary) {
//       try {
//         await handleUpdateSubsidiary(selectedSubsidiary);
//         setSubsidiaries(subsidiaries.map((subsidiary) =>
//           subsidiary._id === selectedSubsidiary._id ? selectedSubsidiary : subsidiary
//         ));
//         closePopup();
//       } catch (error) {
//         console.error('Error updating subsidiary:', error);
//       }
//     }
//   };

//   const createSubsidiary = async (newSubsidiary: Omit<SubsidiaryProps, '_id'>) => {
//     try {
//       const createdSubsidiary = await handleCreateSubsidiary(newSubsidiary);
//       setSubsidiaries([...subsidiaries, createdSubsidiary]);
//       closePopup();
//     } catch (error) {
//       console.error('Error creating subsidiary:', error);
//     }
//   };

//   return {
//     subsidiaries,
//     selectedSubsidiary,
//     setSelectedSubsidiary,
//     isLoading,
//     isAdding,
//     setIsAdding,
//     closePopup,
//     deleteSubsidiary,
//     updateSubsidiary,
//     createSubsidiary,
//   };
// };
