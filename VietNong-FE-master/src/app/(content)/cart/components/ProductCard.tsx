import { useRouter } from "next/navigation";
import React from "react";

export const ProductCard: React.FC<{ productId: number; name: string; price: number; productImage: string }> = ({ productId, name, price, productImage }) => {
  const router = useRouter();

  const handleViewDetails = (productId: number | undefined) => {
    if (!productId) {
      console.error("Product ID is undefined");
      return;
    }
    router.push(`/productdetail?id=${productId}`);
  };

  return (
    <div
      onClick={() => handleViewDetails(productId)}
      className="border p-4 rounded shadow-sm bg-white hover:shadow-lg transition duration-200 cursor-pointer"
    >
      <img
        src={productImage}
        alt={name}
        className="w-full h-32 object-cover mb-2 rounded"
      />
      <h4 className="font-bold text-lg">{name}</h4>
      <p className="text-gray-700 text-sm">{price.toLocaleString()} VND</p>
     
    </div>
  );
};
