"use client";

import React, { useState } from 'react';
import styles from './OutOfStockProducts.module.css';

const initialProducts = [
    {
        id: 1,
        name: "Tổng Hợp Các Loại Hạt giống Dây Leo",
        imageUrl: "/path/to/image1.jpg",  // Cập nhật đường dẫn ảnh
        variants: [
            { type: "Dưa chuột", price: 10000, stock: 50 },
            { type: "Bí đỏ", price: 10000, stock: 20 },
            { type: "Rau cải", price: 10000, stock: 6 },
            { type: "Carot", price: 10000, stock: 0 },
            { type: "Cà chua", price: 10000, stock: 13 },
            { type: "Dưa hấu", price: 10000, stock: 26 },
        ],
    },
    {
        id: 2,
        name: "Tổng Hợp Các Loại Hạt giống Dây Leo",
        imageUrl: "/path/to/image2.jpg",
        variants: [
            { type: "-", price: 10000, stock: 0 },
        ],
    },
];

export default function OutOfStockProducts() {
    const [filter, setFilter] = useState("Hết hàng");

    return (
        <div className={styles.container}>
            <h2 className={styles.header}>Sản phẩm hết hàng</h2>
            <div className={styles.filterButtons}>
                <button
                    className={filter === "Tất cả" ? styles.activeButton : ""}
                    onClick={() => setFilter("Tất cả")}
                >
                    Tất cả
                </button>
                <button
                    className={filter === "Còn hàng" ? styles.activeButton : ""}
                    onClick={() => setFilter("Còn hàng")}
                >
                    Còn hàng
                </button>
                <button
                    className={filter === "Hết hàng" ? styles.activeButton : ""}
                    onClick={() => setFilter("Hết hàng")}
                >
                    Hết hàng
                </button>
            </div>
            <div className={styles.productList}>
                {initialProducts.map((product) => (
                    <div key={product.id} className={styles.productCard}>
                        <img src={product.imageUrl} alt={product.name} className={styles.productImage} />
                        <div className={styles.productInfo}>
                            <h3 className={styles.productName}>{product.name}</h3>
                            <table className={styles.variantTable}>
                                <thead>
                                    <tr>
                                        <th>Phân loại hàng</th>
                                        <th>Giá</th>
                                        <th>Kho hàng</th>
                                        <th>Thông tin</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {product.variants.map((variant, index) => (
                                        <tr key={index} className={variant.stock === 0 ? styles.outOfStock : ""}>
                                            <td>{variant.type}</td>
                                            <td>{`đ ${variant.price.toLocaleString()}`}</td>
                                            <td>{variant.stock}</td>
                                            <td>
                                                {variant.stock === 0 ? <span className={styles.editLink}>Sửa</span> : ""}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
