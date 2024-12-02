import React from "react";
import { Button, Carousel } from 'antd';
import { SearchOutlined, BellOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import HeaderNews from "./_component/HeaderNews";
import NewsListhomepage from "./_component/hompagenewlist";

const NewsSection = () => {
    return (
       

<section className="py-12 bg-white">
  <div className="container mx-auto">
    {/* Header */}
    <HeaderNews></HeaderNews>
    {/* News Grid */}
    <NewsListhomepage></NewsListhomepage>

  </div>
</section>
    
    )
}

export default NewsSection;

