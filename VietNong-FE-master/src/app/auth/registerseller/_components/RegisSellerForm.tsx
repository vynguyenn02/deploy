"use client";
import React, { useState, useEffect } from "react";
import './RegisSellerForm.css';
import { FaUser, FaLock } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useRouter } from 'next/navigation'; // Import useRouter để điều hướng
import { RegisterSellerRequest } from "@/type/auth";
import { registerSeller } from "@/ultis/AuthAPI";
import axios from 'axios';
const RegisterSellerForm = () => {
    const [shopName, setShopName] = useState('');
    const [shopAddress, setShopAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [rating, setRating] = useState(0); 
    const [shopImage, setShopImage] = useState<File | null>(null);
    const [error, setError] = useState('');
    const [userId, setUserId] = useState<number | null>(null);
    const router = useRouter(); // Khởi tạo useRouter

    useEffect(() => {
        // Lấy userId từ localStorage
        const storedUser = localStorage.getItem('userId');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setUserId(user.id); // Giả sử ID người dùng được lưu trong trường `id`
        } else {
            setError("Bạn cần đăng nhập để tiếp tục.");
        }
    }, []);

    const handleShopNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setShopName(event.target.value);
    };

    const handleShopAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setShopAddress(event.target.value);
    };

    const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(event.target.value);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const handleShopImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setShopImage(event.target.files[0]);
        } else {
            setShopImage(null); // Đảm bảo gán giá trị null nếu không có file
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Ngăn chặn hành vi mặc định của form

        if (userId === null) {
            setError("Không tìm thấy thông tin người dùng.");
            return;
        }

        const registrationData: RegisterSellerRequest = {
            shopName,
            shopAddress,
            phoneNumber,
            email,
            rating,
            shopImage: shopImage!
        };

       
    try {
        const sellerResponse = await registerSeller(registrationData);
        console.log('Seller Response:', sellerResponse); // Log phản hồi

        // Kiểm tra nếu sellerResponse có thông tin cần thiết
        if (sellerResponse && sellerResponse.sellerId) {
            // Nếu tạo người bán thành công, chuyển hướng
            router.push('/Welcome');
        } else {
            setError(sellerResponse.message || 'Tạo người bán không thành công');
        }
    } catch (err) {
        console.error('Error:', err); // Log lỗi
        if (axios.isAxiosError(err)) {
            const errorMessage = err.response?.data?.message || "Đã xảy ra lỗi, vui lòng thử lại!";
            setError(errorMessage);
        } else if (err instanceof Error) {
            setError("Đã xảy ra lỗi: " + err.message);
        } else {
            setError("Đã xảy ra lỗi, vui lòng thử lại!");
        }
    }

    };

    return (
        <div className="register-seller-container">
            <div className="wrapper">
                <form onSubmit={handleSubmit}>
                    <div>
                        <a href="/">
                            <IoIosArrowRoundBack className="back-icon" />
                        </a>
                    </div>
                    <h1>Register Seller</h1>
                    {error && <p className="error-message">{error}</p>}
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Shop Name"
                            required
                            value={shopName}
                            onChange={handleShopNameChange}
                        />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Shop Address"
                            required
                            value={shopAddress}
                            onChange={handleShopAddressChange}
                        />
                    </div>
                    <div className="input-box">
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            required
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
                        />
                    </div>
                    <div className="input-box">
                        <input
                            type="email"
                            placeholder="Email"
                            required
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </div>
                    <div className="input-box">
                        <input
                            type="file"
                            id="shopImage"
                            required
                            onChange={handleShopImageChange}
                        />
                        <label htmlFor="shopImage">
                            {shopImage ? shopImage.name : 'Upload Shop Image'}
                        </label>
                    </div>
                    <button type="submit">Register Seller</button>
            
                </form>
            </div>
        </div>
    );
}

export default RegisterSellerForm;