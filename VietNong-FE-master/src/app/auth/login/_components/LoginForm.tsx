"use client"; // Đánh dấu component này là Client Component

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaUser, FaLock } from 'react-icons/fa';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { loginUser } from '@/ultis/AuthAPI'; // Đảm bảo đường dẫn đúng
import "./LoginForm.css";

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const router = useRouter();

    // Khi component mount, kiểm tra localStorage
    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        const storedRememberMe = localStorage.getItem('rememberMe') === 'true'; // Lấy trạng thái rememberMe

        if (storedUsername) {
            setUsername(storedUsername);
        }
        setRememberMe(storedRememberMe); // Cập nhật trạng thái rememberMe
    }, []);

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        const credentials = { username, password };

        try {
            const data = await loginUser(credentials);
            if (data.code === 200 && data.data.token) {
                localStorage.setItem('token', data.data.token);
                localStorage.setItem('roleId', data.data.account.roleId.toString());
                localStorage.setItem('userId', data.data.account.userId.toString());
                localStorage.setItem('username', username);


                // Lưu tên người dùng và trạng thái "Remember Me"
                if (rememberMe) {
                    localStorage.setItem('username', username);
                    localStorage.setItem('rememberMe', 'true'); // Lưu trạng thái rememberMe
                } else {
                    localStorage.removeItem('rememberMe'); // Xóa trạng thái rememberMe
                }

                setError(''); // Reset state lỗi
                // Kiểm tra roleId và điều hướng
                const roleId = data.data.account.roleId;
                if (roleId === 4) {
                    router.push('/'); // Chuyển hướng về trang chủ
                } else if (roleId === 3) {
                    router.push('/Welcome'); // Chuyển hướng về trang welcome
                } else {
                    setError('Quyền truy cập không hợp lệ'); // Xử lý trường hợp không hợp lệ
                }
            } else {
                setError(data.message || 'Đăng nhập thất bại');
            }
        } catch (err) {
            setError('Đăng nhập thất bại');
        }
    };

    return (
        <div className='login-container'>
            <div className="wrapper">
                <form onSubmit={handleLogin}>
                    <div>
                        <a href="/">
                            <IoIosArrowRoundBack className="back-icon" />
                        </a>
                    </div>

                    <h1>Login</h1>
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
                            type="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <FaLock className="icon" />
                    </div>
                    <div className="remember-forgot">
                        <label>
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            Remember me
                        </label>
                        <a href="forgotpassword">Forgot Password</a>
                    </div>

                    <button type="submit">Login</button>

                    <div className="register-link">
                        <p>Do not have an account? <a href="register">Register</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;