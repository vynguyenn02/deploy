import React from 'react';
import Header from '@/layout/_component/Header/Header';
import Navbarseller from '@/layout/_component/Header/navbarseller/Navbarseller';
import Feedback from './_component/Feedback';
const page: React.FC = () => {
    return (

        <div>
            {/* Header */}
            <Header></Header>
            <div>
            <Navbarseller></Navbarseller>
            </div>
            <div className='Container-01'>
                <Feedback></Feedback>
            </div>
        </div>
         );
        };
        
        export default page;
