'use client';

import AdminAnnouncementList from '@/components/Admin/Announcement/List';
import LoadingSpinner from '@/components/UI/Loading';
import useAdminAnnouncements from '@/hooks/adminPage/announcement/useAdminAnnouncementList';

const AdminAnnouncementPage: React.FC = () => {
  const { announcements, isLoading } = useAdminAnnouncements();

  return (
    <div className="container mx-auto p-4 min-h-screen flex flex-col justify-start pt-[2cm] md:pt-[3cm]">
      <div className="mb-8 text-center">
        <h1 className="text-xl md:text-3xl font-bold text-gray-800">공지사항 관리</h1>
      </div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <AdminAnnouncementList announcements={announcements} />
      )}
    </div>
  );
};

export default AdminAnnouncementPage;
