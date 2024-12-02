import React from 'react';
import All from './_component/all';
import Header from '@/layout/_component/Header/Header';
import Navbarseller from '@/layout/_component/Header/navbarseller/Navbarseller';
const page: React.FC = () => {
    return (

        <div>
            {/* Header */}
            <Header></Header>
            <div>
            <Navbarseller></Navbarseller>
            </div>
            <div className='Container-01'>
                <All></All>
            </div>
        </div>








    );
};

export default page;