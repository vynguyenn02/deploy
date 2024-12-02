import React from 'react';
import { Carousel } from 'antd';
import Header from '@/layout/_component/Header/Header';
import Navbar from '@/layout/_component/Header/navbar/Navbar';
import NewsSection from '@/components/_newssection/NewsSection';
import KnowledgeSection from '@/components/_knowledgsection/KnowledgeSection';

const HomePage: React.FC = () => {
  return (
    <div className="bg-gray-50">
      {/* Header */}
      <Header />
      <div>
        <Navbar />

        {/* Main Banner */}
        <section className="relative h-[450px] md:h-[550px] overflow-hidden">
  {/* Carousel for slideshow */}
  <Carousel autoplay>
    <div>
      <img
        src="https://images.pexels.com/photos/5965986/pexels-photo-5965986.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Banner 1"
        className="w-full h-full object-cover"
      />
    </div>
    <div>
      <img
        src="https://images.pexels.com/photos/2252482/pexels-photo-2252482.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Banner 2"
        className="w-full h-full object-cover"
      />
    </div>
    <div>
      <img
        src="https://images.pexels.com/photos/2955794/pexels-photo-2955794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Banner 3"
        className="w-full h-full object-cover"
      />
    </div>
  </Carousel>

  {/* Overlay for darkening the background image */}
  <div className="absolute inset-0 bg-black bg-opacity-20"></div>

  {/* Content */}
  <div className="absolute inset-0 z-10 container mx-auto flex flex-col justify-center text-white px-6">
    {/* Heading with 3D effect */}
    <h1
      className="text-5xl md:text-6xl font-bold mb-4"
      style={{
        position: 'relative',
        display: 'inline-block',
        fontWeight: 'bold',
        fontSize: '4rem',
        zIndex: 1,
        color: 'rgba(251, 251, 251, 0.8)', // Color with 80% opacity (fbfbfb)
        textShadow: '2px 2px 10px rgba(0, 0, 0, 0.5)', // Apply 3D effect with shadow
      }}
    >
      VIỆT NÔNG
    </h1>

    <p
      className="text-xl md:text-2xl"
      style={{
        position: 'relative',
        display: 'inline-block',
        fontWeight: 'bold',
        fontSize: '1.5rem',
        zIndex: 1,
        color: 'rgba(251, 251, 251, 0.8)', // Color with 80% opacity (fbfbfb)
        textShadow: '2px 2px 10px rgba(0, 0, 0, 0.5)', // 3D shadow effect for text
        marginLeft: '20px', // Lùi vào một chút
        paddingTop: '20px', // Khoảng cách phía trên
      }}
    >
      Nông sản<br />
      <span
        style={{
          position: 'relative',
          display: 'inline-block',
          fontWeight: 'bold',
          fontSize: '1.5rem',
          zIndex: 1,
          color: 'rgba(251, 251, 251, 0.8)', // Color with 80% opacity (fbfbfb)
        }}
      >
        của người Việt
      </span>
    </p>
  </div>
</section>


        {/* News Section */}
        <NewsSection />

        {/* Knowledge Section */}
        <KnowledgeSection />
      </div>
    </div>
  );
};

export default HomePage;
