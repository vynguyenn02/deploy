import React from "react";
import { Button, Carousel } from 'antd';
import { SearchOutlined, BellOutlined, QuestionCircleOutlined } from '@ant-design/icons';

const HeaderNews = () => {
    return (
    <>
        <h2 
          className="text-4xl font-bold mb-6" 
          style={{
            color: '#93A267', // Màu xanh lá như trong hình
            letterSpacing: '1px', // Khoảng cách giữa các chữ
          }}
        >
          TIN TỨC NÔNG NGHIỆP
        </h2>
        
        {/* Filter Buttons */}
        <div className="flex justify-start space-x-4 mb-8">
          {/* Các button filter (có thể kích hoạt nếu cần) */}
        </div>
    </>
    );
};

export default HeaderNews;
