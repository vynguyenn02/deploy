"use client";

import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { SearchOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "../Header/asset/logo.png";
import Link from "next/link";
import '../Sidebar/sidebar.css'

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [roleId, setRoleId] = useState<number | null>(null);
    const router = useRouter();

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        const storedRoleId = localStorage.getItem("roleId");

        if (storedUsername) {
            setIsLoggedIn(true);
            setUsername(storedUsername);
        }

        if (storedRoleId) {
            setRoleId(parseInt(storedRoleId, 10));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        localStorage.removeItem("roleId");
        localStorage.removeItem("cart");

        setIsLoggedIn(false);
        setUsername("");
        setRoleId(null);
        router.push("/auth/login");
    };

    return (
        <header className="backgroundheader text-white shadow-md">
            <div className="container mx-auto flex justify-between items-center p-4">
                {/* Logo Section */}
                <Link href="/" passHref>
                    <Image
                        src={logo}
                        alt="Việt Nông"
                        width={64}
                        height={64}
                        className="h-auto cursor-pointer"
                    />
                </Link>

                {/* Search Section */}
                <div className="flex items-center w-1/2 mx-4">
                    <input
                        type="text"
                        placeholder="Tìm kiếm sản phẩm, danh mục..."
                        className="w-full p-2 rounded-l-full text-black focus:outline-none"
                    />
                    <Button
                        type="primary"
                        icon={<SearchOutlined />}
                        className="bg-green-700 rounded-r-full hover:bg-green-800"
                    />
                    
                </div>

                {/* User Actions Section */}
                <div className="flex items-center space-x-4">
                    <Link href="/order" className="text-white hover:text-yellow-300 transition duration-200">
                        Xem đơn hàng của tôi
                    </Link>
                    <Link href="#" className="text-white hover:text-yellow-300 transition duration-200">
                        <QuestionCircleOutlined /> Hỗ trợ
                    </Link>
                    {isLoggedIn ? (
                        <>
                            <span className="text-white hover:text-yellow-300 transition duration-200">
                                Xin chào, {username}
                            </span>
                            <Button type="text" className="text-white hover:text-yellow-300 transition duration-200" onClick={handleLogout}>
                                Đăng xuất
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link href="/auth/register" className="text-white hover:text-yellow-300 transition duration-200">
                                Đăng ký
                            </Link>
                            <Link href="/auth/login" className="text-white hover:text-yellow-300 transition duration-200">
                                Đăng nhập
                            </Link>
                        </>
                    )}
                </div>
            </div>
            

           
        </header>
    );
};

export default Header;