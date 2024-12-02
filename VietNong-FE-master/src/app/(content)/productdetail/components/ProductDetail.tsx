"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getProductById } from '@/ultis/ProductOdata';
import Header from "@/layout/_component/Header/Header";
import Navbar from "@/layout/_component/Header/navbar/Navbar";
import productDefault from '../assets/product.jpeg'; // Ảnh mặc định
import Link from 'next/link';

const ProductDetail = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [productDetail, setProductDetail] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const id = searchParams.get('id');

    if (!id) {
      setError("Không có ID sản phẩm trong URL");
      setLoading(false);
      return;
    }

    const numericId = Number(id);
    if (isNaN(numericId)) {
      setError("ID không hợp lệ");
      setLoading(false);
      return;
    }

    const fetchProductDetail = async () => {
      try {
        const response = await getProductById(numericId);
        setProductDetail(response);
      } catch (error) {
        setError("Lỗi khi tải dữ liệu sản phẩm");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [searchParams]);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push({ 
      sellerid: productDetail.seller.sellerId,
      id: productDetail.productId, 
      name: productDetail.name, 
      price: productDetail.price, 
      quantity: 1 
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    router.push('/cart'); // Chuyển hướng đến trang giỏ hàng
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <Navbar />

      <div className="container mx-auto p-4">
        <nav className="text-gray-600 text-sm mb-4">
          <ul className="flex space-x-2">
            <li>
              <Link href="/product" className="hover:font-bold text-gray-800 transition duration-200">
                Chợ
              </Link>
            </li>
            <li>{'>'}</li>
            <li className="font-bold text-gray-800 hover:text-green-800 transition duration-200">
              {productDetail.name}
            </li>
          </ul>
        </nav>
      </div>

      <div className="flex flex-col md:flex-row items-center md:items-start">
        {/* Product Image */}
        <div className="md:w-1/2 p-4 flex justify-center">
          <img
            src={productDetail.productImage || productDefault}
            alt={productDetail.name}
            className="rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
            width={500}
            height={500}
          />
        </div>

        {/* Product Info */}
        <div className="md:w-1/2 p-4">
          <h2 className="text-2xl font-bold mb-2">{productDetail.name}</h2>
          <div className="text-gray-700 mb-4">
            <span className="text-lg font-bold">{productDetail.price.toLocaleString()} VND/kg</span>
          </div>
          <div className="flex items-center mb-4">
            <span className="text-yellow-500">⭐⭐⭐⭐☆</span>
            <span className="ml-2 text-gray-600">({productDetail.reviewCount} đánh giá)</span>
          </div>

          <h3 className="font-bold mb-2">Mô tả</h3>
          <p>{productDetail.description}</p>

          <h3 className="font-bold mb-2">Số lượng tồn kho</h3>
          <p>{productDetail.stockQuantity}</p>

          <div className="flex space-x-4">
            <button 
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200"
              onClick={handleAddToCart}
            >
              Thêm vào giỏ hàng
            </button>
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
              Mua ngay
            </button>
          </div>
        </div>
      </div>

      {/* Seller Info Section */}
      <div className="container mx-auto p-4 border-t mt-6">
        <div className="flex items-center mb-4">
          <img
            src={productDetail.seller.shopImage} // URL ảnh shop
            alt="Seller"
            className="rounded-full border border-gray-300 shadow-sm"
            width={60}
            height={60}
          />
          <div className="ml-4">
            <h3 className="text-lg font-bold">{productDetail.seller.shopName}</h3>
            <p className="text-sm text-gray-500">Online 1 giờ trước</p>
          </div>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <div>Đánh giá: {productDetail.seller.rating || 'Chưa có đánh giá'}</div>
          <div>Sản phẩm: {productDetail.seller.productCount || '0'}</div>
          <div>Tham gia: {new Date(productDetail.seller.createdAt).toLocaleDateString()}</div>
          <div>Người theo dõi: {productDetail.seller.followerCount || '0'}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;