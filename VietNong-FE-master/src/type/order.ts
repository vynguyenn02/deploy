export interface OrderDetail {
    productId: number;
    productName: string;
    quantity: number;
    price: number;
    sellerId: number;

  }
  
export interface OrderRequest {
    buyerId: number;
    totalAmount: number;
    status: string;
    details: OrderDetail[];
    description: string;
    returnUrl: string;
    cancelUrl: string;
  }


export interface Order {
  orderId: number;
  buyerId: number;
  totalAmount: number;
  createdAt: string;
}