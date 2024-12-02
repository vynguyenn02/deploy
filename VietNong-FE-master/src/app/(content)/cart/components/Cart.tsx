"use client";
import React, { useEffect, useState } from "react";
import Header from "@/layout/_component/Header/Header";
import Navbar from "@/layout/_component/Header/navbar/Navbar";
import { getProducts } from '@/ultis/ProductOdata'; // Giả định bạn đã định nghĩa hàm này
import { CartItem } from "./CartItem";
import { CartItemProps } from "@/type/cart";
import { ProductCard } from "./ProductCard";
import createOrderApi from "@/ultis/OrderOdata";
import { OrderRequest } from "@/type/order";
import { getUserById } from "@/ultis/UserAPI";

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItemProps[]>([]);
  const [suggestedProducts, setSuggestedProducts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [buyerName, setBuyerName] = useState<string | null>(null);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    const name = localStorage.getItem('username'); 
    setBuyerName(name); // Cập nhật state với tên
    
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(savedCart);
    calculateTotalAmount(savedCart); // Tính tổng số tiền khi khởi động

    // Lấy thông tin người dùng
    const userId = Number(localStorage.getItem('userId'));
    if (userId) {
      getUserById(userId).then(user => {
        setPhoneNumber(user.phoneNumber); // Giả định user có thuộc tính phoneNumber
        setAddress(user.address); // Giả định user có thuộc tính address
      }).catch(error => {
        console.error('Error fetching user data:', error);
      });
    }

    const fetchSuggestedProducts = async () => {
      try {
        const response = await getProducts(1, 10); // Lấy sản phẩm gợi ý
        if (!Array.isArray(response.data)) {
          throw new Error('Invalid response format');
        }
        setSuggestedProducts(response.data.slice(0, 10));
        setError(null);
      } catch (error) {
        setSuggestedProducts([]);
        setError('Không có sản phẩm nào.');
        console.error('Error loading products:', error);
      }
    };

    fetchSuggestedProducts();
  }, []);

  const calculateTotalAmount = (items: CartItemProps[]) => {
    const total = items.reduce((total, item) => total + item.price * item.quantity, 0);
    setTotalAmount(total);
  };

  const handleQuantityChange = (index: number, newQuantity: number) => {
    const updatedItems = [...cartItems];
    updatedItems[index].quantity = newQuantity;
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
    calculateTotalAmount(updatedItems);
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
    calculateTotalAmount(updatedItems);
  };

  const handleOrder = async () => {
    const orderData: OrderRequest = {
      buyerId: Number(localStorage.getItem('userId')),
      totalAmount: totalAmount,
      status: "Pending",
      details: cartItems.map(item => ({
        productId: item.id,
        sellerId: item.sellerid,
        productName: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      description: "Order description",
      returnUrl: "http://localhost:3000/orderstate/payment-succes?code=00&id=8e423416d50f4ff8b137cc08e4908d31&status=SUCCESS&orderCode=722211",
      cancelUrl: "http://localhost:3000/orderstate/payment-failed?code=00&id=8e423416d50f4ff8b137cc08e4908d31&cancel=true&status=CANCELLED&orderCode=722211"
    };
  
    try {
      const data = await createOrderApi(orderData);
      const checkoutUrl = data.paymentLink.checkoutUrl;
      window.location.href = checkoutUrl;

      // Xóa giỏ hàng sau khi thanh toán thành công
      setCartItems([]);
      localStorage.removeItem('cart');
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Địa Chỉ Nhận Hàng</h2>
          <div className="border p-4 mb-4">
            <p className="font-semibold">Tên Đặt: <span className="font-normal">{buyerName || 'Chưa có tên'}</span></p>
            <p className="font-semibold">Số Điện Thoại: <span className="font-normal">{phoneNumber || 'Chưa có số điện thoại'}</span></p>
            <p className="font-semibold">Địa Chỉ: <span className="font-normal">{address || 'Chưa có địa chỉ'}</span></p>
          </div>

          <h3 className="text-xl font-bold mb-4">Sản Phẩm</h3>
          <div className="bg-gray-100 p-4 rounded mb-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-4 text-gray-500">Giỏ hàng của bạn đang trống.</div>
            ) : (
              <div>
                <div className="flex items-center justify-between p-4 font-semibold">
                  <span className="w-2/5">Sản phẩm</span>
                  <span className="w-1/4 text-center">Đơn giá</span>
                  <span className="w-1/12 text-center">Số lượng</span>
                  <span className="w-1/4 text-center">Thành tiền</span>
                  <span className="w-1/5 text-center">Thao Tác</span>
                </div>
                {cartItems.map((item, index) => (
                  <CartItem
                    key={item.id}
                    {...item}
                    onQuantityChange={(newQuantity) => handleQuantityChange(index, newQuantity)}
                    onRemove={() => handleRemoveItem(index)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-between items-center font-semibold">
            <span>Tổng Cộng:</span>
            <span>{totalAmount.toLocaleString()} VND</span>
          </div>

          <h3 className="text-xl font-bold mt-8">Phương Thức Thanh Toán</h3>
          <div className="border p-4 mb-4">
            <p className="font-semibold">Hình Thức: <span className="font-normal">Thanh toán bằng QR Code</span></p>
            <p className="font-semibold">Tổng thanh toán: <span className="font-normal">{totalAmount.toLocaleString()} VND</span></p>
          </div>

          <button 
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-200"
            onClick={handleOrder}
          >
            Đặt Hàng
          </button>
        </div>

        <h3 className="text-lg font-bold mt-8">Có thể bạn sẽ thích</h3>
        {error && <div className="text-red-500">{error}</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {suggestedProducts.map((product) => (
            <ProductCard key={product.productId} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;