// types.ts
export interface LoginRequest {
    username: string;
    password: string;
}

export interface Account {
    userId: number;
    username: string;
    email: string;
    roleId: number;
}

export interface LoginResponse {
    isBanned: boolean;
    bannedAccountId: number;
    code: number;
    message: string;
    data: {
        token: string;
        account: Account;
    };
}

// Định nghĩa interface cho dữ liệu đăng ký
export interface RegisterRequest {
    username: string;  // Tên người dùng
    password: string;  // Mật khẩu
    email: string;     // Địa chỉ email
    roleId: number;    // ID vai trò (ví dụ: 2 cho người dùng)
    status: boolean;    // Trạng thái người dùng (đang hoạt động hay không)
}

// Định nghĩa interface cho phản hồi từ API
export interface RegisterResponse {
    code: number;         // Mã trạng thái (ví dụ: 201 cho thành công)
    message: string;      // Thông điệp phản hồi
    data: {
        token: string;    // Token JWT hoặc thông tin xác thực khác
    };
}

export interface RegisterSellerRequest {
    shopName: string;
    shopAddress: string;
    phoneNumber: string;
    email: string;
    rating: number;
    shopImage: File;
}

export interface RegisterSellerResponse {
    code: number;
    message: string;
    sellerId: number;
}