import React from 'react';
import Header from '@/layout/_component/Header/Header';
import Navbarseller from '@/layout/_component/Header/navbarseller/Navbarseller';
import ShipManagement from './components/ShipManagement';
const page: React.FC = () => {
    return (

        <div>
            {/* Header */}
            <Header></Header>
            <div>
            <Navbarseller></Navbarseller>
            </div>
            <div className='Container-01'>
                <ShipManagement></ShipManagement>
            </div>
        </div>
         );
        };
        
        export default page;
