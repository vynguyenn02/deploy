"use client";

import React, { useState } from 'react';
import Sidebar from '@/layout/_component/Sidebar/sidebar';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

const List = () => {
    const [image, setImage] = useState<File | null>(null);
    const [description, setDescription] = useState("");

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    return (
        <div className="bg-[#f9f8f4] min-h-screen flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 p-10">
                <h1 className="text-2xl font-semibold mb-6 text-gray-800">Danh mục shop</h1>

                {/* Shop Information Section */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">THÔNG TIN SHOP</h2>
                    
                    <div className="flex items-center space-x-6">
                        {/* Image Upload Section */}
                        <div className="bg-gray-100 border border-gray-300 rounded-lg w-48 h-32 flex items-center justify-center cursor-pointer">
                            {image ? (
                                <img src={URL.createObjectURL(image)} alt="Uploaded" className="object-cover w-full h-full rounded-lg" />
                            ) : (
                                <label htmlFor="image-upload" className="flex flex-col items-center text-gray-500">
                                    <CloudArrowUpIcon className="h-8 w-8 mb-1" />
                                    <span>Upload Image</span>
                                    <input
                                        id="image-upload"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageUpload}
                                    />
                                </label>
                            )}
                        </div>

                        {/* Description Input Section */}
                        <textarea
                            placeholder="Nhập thông tin miêu tả"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full h-32 bg-gray-100 border border-gray-300 rounded-lg p-2 text-gray-700"
                        />
                    </div>
                </div>

                {/* Category Navigation */}
                <div className="flex justify-between items-center mt-6 p-4 bg-[#f5f5ed] rounded-lg shadow">
                    {["Dạo", "Tất cả sản phẩm", "Hạt giống rau", "Hạt giống hoa", "Dụng cụ làm vườn"].map((category, index) => (
                        <button key={index} className="text-gray-600 font-medium hover:text-gray-800">
                            {category}
                        </button>
                    ))}
                    <div className="flex items-center space-x-1 text-gray-600 cursor-pointer">
                        <span>Thêm</span>
                        <ChevronDownIcon className="h-4 w-4" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default List;
