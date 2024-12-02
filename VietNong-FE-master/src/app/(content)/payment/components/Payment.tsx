"use client";

import React, { useState } from "react";
import Header from "@/layout/_component/Header/Header";
import Navbar from "@/layout/_component/Header/navbar/Navbar";

const Payment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState({
    name: "Nhanh",
    cost: 32200,
    details: "Đảm bảo nhận hàng từ ngày 27 tháng 9 - ngày 28 tháng 9",
  });

  // Toggle Modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Handle Shipping Selection
  const handleShippingSelection = (name: string, cost: number, details: string) => {
    setSelectedShipping({ name, cost, details });
  };

  // Complete the selection and close the modal
  const completeShippingSelection = () => {
    toggleModal(); // Close the modal
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <Navbar />
      <div className="container mx-auto mt-6 px-4">
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md">
        {/* Shipping Address */}
        <div className="border p-4 mb-6 bg-gray-100">
          <h2 className="text-lg font-bold text-green-600 mb-2">Địa Chỉ Nhận Hàng</h2>
          <p>Tân Đạt (+84) 975232987</p>
          <p>Vinhomes Grandpark, 501.03, Đường Nguyễn Xiển, Phường Long Bình, Thành Phố Thủ Đức, TP. Hồ Chí Minh</p>
          <button className="text-blue-500" onClick={toggleModal}>
            Thay đổi
          </button>
        </div>

        {/* Product Details */}
        <h3 className="text-lg font-semibold mb-4">Sản phẩm</h3>
        <div className="border p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <img src="/path/to/product-image.jpg" alt="Nông Sản Vàng" className="w-16 h-16" />
            <div className="flex-1 ml-4">
              <p className="font-semibold">Nông Sản Vàng</p>
              <p>Tổng Hợp Các Loại Hạt giống...</p>
              <p>Loại: Bầu dài</p>
            </div>
            <div className="text-right">
              <p>đ55.000</p>
              <p>x2</p>
              <p>đ110.000</p>
            </div>
          </div>
          <input
            type="text"
            placeholder="Lưu ý cho người bán..."
            className="w-full p-2 border mb-2"
          />
          <div className="flex justify-between">
            <span>Đơn vị vận chuyển: {selectedShipping.name}</span>
            <button className="text-blue-500" onClick={toggleModal}>
              Thay Đổi
            </button>
            <span>đ{new Intl.NumberFormat('vi-VN').format(selectedShipping.cost)}</span>
          </div>
        </div>

        {/* Payment Method */}
        <h3 className="text-lg font-semibold mb-2">Phương Thức Thanh Toán:</h3>
        <div className="border p-4 mb-6">
          <div className="flex space-x-4 mb-2">
            <button className="py-1 px-3 border-b-2 border-green-600 focus:outline-none">
              Thẻ tín dụng/Chỉ nd
            </button>
            <button className="py-1 px-3 border-b-2 border-transparent focus:outline-none">
              Thanh toán khi nhận hàng
            </button>
          </div>
          <div className="flex items-center mb-2">
            <input type="radio" name="paymentMethod" checked />
            <img src="/path/to/visa-icon.png" alt="Visa" className="w-6 h-6 ml-2" />
            <span className="ml-2">TPBank ****6789</span>
          </div>
          <button className="text-blue-500">+ Thẻ Khác</button>
        </div>

        {/* Order Summary */}
        <div className="border-t pt-4">
          <div className="flex justify-between mb-2">
            <p>Tổng tiền hàng</p>
            <p>đ110.000</p>
          </div>
          <div className="flex justify-between mb-2">
            <p>Chi phí vận chuyển</p>
            <p>đ{new Intl.NumberFormat('vi-VN').format(selectedShipping.cost)}</p>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <p>Tổng thanh toán</p>
            <p>đ{new Intl.NumberFormat('vi-VN').format(110000 + selectedShipping.cost)}</p>
          </div>
        </div>

        <button className="mt-6 w-full bg-green-500 text-white py-3 rounded">
          Đặt hàng
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
              <h3 className="text-xl font-semibold mb-4">Chọn đơn vị vận chuyển</h3>
              <div
                className="border-b mb-4 pb-4 cursor-pointer"
                onClick={() => handleShippingSelection("Nhanh", 32200, "Đảm bảo nhận hàng từ ngày 27 tháng 9 - ngày 28 tháng 9")}
              >
                <div className="flex justify-between items-center mb-2">
                  <span>Nhanh</span>
                  <span className="text-green-600">đ32.200</span>
                </div>
                <p className="text-sm text-gray-500">
                  Đảm bảo nhận hàng từ ngày 27 tháng 9 - ngày 28 tháng 9
                </p>
              </div>

              <div
                className="border-b mb-4 pb-4 cursor-pointer"
                onClick={() => handleShippingSelection("Hỏa tốc", 112200, "Đảm bảo nhận hàng trong ngày hôm nay")}
              >
                <div className="flex justify-between items-center mb-2">
                  <span>Hỏa tốc</span>
                  <span className="text-green-600">đ112.200</span>
                </div>
                <p className="text-sm text-gray-500">
                  Đảm bảo nhận hàng trong ngày hôm nay
                </p>
              </div>

              <div
                className="border-b mb-4 pb-4 cursor-pointer"
                onClick={() => handleShippingSelection("Hàng công kênh", 60000, "Quá khổ quá tải giao trong 3 ngày")}
              >
                <div className="flex justify-between items-center mb-2">
                  <span>Hàng công kênh</span>
                  <span className="text-green-600">đ60.000</span>
                </div>
                <p className="text-sm text-gray-500">Quá khổ quá tải giao trong 3 ngày</p>
              </div>

              <div className="flex justify-between">
                <button
                  className="bg-gray-200 text-gray-800 py-2 px-4 rounded"
                  onClick={toggleModal}
                >
                  Trở Lại
                </button>
                <button
                  className="bg-green-500 text-white py-2 px-4 rounded"
                  onClick={completeShippingSelection}
                >
                  Hoàn Thành
                </button>
              </div>
            </div>
          </div>
          
        </>
      )}
      </div>
    </div>
  );
};

export default Payment;
