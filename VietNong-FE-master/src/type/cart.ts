export type CartItemProps = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    sellerid: number; // Thêm sellerid vào kiểu
    onQuantityChange: (newQuantity: number) => void; // Thêm prop cho thay đổi số lượng
    onRemove: () => void; // Thêm prop cho xóa sản phẩm
  };
