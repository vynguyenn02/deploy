"use client";
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const PaymentSuccess: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const code = searchParams.get('code');
  const id = searchParams.get('id');
  const status = searchParams.get('status');
  const orderCode = searchParams.get('orderCode');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full text-center">
        <svg
          className="mx-auto mb-4 h-16 w-16 text-green-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m2 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h1 className="text-2xl font-bold text-green-600 mb-4">Thanh toán thành công!</h1>
        <p className="text-gray-700 mb-4">Cảm ơn bạn đã thực hiện giao dịch.</p>
        {code && <p className="text-gray-600"><strong>Mã trạng thái:</strong> {code}</p>}
        {id && <p className="text-gray-600"><strong>ID:</strong> {id}</p>}
        {status && <p className="text-gray-600"><strong>Trạng thái:</strong> {status}</p>}
        {orderCode && <p className="text-gray-600"><strong>Mã đơn hàng:</strong> {orderCode}</p>}
        <button
          onClick={() => router.push('/')}
          className="mt-6 w-full bg-green-500 text-white font-semibold py-2 rounded-md hover:bg-green-600 transition duration-200"
        >
          Về trang chủ
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;