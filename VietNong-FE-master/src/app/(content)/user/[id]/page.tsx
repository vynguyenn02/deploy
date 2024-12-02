"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Correct hook for App Router
import Header from '@/layout/_component/Header/Header';
import Navbar from '@/layout/_component/Header/navbar/Navbar';
import { User } from '@/type/user';
import { getUserById } from '@/ultis/UserAPI';

const UserProfilePage: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const userId = typeof window !== 'undefined' ? Number(localStorage.getItem('userId')) : null;
    const router = useRouter(); // Use useRouter from next/navigation in App Router

    useEffect(() => {
        const fetchUserData = async () => {
            if (!userId) {
                console.error('User ID not found in localStorage');
                return;
            }

            try {
                const fetchedUser = await getUserById(userId);
                setUser(fetchedUser);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [userId]);

    if (!user) {
        return <div>Loading...</div>;
    }
    return (
        <div className="bg-gray-100 min-h-screen">
            <Header />
            <Navbar />
            <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-6">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Xin chào {user.username} !!</h1>

                {/* Hình tròn của profile image */}
                <div className="flex justify-center mb-6">
                    <img
                        src={user.profileImage || "/default-profile.jpg"}  // Đường dẫn đến ảnh đại diện của người dùng hoặc ảnh mặc định
                        alt="Profile Image"
                        className="w-32 h-32 rounded-full object-cover"  // Các lớp CSS để tạo hình tròn
                    />
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-700">Tên đăng nhập:</span>
                        <span className="text-gray-600">{user.username}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-700">Họ Và Tên:</span>
                        <span className="text-gray-600">{user.fullName}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-700">Email:</span>
                        <span className="text-gray-600">{user.email}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-700">Số Điện Thoại:</span>
                        <span className="text-gray-600">{user.phoneNumber}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-700">Địa Chỉ:</span>
                        <span className="text-gray-600">{user.address}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-700">Ngày Sinh:</span>
                        <span className="text-gray-600">{new Date(user.dateOfBirth).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-700">Giới Tính:</span>
                        <span className="text-gray-600">{user.gender}</span>
                    </div>
                    <button
                        className="w-full mt-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                        onClick={() => router.push(`/user/edituser/${userId}`)}
                    >
                        Chỉnh Sửa Thông Tin Cá Nhân
                    </button>
                </div>
            </div>
        </div>

    );
};

export default UserProfilePage;
