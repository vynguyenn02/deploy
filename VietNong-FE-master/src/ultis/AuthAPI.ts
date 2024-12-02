import apiclient from "./apiclient";
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, RegisterSellerRequest, RegisterSellerResponse } from "@/type/auth"; // Cập nhật đường dẫn nếu cần
import axios from 'axios';
import odataClient from "./odataclient";


// POST: Đăng nhập người dùng
const token = localStorage.getItem('token');


export const loginUser = async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
        const response = await apiclient.post<LoginResponse>(
            '/auth/login',
            credentials
        );
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

// POST: Đăng ký người dùng mới
export const registerUser = async (registrationData: RegisterRequest): Promise<RegisterResponse> => {
  try {
    const response = await apiclient.post<RegisterResponse>('/auth/register', registrationData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const registerSeller = async (data: RegisterSellerRequest): Promise<RegisterSellerResponse> => {
  try {
      const formData = new FormData();
      formData.append('shopName', data.shopName);
      formData.append('shopAddress', data.shopAddress);
      formData.append('phoneNumber', data.phoneNumber);
      formData.append('email', data.email);
      formData.append('rating', data.rating.toString());
      formData.append('shopImage', data.shopImage);

      const response = await odataClient.post('/seller/register', formData, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      });

      return response.data;
  } catch (error) {
      console.error('Error registering seller:', error);
      throw error;
  }
};