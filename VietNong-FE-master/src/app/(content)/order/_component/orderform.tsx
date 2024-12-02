"use client"

import React, { useEffect, useState } from "react";
import { getOrderApi } from "@/ultis/OrderOdata";
import { getOrderDetailApi } from "@/ultis/OrderOdata";
import { getProductById } from "@/ultis/ProductOdata";
const OrderForm: React.FC = () => {
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
            orderDetails.map((detail: any) =>
              getProductById(detail.productId)
            )
          );

          return { ...order, details: orderDetails, products: productDetails };
        })
      );

      setOrders(ordersWithDetails);
    } catch (err) {
      setError("Không thể tải dữ liệu đơn hàng.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Danh Sách Đơn Hàng</h1>
        {error && <p className="text-red-500">{error}</p>}
        {orders.map((order) => (
          <div key={order.orderId} className="bg-white shadow-md rounded-md mb-4 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={order.products[0]?.seller?.shopImage || "/placeholder.jpg"}
                  alt={order.products[0]?.seller?.shopName || "Product image"}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div>
                  <h2 className="font-bold text-lg">{order.products[0]?.seller?.shopName || "Tên cửa hàng"}</h2>
                  <p className="text-gray-500">{order.products[0]?.seller?.status || "Trạng thái đơn hàng : đang giao"}</p>
                </div>
              </div>
              <div>
                <p className="text-lg font-semibold text-red-500">
                  Thành tiền: {order.totalAmount?.toLocaleString()} VNĐ
                </p>
                <p className="text-sm text-gray-500">Ngày đặt: {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="mt-4">
              {order.details.map((detail: any, index: number) => (
                <div key={index} className="flex items-center gap-4 mb-4">
                  <img
                    src={order.products[index]?.productImage || "/placeholder.jpg"}
                    alt={order.products[index]?.name || "Product name"}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{order.products[index]?.name || "Tên sản phẩm"}</h3>
                    <p className="text-gray-500">
                      Phân loại: {detail.variant || "N/A"} - Số lượng: {detail.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2">
              <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600">
                Liên hệ người bán
              </button>
              <button className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600">
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
