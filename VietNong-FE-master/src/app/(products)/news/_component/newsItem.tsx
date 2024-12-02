import Link from 'next/link';
import React from 'react';

interface NewsItemProps {
  title: string;
  date: string;
  description: string;
  imageUrl: string;
  url: string;
}

const NewsItem: React.FC<NewsItemProps> = ({ title, date, description, imageUrl, url }) => {
  return (
    <Link href={url} target="_blank" rel="noopener noreferrer" className="flex gap-4 border-b border-gray-300 pb-4 mb-4">
      <img src={imageUrl} alt={title} className="w-24 h-24 object-cover rounded-md" />
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-500">{date}</p>
        <p className="text-gray-700">{description}</p>
      </div>
    </Link>
  );
};

export default NewsItem;