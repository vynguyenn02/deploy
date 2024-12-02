"use client"
import React, { useEffect, useState } from 'react';
import Sidebar from '@/layout/_component/Sidebar/sidebar';
import { StarIcon } from '@heroicons/react/24/solid';

const Feedback = () => {
    const [selectedTab, setSelectedTab] = useState("all");
    const [ratingCounts, setRatingCounts] = useState<number[]>([]);

    useEffect(() => {
        // Generate random counts for each rating on the client side
        setRatingCounts([5, 4, 3, 2, 1].map(() => Math.floor(Math.random() * 50)));
    }, []);

    const [feedbackList, setFeedbackList] = useState([
        {
            user: "Diễm Lâm",
            date: "03/06/2024",
            rating: 5,
            comment: "Sản phẩm tốt, đóng gói chắc chắn, giao hàng nhanh chóng. Lần sau sẽ ủng hộ shop",
            tags: ["Giao hàng nhanh chóng", "Chất lượng tốt", "Hàng chính hãng"]
        },
        // Add more feedback items as needed
    ]);

    const handleTabChange = (tab: string) => {
        setSelectedTab(tab);
    };

    return (
        <div className="bg-[#f9f8f4] min-h-screen flex">
            <Sidebar />

            <div className="flex-1 p-10">
                <h1 className="text-2xl font-semibold mb-6 text-gray-800">Đánh giá shop</h1>

                {/* Filter Section */}
                <div className="bg-white rounded-lg shadow p-4 mb-6">
                    <div className="flex items-center space-x-4 mb-4">
                        <input
                            type="text"
                            placeholder="Tên sản phẩm"
                            className="border border-gray-300 rounded-md p-2 w-1/2"
                        />
                        <input
                            type="text"
                            placeholder="Phân loại hàng"
                            className="border border-gray-300 rounded-md p-2 w-1/2"
                        />
                        <button className="bg-[#a3c35a] text-white px-4 py-2 rounded-md">Tìm</button>
                    </div>
                    
                    {/* Tabs for Feedback Status */}
                    <div className="flex border-b border-gray-200 space-x-6 text-gray-600">
                        <button
                            className={`pb-2 ${selectedTab === "all" ? "border-b-2 border-green-600 text-green-600" : ""}`}
                            onClick={() => handleTabChange("all")}
                        >
                            Tất cả
                        </button>
                        <button
                            className={`pb-2 ${selectedTab === "not-replied" ? "border-b-2 border-green-600 text-green-600" : ""}`}
                            onClick={() => handleTabChange("not-replied")}
                        >
                            Chưa trả lời
                        </button>
                        <button
                            className={`pb-2 ${selectedTab === "replied" ? "border-b-2 border-green-600 text-green-600" : ""}`}
                            onClick={() => handleTabChange("replied")}
                        >
                            Đã trả lời
                        </button>
                    </div>
                </div>

                {/* Rating Filters */}
                <div className="flex space-x-4 mb-6">
                    {[5, 4, 3, 2, 1].map((stars, index) => (
                        <button
                            key={stars}
                            className="flex items-center space-x-1 text-gray-600 hover:text-green-600"
                        >
                            <span>{stars} Sao ({ratingCounts[index] || 0})</span>
                        </button>
                    ))}
                </div>

                {/* Feedback List */}
                <div className="space-y-4">
                    {feedbackList.map((feedback, index) => (
                        <div key={index} className="bg-white rounded-lg shadow p-4">
                            <div className="flex items-center space-x-4 mb-2">
                                <img
                                    src="/user-avatar.png" // Replace with actual avatar path if available
                                    alt="User avatar"
                                    className="w-10 h-10 rounded-full"
                                />
                                <div>
                                    <p className="font-semibold">{feedback.user}</p>
                                    <p className="text-gray-500 text-sm">{feedback.date}</p>
                                </div>
                                <div className="flex items-center space-x-1 ml-auto">
                                    {[...Array(5)].map((_, i) => (
                                        <StarIcon key={i} className={`h-5 w-5 ${i < feedback.rating ? "text-yellow-400" : "text-gray-300"}`} />
                                    ))}
                                </div>
                            </div>
                            <p className="text-gray-700 mb-2">{feedback.comment}</p>
                            <div className="flex space-x-2 mb-2">
                                {feedback.tags.map((tag, i) => (
                                    <span key={i} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">{tag}</span>
                                ))}
                            </div>
                            <button className="text-green-600 font-semibold">Trả lời</button>
                        </div>
                    ))}
                </div>

                {/* Load More Button */}
                <div className="flex justify-center mt-6">
                    <button className="bg-[#a3c35a] text-white px-6 py-2 rounded-md">Xem thêm</button>
                </div>
            </div>
        </div>
    );
};

export default Feedback;
