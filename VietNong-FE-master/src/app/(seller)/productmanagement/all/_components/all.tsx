"use client"
import React, { useEffect, useState } from "react";
import './all.css';
import Sidebar from '@/layout/_component/Sidebar/sidebar';
import { getSellerProducts, putProduct } from '@/ultis/ProductOdata';
import { CSSProperties } from "react";  // Import CSSProperties
import { getProductById } from '@/ultis/ProductOdata'; // Đảm bảo bạn đã import hàm này


export interface Product {
  productId: number;
  name: string;
  categoryId: number;
  price: number;
  weight: number;
  description: string;
  stockQuantity: number;
  reviewCount: number;
  productImage: string; 
  createdAt: string; // Ngày tạo
}
const All = () => {
  const [products, setProducts] = useState<any[]>([]); // State để lưu sản phẩm
  const [loading, setLoading] = useState<boolean>(false); // State để kiểm tra trạng thái tải
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false); // State để kiểm tra popup có mở hay không
  const [productToEdit, setProductToEdit] = useState<any | null>(null); // State lưu sản phẩm đang chỉnh sửa

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getSellerProducts(); // Gọi API để lấy sản phẩm
        setProducts(data); // Lưu dữ liệu vào state
      } catch (error) {
        console.error('Lỗi khi lấy sản phẩm:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Chạy khi component mount

  const openPopup = async (product: any) => {
    if (!product.productId) {
      console.error('Invalid product ID');
      return;
    }
    setProductToEdit(product);
    setIsPopupOpen(true);
  
    try {
      const fetchedProduct = await getProductById(product.productId); // Gọi API để lấy chi tiết sản phẩm
      setProductToEdit(fetchedProduct);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };
  
  const closePopup = () => {
    setIsPopupOpen(false); // Đóng popup
    setProductToEdit(null); // Reset sản phẩm đang chỉnh sửa
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (productToEdit) {
      setProductToEdit({
        ...productToEdit,
        [e.target.name]: e.target.value, // Cập nhật giá trị input hoặc textarea vào state
      });
    }
  };
  
  
  const handleSaveChanges = async () => {
    if (productToEdit) {
      try {
        const productData: Product = {
          productId: productToEdit.productId,
          name: productToEdit.name,
          categoryId: productToEdit.categoryId,
          price: productToEdit.price,
          stockQuantity: productToEdit.stockQuantity,
          weight: productToEdit.weight,  // Cập nhật thêm thuộc tính cân nặng
          description: productToEdit.description,  // Mô tả sản phẩm
          
          reviewCount: productToEdit.reviewCount,  // Số lượng đánh giá
          productImage: productToEdit.productImage,  // Ảnh sản phẩm
          createdAt: productToEdit.createdAt,  // Ngày tạo nếu cần
        };
  
        const updatedProduct = await putProduct(productData.productId, productData);
        setProducts(products.map((product) =>
          product.productId === updatedProduct.productId ? updatedProduct : product
        ));
        closePopup();
      } catch (error) {
        console.error('Error updating product:', error);
      }
    }
  };
  
  // Inline styles for popup and elements
  const popupOverlayStyle: CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const popupStyle: CSSProperties = {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "400px",
  };

  const inputStyle: CSSProperties = {
    width: "100%",
    padding: "8px",
    margin: "10px 0",
  };

  const buttonStyle: CSSProperties = {
    padding: "10px 20px",
    marginRight: "10px",
    cursor: "pointer",
  };

  return (
    <div className="seller-dashboard">
      <Sidebar />
      <main className="content">
        <header className="top-bar">
          <input type="text" placeholder="Tìm kiếm" className="search-bar" />
        </header>

        <section className="product-list">
          <div className="filter-buttons">
            <button className="btn btn-active">Tất cả</button>
            <button className="btn">Còn hàng</button>
            <button className="btn">Hết hàng</button>
          </div>

          <table className="product-table">
            <thead>
              <tr>
                <th>Tên sản phẩm</th>
                <th>Phân loại hàng</th>
                <th>Giá</th>
                <th>Kho hàng</th>
                <th>Thông tin</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5}>Đang tải...</td>
                </tr>
              ) : Array.isArray(products) && products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.productId}>
                    <td className="product-name">
                      <img
                        src={product.productImage || 'https://via.placeholder.com/100'}
                        alt="product"
                        className="product-image"
                      />
                      <span>{product.name}</span>
                    </td>
                    <td>
                      <ul>
                        <li>{product.categoryId}</li>
                      </ul>
                    </td>
                    <td>{product.price} đ</td>
                    <td>{product.stockQuantity}</td>
                    <td>
                      <button
                        className="btn"
                        onClick={() => openPopup(product)}
                      >
                        Sửa
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>Không có sản phẩm nào</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </main>

      {/* Popup Edit Product */}
      {isPopupOpen && productToEdit && (
  <div style={popupOverlayStyle}>
    <div style={popupStyle}>
      <h2>Chỉnh sửa sản phẩm</h2>

      {/* Các trường khác */}
      <div>
        <label>Tên sản phẩm</label>
        <input
          type="text"
          name="name"
          value={productToEdit.name}
          onChange={handleInputChange}
          style={inputStyle}
        />
      </div>
      <div>
        <label>Phân loại hàng</label>
        <input
          type="text"
          name="categoryId"
          value={productToEdit.categoryId}
          onChange={handleInputChange}
          style={inputStyle}
        />
      </div>
      <div>
        <label>Giá</label>
        <input
          type="number"
          name="price"
          value={productToEdit.price}
          onChange={handleInputChange}
          style={inputStyle}
        />
      </div>
      <div>
        <label>Số lượng kho</label>
        <input
          type="number"
          name="stockQuantity"
          value={productToEdit.stockQuantity}
          onChange={handleInputChange}
          style={inputStyle}
        />
      </div>
      <div>
        <label>Cân nặng</label>
        <input
          type="number"
          name="weight"
          value={productToEdit.weight}
          onChange={handleInputChange}
          style={inputStyle}
        />
      </div>
      <div>
        <label>Mô tả</label>
        <textarea
          name="description"
          value={productToEdit.description}
          onChange={handleInputChange}
          style={inputStyle}
        />
      </div>
      <div>
        <label>Số lượng đánh giá</label>
        <input
          type="number"
          name="reviewCount"
          value={productToEdit.reviewCount}
          onChange={handleInputChange}
          style={inputStyle}
        />
      </div>
      <div>
        <label>Ảnh sản phẩm</label>
        <input
          type="text"
          name="productImage"
          value={productToEdit.productImage}
          onChange={handleInputChange}
          style={inputStyle}
        />
      </div>
      <div>
        <button style={buttonStyle} onClick={handleSaveChanges}>Lưu thay đổi</button>
        <button style={buttonStyle} onClick={closePopup}>Hủy</button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default All;
