import React from 'react';
import './refundpage.css';
import Sidebar from '@/layout/_component/Sidebar/sidebar';

const Refundpage = () => {
  return (
    <div className="order-page">
      
      {/* Sidebar */}
      <Sidebar></Sidebar>
      {/* Main Content */}
      
      <main className="main-content">

        {/* Order List */}
        <div className="order-list">
          {[1, 2, 3].map((order, index) => (
            <div key={index} className="order-item">
              <div className="order-info">
                <div className="order-shop">
                  <img src="/product.png" alt="product" />
                  <div>
                    <h4>Tên shop</h4>
                    <p>Tổng Hợp Các Loại Hạt Giống Dây ...</p>
                  </div>
                </div>
                <div className="order-details">
                  <p>Mã đơn hàng: 01234555678912345</p>
                  <p>Mã vận chuyển: 012345SEC285HJ</p>
                  <p>Giao hàng nhanh</p>
                </div>
                <div className="order-status">
                  <p>Chờ xác nhận</p>
                  <p>Doanh thu đơn hàng: 30,000₫</p>
                </div>
                <div className="order-actions">
                  <button>Xác nhận</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Refundpage;
