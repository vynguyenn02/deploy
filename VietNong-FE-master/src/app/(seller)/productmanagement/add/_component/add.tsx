"use client";

import './add.css';
import { useState } from 'react';
import { postProduct } from '@/ultis/ProductOdata'; // Sử dụng hàm postProduct

export default function Add() {
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [price, setPrice] = useState('');
  const [weight, setWeight] = useState('');
  const [description, setDescription] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [productImage, setProductImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Chuẩn bị FormData để gửi qua API
    const formData = new FormData();
    formData.append('Name', name);
    formData.append('CategoryId', categoryId);
    formData.append('Price', price);
    formData.append('Weight', weight || '0'); // Trọng lượng có thể không bắt buộc
    formData.append('Description', description || '');
    formData.append('StockQuantity', stockQuantity);
    if (productImage) {
      formData.append('ProductImage', productImage); // Hình ảnh
    }

    try {
      const response = await postProduct(formData); // Gửi dữ liệu qua API
      alert('Sản phẩm đã được thêm thành công!');
      console.log('Thêm sản phẩm:', response);
    } catch (error) {
      console.error('Lỗi khi thêm sản phẩm:', error);
      alert('Đã xảy ra lỗi khi thêm sản phẩm.');
    }
  };

  return (
    <div className="add-product">
      <form onSubmit={handleSubmit}>
        {/* Tên sản phẩm */}
        <div className="form-group">
          <label>Tên sản phẩm</label>
          <input
            type="text"
            placeholder="Tên sản phẩm"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Danh mục (CategoryId) */}
        <div className="form-group">
          <label>Danh mục (CategoryId)</label>
          <input
            type="number"
            placeholder="Danh mục"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          />
        </div>

        {/* Giá sản phẩm */}
        <div className="form-group">
          <label>Giá</label>
          <input
            type="number"
            placeholder="Giá sản phẩm"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        {/* Trọng lượng */}
        <div className="form-group">
          <label>Trọng lượng (kg)</label>
          <input
            type="number"
            placeholder="Trọng lượng sản phẩm"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>

        {/* Số lượng */}
        <div className="form-group">
          <label>Số lượng</label>
          <input
            type="number"
            placeholder="Số lượng"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(e.target.value)}
            required
          />
        </div>

        {/* Mô tả sản phẩm */}
        <div className="form-group">
          <label>Mô tả sản phẩm</label>
          <textarea
            placeholder="Mô tả sản phẩm"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Hình ảnh sản phẩm */}
        <div className="form-group">
          <label>Hình ảnh sản phẩm</label>
          <input
            type="file"
            onChange={(e) => setProductImage(e.target.files?.[0] || null)}
          />
        </div>

        {/* Nút submit */}
        <button type="submit" className="submit-button">
          Thêm sản phẩm
        </button>
      </form>
    </div>
  );
}
