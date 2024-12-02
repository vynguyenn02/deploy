"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { getOrderApi } from "@/ultis/OrderOdata";
import { getOrderDetailApi } from "@/ultis/OrderOdata";
import { getProductById } from "@/ultis/ProductOdata";
import Header from "@/layout/_component/Header/Header";
import Navbar from "@/layout/_component/Header/navbar/Navbar";

const OrderForm: React.FC = () => {
  const router = useRouter(); // Khởi tạo router
  const [orders, setOrders] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setError("Không tìm thấy ID người dùng.");
        return;
      }

      const fetchedOrders = await getOrderApi(Number(userId));
      const ordersWithDetails = await Promise.all(
        fetchedOrders.map(async (order: any) => {
          const orderDetails = await getOrderDetailApi(order.orderId);
          const productDetails = await Promise.all(
            orderDetails.map((detail: any) => getProductById(detail.productId))
          );

          return { ...order, details: orderDetails, products: productDetails };
        })
      );

      setOrders(ordersWithDetails);
    } catch (err) {
      setError("Không thể tải dữ liệu đơn hàng.");
    }
  };

  const handleProductClick = (productId: number) => {
    // Điều hướng tới trang productdetail?id=<productId>
    router.push(`/productdetail?id=${productId}`);
  };

  return (
    <div>
      <Header />
      <Navbar></Navbar>
      <div className="max-w-6xl mx-auto p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">Danh Sách Đơn Hàng</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}

        {orders.length === 0 && !error && (
          <p className="text-gray-500 text-center">Bạn chưa có đơn hàng nào.</p>
        )}

        {orders.map((order) => (
          <div
            key={order.orderId}
            className="bg-white shadow-lg rounded-lg mb-6 p-6 hover:shadow-xl transition-shadow duration-300"
          >
            {/* Order Header */}
            <div className="flex items-center justify-between border-b pb-4 mb-4">
              <div className="flex items-center gap-4">
                <img
                  src={order.products[0]?.seller?.shopImage || "/placeholder.jpg"}
                  alt={order.products[0]?.seller?.shopName || "Product image"}
                  className="w-20 h-20 object-cover rounded-md border"
                />
                <div>
                  <h2 className="font-bold text-lg text-gray-700">
                    {order.products[0]?.seller?.shopName || "Tên cửa hàng"}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {order.products[0]?.seller?.status || "Trạng thái đơn hàng: đang giao"}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-red-500">
                  Thành tiền: {order.totalAmount?.toLocaleString()} VNĐ
                </p>
                <p className="text-sm text-gray-500">
                  Ngày đặt: {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Order Details */}
            <div>
              {order.details.map((detail: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center gap-4 mb-4 p-4 bg-gray-50 rounded-md shadow-inner cursor-pointer hover:bg-gray-100"
                  onClick={() => handleProductClick(order.products[index]?.productId)} // Thêm sự kiện onClick
                >
                  <img
                    src={order.products[index]?.productImage || "/placeholder.jpg"}
                    alt={order.products[index]?.name || "Product name"}
                    className="w-16 h-16 object-cover rounded-md border"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-700">
                      {order.products[index]?.name || "Tên sản phẩm"}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Phân loại: {detail.variant || "N/A"} - Số lượng: {detail.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 mt-4">
              <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all duration-200">
                Liên hệ người bán
              </button>
              <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-all duration-200">
                Đánh giá
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderForm;
