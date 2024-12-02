"use client";

import React, { useState } from 'react';
import Sidebar from '@/layout/_component/Sidebar/sidebar';

const BankAccount = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="bg-[#f9f8f4] min-h-screen flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 p-10">
                <h1 className="text-2xl font-semibold mb-6 text-gray-800">Tài khoản ngân hàng</h1>

                {/* Add Bank Account Section */}
                <div
                    onClick={openModal}
                    className="border-2 border-dashed border-gray-300 rounded-lg w-full h-48 flex items-center justify-center cursor-pointer"
                >
                    <span className="text-gray-500 text-3xl">+</span>
                </div>

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-8 w-96 relative">
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                            >
                                &times;
                            </button>
                            <h2 className="text-lg font-semibold mb-4">Thêm tài khoản ngân hàng</h2>
                            <form className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Tên"
                                    className="w-full border border-gray-300 rounded-md p-2"
                                />
                                <input
                                    type="text"
                                    placeholder="Số CCCD"
                                    className="w-full border border-gray-300 rounded-md p-2"
                                />
                                <input
                                    type="text"
                                    placeholder="Tên chủ tài khoản"
                                    className="w-full border border-gray-300 rounded-md p-2"
                                />
                                <input
                                    type="text"
                                    placeholder="Số tài khoản"
                                    className="w-full border border-gray-300 rounded-md p-2"
                                />
                                <input
                                    type="text"
                                    placeholder="Tên ngân hàng"
                                    className="w-full border border-gray-300 rounded-md p-2"
                                />
                                <input
                                    type="text"
                                    placeholder="Khu vực"
                                    className="w-full border border-gray-300 rounded-md p-2"
                                />
                                <input
                                    type="text"
                                    placeholder="Tên chi nhánh ngân hàng (Theo thông tin sao kê)"
                                    className="w-full border border-gray-300 rounded-md p-2"
                                />
                                <div className="flex justify-end space-x-2 mt-6">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
                                    >
                                        Hủy
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-[#a3c35a] text-white px-4 py-2 rounded-md"
                                    >
                                        Lưu
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BankAccount;
