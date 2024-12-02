"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

interface Article {
  title: string;
  publishedAt: string;
  description: string;
  urlToImage: string;
  url: string;
}

const NewsListhomepage: React.FC = () => {
  const [newsData, setNewsData] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`https://newsapi.org/v2/everything?q=agriculture&apiKey=6f7f2261d23643a48779f0aa0c32342c&pageSize=10&sortBy=popularity`);
        setNewsData(response.data.articles);
      } catch (error) {
        setError('Error loading news articles');
        console.error('Error loading news articles:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="bg-gray-50 p-4">
      {error && <p className="text-red-500">{error}</p>}

      <Swiper
        spaceBetween={20}
        slidesPerView={2}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {newsData.length > 0 ? (
          newsData.map((news) => (
            <SwiperSlide key={news.title} className="flex flex-col">
              <a
                href={news.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full"
              >
                <img
                  src={news.urlToImage || "https://via.placeholder.com/600x400"}
                  alt={news.title}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                <div className="absolute top-4 left-4 bg-[#93A267] text-white px-3 py-1 rounded-full shadow-md">
                  Top 10 tháng
                </div>
                <div className="p-6 bg-white rounded-b-xl flex flex-col justify-between h-48">
                  <h3 className="text-xl font-semibold text-[#93A267] mb-2 line-clamp-2">{news.title}</h3>
                  <p className="text-gray-700 mb-4 line-clamp-3 overflow-hidden" style={{ maxHeight: "3rem" }}>
                    {news.description}
                  </p>
                  <span className="text-[#93A267] font-semibold">Đọc tiếp</span>
                </div>
              </a>
            </SwiperSlide>
          ))
        ) : (
          <p>No news articles available</p>
        )}
      </Swiper>
    </div>
  );
};

export default NewsListhomepage;