export interface SellerProduct {
    productId: number;
    name: string;
    categoryId: number;
    price: number;
    stockQuantity: number;
    productImage: string;
  }
 export interface Product {
    productId: number;
    name: string;
    categoryId: number;
    price: number;
    weight: number;
    description: string;
    stockQuantity: number;
    averageRating: number;
    reviewCount: number;
    productImage: string;
    createdAt: string;
    reviews: any[]; // Hoặc định nghĩa kiểu cho reviews nếu cần
  }
  
  export interface ProductsResponse {
    data: Product[];
    page: number;
    pageSize: number;
    totalCount: number;
  }