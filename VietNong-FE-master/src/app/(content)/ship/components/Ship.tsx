"use client"
import React, { useState } from "react";
import Header from "@/layout/_component/Header/Header";
import Navbar from "@/layout/_component/Header/navbar/Navbar";

const Ship = () => {
    // Trạng thái giao hàng
    const [orderStatus, setOrderStatus] = useState(1); // 1: Đã đặt hàng, 2: Đã giao cho DVVC, 3: Chờ giao hàng, 4: Đánh giá
    const [isCancelPopupOpen, setIsCancelPopupOpen] = useState(false); // Trạng thái mở pop-up hủy đơn hàng
    const [selectedReason, setSelectedReason] = useState(""); // Lý do hủy đơn hàng

    const handleNextStep = () => {
        if (orderStatus < 4) {
            setOrderStatus(orderStatus + 1);
        }
    };

    const handlePreviousStep = () => {
        if (orderStatus > 1) {
            setOrderStatus(orderStatus - 1);
        }
    };

    const handleCancelClick = () => {
        setIsCancelPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsCancelPopupOpen(false);
    };

    const handleReasonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedReason(event.target.value);
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <Header />
            <Navbar />
            <div className="container mx-auto p-4">
                <div className="bg-white shadow-lg rounded-lg p-6">
                    {/* Hiển thị quá trình giao hàng */}
                    <div className="flex justify-between items-center mb-4">
                        <button className="text-green-600" onClick={handlePreviousStep}>Trở Lại</button>
                        <div>
                            Mã Đơn: <span className="font-semibold">240925T7UQGFN</span>
                        </div>
                        <button className="text-green-600" onClick={handleNextStep}>Xác nhận đơn hàng</button>
                    </div>
                    <div className="flex justify-around items-center mb-6">
                        <div className="text-center">
                            <div
                                className={`w-8 h-8 ${
                                    orderStatus >= 1 ? 'bg-green-600' : 'bg-gray-300'
                                } rounded-full mx-auto mb-1`}
                            ></div>
                            <span className="text-sm">Đơn Hàng Đã Đặt</span>
                        </div>
                        <div className="text-center">
                            <div
                                className={`w-8 h-8 ${
                                    orderStatus >= 2 ? 'bg-green-600' : 'bg-gray-300'
                                } rounded-full mx-auto mb-1`}
                            ></div>
                            <span className="text-sm">Đã giao cho DVVC</span>
                        </div>
                        <div className="text-center">
                            <div
                                className={`w-8 h-8 ${
                                    orderStatus >= 3 ? 'bg-green-600' : 'bg-gray-300'
                                } rounded-full mx-auto mb-1`}
                            ></div>
                            <span className="text-sm">Chờ Giao Hàng</span>
                        </div>
                        <div className="text-center">
                            <div
                                className={`w-8 h-8 ${
                                    orderStatus >= 4 ? 'bg-green-600' : 'bg-gray-300'
                                } rounded-full mx-auto mb-1`}
                            ></div>
                            <span className="text-sm">Đánh giá</span>
                        </div>
                    </div>

                    {/* Nút xác nhận và hủy đơn hàng */}
                    <div className="flex justify-center mb-6">
                        <button className="bg-[#9ba582] text-white py-2 px-6 rounded mr-4">
                            Đã nhận hàng
                        </button>
                        <button
                            className="bg-gray-300 text-black py-2 px-6 rounded"
                            onClick={handleCancelClick}
                        >
                            Hủy đơn hàng
                        </button>
                    </div>
                </div>

                {/* Thông tin giao hàng */}
                <div className="mt-4">
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <div className="flex justify-between border-b pb-2 mb-2">
                            <div>
                                <h2 className="text-lg font-semibold">Địa Chỉ Nhận Hàng</h2>
                                <p>Tấn Đạt (+84) 973229987</p>
                                <p>Vinhome Grandpark, S10.03, Đường Nguyễn Xiển, Phường Long Bình, Thành Phố Thủ Đức, TP. Hồ Chí Minh</p>
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold">Ghi chú</h2>
                                <p>Trống</p>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold mb-2">Sản phẩm</h2>
                            <div className="flex justify-between items-center border-b pb-2 mb-2">
                                <div className="flex items-center">
                                    <img src="product-image.jpg" alt="Product" className="w-16 h-16 mr-4" />
                                    <div>
                                        <p className="font-semibold">Nông Sản Vàng</p>
                                        <p className="text-sm text-gray-600">Loại: Bầu dài</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p>đ55,000</p>
                                    <p>x2</p>
                                    <p>đ110,000</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <div className="flex justify-between mb-2">
                            <p>Tổng tiền hàng</p>
                            <p>đ110,000</p>
                        </div>
                        <div className="flex justify-between mb-2">
                            <p>Chi phí vận chuyển</p>
                            <p>đ32,200</p>
                        </div>
                        <div className="flex justify-between font-bold mb-2">
                            <p>Tổng thanh toán</p>
                            <p>đ142,200</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Phương thức thanh toán</p>
                            <p>Thanh toán khi nhận hàng</p>
                        </div>
                    </div>
                </div>

                {/* Pop-up hủy đơn hàng */}
                {isCancelPopupOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded shadow-lg w-[400px]">
                            <h2 className="text-lg mb-4">Vì sao bạn muốn hủy đơn hàng</h2>
                            <div className="space-y-2">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        value="Đổi địa chỉ nhận hàng"
                                        checked={selectedReason === "Đổi địa chỉ nhận hàng"}
                                        onChange={handleReasonChange}
                                        className="mr-2"
                                    />
                                    Đổi địa chỉ nhận hàng
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        value="Đổi sản phẩm"
                                        checked={selectedReason === "Đổi sản phẩm"}
                                        onChange={handleReasonChange}
                                        className="mr-2"
                                    />
                                    Đổi sản phẩm
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        value="Đổi phương thức vận chuyển"
                                        checked={selectedReason === "Đổi phương thức vận chuyển"}
                                        onChange={handleReasonChange}
                                        className="mr-2"
                                    />
                                    Đổi phương thức vận chuyển
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        value="Không muốn mua nữa"
                                        checked={selectedReason === "Không muốn mua nữa"}
                                        onChange={handleReasonChange}
                                        className="mr-2"
                                    />
                                    Không muốn mua nữa
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        value="Đổi phương thức thanh toán"
                                        checked={selectedReason === "Đổi phương thức thanh toán"}
                                        onChange={handleReasonChange}
                                        className="mr-2"
                                    />
                                    Đổi phương thức thanh toán
                                </label>
                            </div>
                            <div className="flex justify-end mt-6">
                                <button
                                    className="bg-white border border-gray-300 text-gray-600 py-2 px-4 rounded mr-4"
                                    onClick={handleClosePopup}
                                >
                                    Hủy
                                </button>
                                <button className="bg-[#9ba582] text-white py-2 px-4 rounded">
                                    Xác nhận
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Ship;
