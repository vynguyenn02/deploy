import { CartItemProps } from "@/type/cart";

export const CartItem: React.FC<CartItemProps> = ({ name, price, quantity, onQuantityChange, onRemove }) => (
    <div className="flex items-center justify-between p-4 border-b hover:bg-gray-100 transition duration-200">
      <div className="flex items-center w-2/5">
        <input type="checkbox" className="mr-4" />
        <span className="font-medium">{name}</span>
      </div>
      <span className="w-1/4 text-center">{price.toLocaleString()} VND</span>
      <div className="flex items-center w-1/12 text-center">
     
        <input 
    type="number" 
    value={quantity} 
    className="w-12 border text-center mx-2" 
    onChange={(e) => {
      const newQuantity = Math.max(1, parseInt(e.target.value) || 1); // Đảm bảo số lượng không nhỏ hơn 1
      onQuantityChange(newQuantity); // Gọi hàm cập nhật số lượng
    }}
  />
        
       
      </div>
      <span className="w-1/4 text-center font-bold">{(price * quantity).toLocaleString()} VND</span>
      <button className="w-1/5 text-red-500 hover:underline" onClick={onRemove}>Xóa</button>
    </div>
  );
  