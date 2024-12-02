import React from 'react';
import OutOfStockProducts from './_components/OutOfStockProduct';
import Header from '@/layout/_component/Header/Header';
import Navbarseller from '@/layout/_component/Header/navbarseller/Navbarseller';
import Sidebar from '@/layout/_component/Sidebar/sidebar';
const page: React.FC = () => {
    return (

        <div>
            {/* Header */}
            <Header></Header>
            <div>
            <Navbarseller></Navbarseller>
            </div>
           
            <div className='Container-01  flex'>
                 <Sidebar></Sidebar>
                <OutOfStockProducts></OutOfStockProducts>
            </div>
        </div>








    );
};

export default page;