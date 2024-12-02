
import odataClient from "./odataclient"; 
import { AxiosResponse } from 'axios';

import { Product, SellerProduct, ProductsResponse } from "@/type/Product";

export const getProducts = async (
  page: number,
  pageSize: number,
  categoryId?: number
): Promise<{ data: Product[]; totalCount: number }> => {
  try {
    const response: AxiosResponse<ProductsResponse> = await odataClient.get(`/product?page=${page}&pageSize=${pageSize}`);
    console.log('API Response:', response.data);

    const productsData = response.data.data || []; // Truy cập vào thuộc tính data
    const totalCount = response.data.totalCount || 0; // Truy cập vào thuộc tính totalCount

    if (!Array.isArray(productsData)) {
      throw new Error('Invalid response format: Expected an array of products');
    }

    // Lọc sản phẩm nếu categoryId được cung cấp
    const products = categoryId
      ? productsData.filter((product: Product) => product.categoryId === categoryId)
      : productsData;

    console.log('Total Products Returned:', products.length);
    
    return {
      data: products,
      totalCount: totalCount,
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Error fetching products');
  }
};
export const getProductById = async (productId: number): Promise<Product> => {
  try {
    const response = await odataClient.get(`/product/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product by id:', error);
    throw new Error('Error fetching product by id');
  }
};
export const postProduct = async (productData: FormData): Promise<any> => {
  try {
    const response = await odataClient.post('/product', productData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Hỗ trợ gửi dữ liệu file
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error posting product:', error);
    throw new Error('Error posting product');
  }
};
export const getSellerProducts = async () => {
  try {
    const response = await odataClient.get('/product/seller-products');
    console.log('API Response:', response); // Kiểm tra cấu trúc dữ liệu trả về
    // Kiểm tra nếu response.data có trường 'data' và là một mảng
    return Array.isArray(response.data.data) ? response.data.data : []; // Nếu có, trả về mảng sản phẩm
  } catch (error) {
    console.error('Error fetching seller products:', error);
    return []; // Trả về mảng rỗng nếu có lỗi
  }
};
export const putProduct = async (productId: number, productData: SellerProduct): Promise<SellerProduct> => {
  try {
    const response = await odataClient.put(`/product/${productId}`, productData);
    return response.data;  // Giả sử API trả lại dữ liệu đã cập nhật
  } catch (error) {
    console.error('Error updating product:', error);
    throw new Error('Error updating product');
  }
};

