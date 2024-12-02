"use client";

import React, { useState } from 'react';
import Sidebar from '@/layout/_component/Sidebar/sidebar';
import { Switch } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

const initialShippingOptions = [
    { name: 'Viettel Post', cod: false, priority: true, expanded: true },
    { name: 'J&T Express', cod: true, priority: false, expanded: false },
    { name: 'Giao hàng nhanh', cod: false, priority: false, expanded: false },
    { name: 'Now ship', cod: true, priority: false, expanded: false },
    { name: 'Ninja Van', cod: true, priority: false, expanded: false },
    { name: 'Giao hàng tiết kiệm', cod: true, priority: false, expanded: false },
    { name: 'BEST Express', cod: false, priority: false, expanded: false },
];

const ShipManagement = () => {
    const [shippingOptions, setShippingOptions] = useState(initialShippingOptions);

    const toggleOption = (index: number) => {
        const updatedOptions = shippingOptions.map((option, i) =>
            i === index ? { ...option, cod: !option.cod } : option
        );
        setShippingOptions(updatedOptions);
    };

    const toggleExpand = (index: number) => {
        const updatedOptions = shippingOptions.map((option, i) =>
            i === index ? { ...option, expanded: !option.expanded } : option
        );
        setShippingOptions(updatedOptions);
    };

    return (
        <div className="bg-[#f9f8f4] min-h-screen flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 p-10">
                <h1 className="text-2xl font-semibold mb-8 text-gray-800">Cài đặt vận chuyển</h1>

                {/* Shipping Options Container */}
                <div className="bg-[#f5f5ed] rounded-lg shadow p-4">
                    {shippingOptions.map((option, index) => (
                        <div key={index} className="bg-white rounded-md shadow-sm p-4 mb-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="font-medium text-lg text-gray-700">{option.name}</span>
                                    <span
                                        className={`text-sm ml-2 ${
                                            option.cod ? 'text-green-600' : 'text-gray-500'
                                        }`}
                                    >
                                        [COD {option.cod ? 'đã được kích hoạt' : 'đã tắt'}]
                                    </span>
                                    {option.priority && <span className="text-sm text-[#a3c35a] ml-2">[Ưu tiên]</span>}
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        checked={option.cod}
                                        onChange={() => toggleOption(index)}
                                        className={`${
                                            option.cod ? 'bg-[#a3c35a]' : 'bg-gray-300'
                                        } relative inline-flex items-center h-6 rounded-full w-11`}
                                    >
                                        <span
                                            className={`${
                                                option.cod ? 'translate-x-6' : 'translate-x-1'
                                            } inline-block w-4 h-4 transform bg-white rounded-full`}
                                        />
                                    </Switch>
                                    <ChevronDownIcon
                                        className={`h-5 w-5 text-gray-600 cursor-pointer transform ${
                                            option.expanded ? 'rotate-180' : 'rotate-0'
                                        }`}
                                        onClick={() => toggleExpand(index)}
                                    />
                                </div>
                            </div>
                            {option.expanded && (
                                <div className="mt-4 border-t border-gray-200 pt-4 space-y-2 text-gray-700">
                                    <div className="flex justify-between">
                                        <span>Kích hoạt đơn vị vận chuyển này</span>
                                        <Switch
                                            checked={option.cod}
                                            onChange={() => toggleOption(index)}
                                            className={`${
                                                option.cod ? 'bg-[#a3c35a]' : 'bg-gray-300'
                                            } relative inline-flex items-center h-6 rounded-full w-11`}
                                        >
                                            <span
                                                className={`${
                                                    option.cod ? 'translate-x-6' : 'translate-x-1'
                                                } inline-block w-4 h-4 transform bg-white rounded-full`}
                                            />
                                        </Switch>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Kích hoạt COD</span>
                                        <Switch
                                            checked={option.cod}
                                            onChange={() => toggleOption(index)}
                                            className={`${
                                                option.cod ? 'bg-[#a3c35a]' : 'bg-gray-300'
                                            } relative inline-flex items-center h-6 rounded-full w-11`}
                                        >
                                            <span
                                                className={`${
                                                    option.cod ? 'translate-x-6' : 'translate-x-1'
                                                } inline-block w-4 h-4 transform bg-white rounded-full`}
                                            />
                                        </Switch>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Ưu tiên</span>
                                        <Switch
                                            checked={option.priority}
                                            onChange={() => toggleOption(index)}
                                            className={`${
                                                option.priority ? 'bg-[#a3c35a]' : 'bg-gray-300'
                                            } relative inline-flex items-center h-6 rounded-full w-11`}
                                        >
                                            <span
                                                className={`${
                                                    option.priority ? 'translate-x-6' : 'translate-x-1'
                                                } inline-block w-4 h-4 transform bg-white rounded-full`}
                                            />
                                        </Switch>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShipManagement;
