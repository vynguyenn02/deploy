import React from 'react';
import Header from '@/layout/_component/Header/Header';
import Navbar from '@/layout/_component/Header/navbar/Navbar';
import KnowledgeSection from '@/components/_knowledgsection/KnowledgeSection';

const page: React.FC = () => {
  return (
    <div className="bg-gray-50">
      {/* Header */}
      <Header></Header>
        <div>
      <Navbar></Navbar>
      </div>
      <KnowledgeSection></KnowledgeSection>

    </div>
  );
};

export default page;
