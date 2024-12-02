import React from "react";
import { Button, Carousel } from 'antd';
import { SearchOutlined, BellOutlined, QuestionCircleOutlined } from '@ant-design/icons';

const KnowledgeSection = () => {
    return (
       
<section className="py-12 bg-white">
  <div className="container mx-auto">
    {/* Title */}
    <div className="text-center mb-10">
      <h2 className="text-3xl font-bold text-[#566544]">Cẩm nang nông nghiệp</h2>
      <p className="text-gray-600 mt-2">Cẩm nang nông nghiệp là một tài liệu hoặc tập hợp các hướng dẫn chi tiết, cung cấp thông tin chuyên sâu.</p>
    </div>

    {/* Knowledge Cards */}
    <div className="space-y-4">
      {/* First Item */}
      <div className="bg-white border-2 border-[#566544] rounded-xl p-6 flex justify-between items-center transition hover:bg-[#F2F3EB]">
        <h3 className="text-xl font-semibold text-[#566544]">Kiến thức nông nghiệp</h3>
        <div className="w-10 h-10 flex justify-center items-center rounded-full bg-[#566544] text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Second Item */}
      <div className="bg-white border-2 border-[#566544] rounded-xl p-6 flex justify-between items-center transition hover:bg-[#F2F3EB]">
        <h3 className="text-xl font-semibold text-[#566544]">Chứng nhận nông nghiệp</h3>
        <div className="w-10 h-10 flex justify-center items-center rounded-full bg-[#566544] text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Third Item */}
      <div className="bg-white border-2 border-[#566544] rounded-xl p-6 flex justify-between items-center transition hover:bg-[#F2F3EB]">
        <h3 className="text-xl font-semibold text-[#566544]">Chính sách nhà nước</h3>
        <div className="w-10 h-10 flex justify-center items-center rounded-full bg-[#566544] text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</section>
    
    )
}

export default KnowledgeSection;

