"use client";
import React, { useState } from "react";
import './RegisterForm.css';
import { FaUser, FaLock } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useRouter } from 'next/navigation'; // Import useRouter để điều hướng
import { registerUser } from "@/ultis/AuthAPI";

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const router = useRouter(); // Khởi tạo useRouter

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Ngăn chặn hành vi mặc định của form

        // Kiểm tra xem mật khẩu có khớp không
        if (password !== confirmPassword) {
            setError("Mật khẩu không khớp!");
            return;
        }

        const registrationData = {
            username,
            password,
            email,
            roleId: 4,
            status: true
        };

        try {
            const response = await registerUser(registrationData); // Gọi hàm registerUser
    
            if (response.code === 201) {
                // Đăng ký thành công, chuyển hướng đến trang đăng nhập
                router.push('/auth/login');
            } else if (response.code === 409) {
                // Tài khoản đã được đăng ký
                setError("Tài khoản đã được đăng ký.");
            } else {
                // Hiển thị thông báo lỗi nếu có
                setError(response.message || 'Đăng ký không thành công');
            }
        } catch (err) {
            // Kiểm tra kiểu của err
            if (err instanceof Error) {
                // Lỗi từ server, kiểm tra nếu có response
                if ((err as any).response && (err as any).response.status === 409) {
                    setError("Tài khoản đã được đăng ký.");
                } else {
                    setError("Đã xảy ra lỗi: " + err.message);
                }
            } else {
                setError("Đã xảy ra lỗi, vui lòng thử lại!");
            }
        }
    };

    return (
        <div className="register-container">
 <div className="wrapper">
            <form onSubmit={handleSubmit}>
                <div>
                    <a href="/">
                        <IoIosArrowRoundBack className="back-icon" />
                    </a>
                </div>
                <h1>Register</h1>
                {error && <p className="error-message">{error}</p>}
                <div className="input-box">
                    <input
                        type="text"
                        placeholder="Username"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <FaUser className="icon" />
                </div>
                <div className="input-box">
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="input-box">
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <FaLock className="icon" />
                </div>
                <div className="input-box">
                    <input
                        type="password"
                        placeholder="Re-enter Password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <FaLock className="icon" />
                </div>
                <button type="submit">Register</button>
                <div className="register-link">
                    <p>Have an account? <a href="login">Login</a></p>
                </div>
            </form>
        </div>
        </div>
       
    );
}

export default RegisterForm;