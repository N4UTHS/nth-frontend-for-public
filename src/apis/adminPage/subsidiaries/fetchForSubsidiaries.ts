// import { SubsidiaryProps } from "@/types/Props";

// export const fetchSubsidiaries = async (): Promise<SubsidiaryProps[]> => {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api${process.env.NEXT_PUBLIC_ADMIN_URL}`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${localStorage.getItem('token')}`,
//         },
//         credentials: 'include',
//     });

//     if (!response.ok) {
//         throw new Error('Failed to fetch subsidiaries');
//     }

//     return await response.json();
// };

// export const handleDeleteSubsidiary = async (id: string): Promise<void> => {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api${process.env.NEXT_PUBLIC_ADMIN_URL}`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${localStorage.getItem('token')}`,
//         },
//         credentials: 'include',
//         body: JSON.stringify({ id }),
//     });

//     if (!response.ok) {
//         throw new Error('자회사 삭제에 실패했습니다.');
//     }
// };

// export const handleUpdateSubsidiary = async (subsidiary: SubsidiaryProps): Promise<void> => {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api${process.env.NEXT_PUBLIC_ADMIN_URL}`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${localStorage.getItem('token')}`,
//         },
//         credentials: 'include',
//         body: JSON.stringify(subsidiary),
//     });

//     if (!response.ok) {
//         throw new Error('자회사 수정에 실패했습니다.');
//     }
// };

// export const handleCreateSubsidiary = async (newSubsidiary: Omit<SubsidiaryProps, '_id'>): Promise<SubsidiaryProps> => {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api${process.env.NEXT_PUBLIC_ADMIN_URL}`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${localStorage.getItem('token')}`,
//         },
//         credentials: 'include',
//         body: JSON.stringify(newSubsidiary),
//     });

//     if (!response.ok) {
//         throw new Error('자회사 추가에 실패했습니다.');
//     }

//     return await response.json();
// };
