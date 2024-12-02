// src/components/SellerPage.jsx
import React from "react";
import './welcomepage.css';

import { Button, Carousel } from 'antd';
const Welcomepage = () => {
  return (
    <div className="seller-page">
      {/* Main Content */}
      <div className="main-content">
        <div className="welcome-box">
          <h2>Chào mừng bạn đến với VIỆT NÔNG - Kênh Người Bán</h2>
          <p>
            Việt Nông - Kênh Người Bán là công cụ quản lý shop, giúp bạn dễ phân loại sản phẩm,
            theo dõi đơn hàng chăm sóc khách hàng và đánh giá hoạt động của shop.
          </p>
          <Button type="link" className="btn_next mt-5" href="/productmanagement/all">
            Tiếp theo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Welcomepage;
