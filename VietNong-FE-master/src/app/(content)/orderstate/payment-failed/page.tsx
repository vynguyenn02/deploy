"use client";
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const PaymentFailed: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const code = searchParams.get('code');
  const id = searchParams.get('id');
  const status = searchParams.get('status');
  const orderCode = searchParams.get('orderCode');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Thanh toán không thành công</h1>
        <p className="text-gray-700 mb-4">Rất tiếc, giao dịch của bạn đã thất bại.</p>
        {code && <p className="text-gray-600"><strong>Mã trạng thái:</strong> {code}</p>}
        {id && <p className="text-gray-600"><strong>ID:</strong> {id}</p>}
        {status && <p className="text-gray-600"><strong>Trạng thái:</strong> {status}</p>}
        {orderCode && <p className="text-gray-600"><strong>Mã đơn hàng:</strong> {orderCode}</p>}
        
        <button
          onClick={() => window.location.href = '/'}
          className="mt-6 w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Quay lại trang chủ
        </button>
      </div>
    </div>
  );
};

export default PaymentFailed;