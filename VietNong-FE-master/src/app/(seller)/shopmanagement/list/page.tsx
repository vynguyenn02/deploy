import React from 'react';
import Header from '@/layout/_component/Header/Header';
import Navbarseller from '@/layout/_component/Header/navbarseller/Navbarseller';
import List from './_component/List';
const page: React.FC = () => {
    return (

        <div>
            {/* Header */}
            <Header></Header>
            <div>
            <Navbarseller></Navbarseller>
            </div>
            <div className='Container-01'>
                <List></List>
            </div>
        </div>
         );
        };
        
        export default page;
