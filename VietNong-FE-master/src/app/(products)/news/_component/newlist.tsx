"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import NewsItem from "./newsItem";

interface Article {
  title: string;
  publishedAt: string;
  description: string;
  urlToImage: string;
  url: string; // Thêm thuộc tính url

}

const NewsList: React.FC = () => {
  const [newsData, setNewsData] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(9); // Number of articles per page
  const [totalCount, setTotalCount] = useState<number>(0);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`https://newsapi.org/v2/everything?q=agriculture&apiKey=6f7f2261d23643a48779f0aa0c32342c&page=${currentPage}&pageSize=${pageSize}`);
        setNewsData(response.data.articles);
        setTotalCount(response.data.totalResults);
      } catch (error) {
        setError('Error loading news articles');
        console.error('Error loading news articles:', error);
      }
    };

    fetchNews();
  }, [currentPage, pageSize]);

  useEffect(() => {
    window.history.pushState(null, '', `?page=${currentPage}`);
  }, [currentPage]);

  const totalPages = Math.ceil(totalCount / pageSize);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`px-3 py-2 rounded-lg transition-colors duration-200 ${
            i === currentPage ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:cursor-pointer'
          }`}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      {/* Error handling */}
      {error && <p className="text-red-500">{error}</p>}

      {/* News articles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsData.length > 0 ? (
          newsData.map((news) => (
            <div 
              key={news.title} 
              className="bg-white shadow-md rounded-lg p-4 transition-transform duration-200 hover:scale-105 cursor:pointer"
            >
              <NewsItem
                title={news.title}
                date={new Date(news.publishedAt).toLocaleDateString()}
                description={news.description}
                imageUrl={news.urlToImage}
                url={news.url} // Đảm bảo bạn truyền vào prop url

              />
            </div>
          ))
        ) : (
          <p>No news articles available</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="text-center mt-10 flex items-center justify-center space-x-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-400 transition-colors duration-200 cursor-pointer"
        >
          Trang Trước
        </button>
        <div className="flex items-center space-x-2">
          {renderPageNumbers()}
        </div>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 cursor-pointer"
        >
          Trang Tiếp
        </button>
      </div>
    </div>
  );
};

export default NewsList;