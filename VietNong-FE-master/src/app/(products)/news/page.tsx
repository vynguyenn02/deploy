"use client";
import React, { useEffect, useState } from 'react';
import Header from '@/layout/_component/Header/Header';
import Navbar from '@/layout/_component/Header/navbar/Navbar';
import HeaderNews from '@/components/_newssection/_component/HeaderNews';
import { fetchVietnameseNews } from '@/ultis/newsapi';
import { Article } from '@/type/news';
import NewsList from './_component/newlist';
const Page: React.FC = () => {
    const [articles, setArticles] = useState<Article[]>([]); // Khởi tạo state cho articles

    useEffect(() => {
        const loadNews = async () => {
            const news = await fetchVietnameseNews(); // Gọi hàm và đợi kết quả
            setArticles(news); // Cập nhật state với danh sách bài viết
        };

        loadNews(); // Gọi hàm này
    }, []);

    return (
        <div className="bg-gray-50">
            <Header />
            <Navbar />
            <div className='ml-4 mt-2'>
            <HeaderNews />
            <NewsList />
            </div>
           

        </div>
    );
};

export default Page;