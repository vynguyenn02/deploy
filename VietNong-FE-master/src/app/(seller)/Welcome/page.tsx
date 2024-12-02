import React from 'react';
import Welcomepage from './_component/welcomepage';
import Header from '@/layout/_component/Header/Header';
import Navbarseller from '@/layout/_component/Header/navbarseller/Navbarseller';
const page: React.FC = () => {
  return (
    <div className='Container-01'>
        
        <Header></Header>
        <Navbarseller></Navbarseller>
        <Welcomepage></Welcomepage>
       
       

       
    </div>
      
 
  );
};

export default page;