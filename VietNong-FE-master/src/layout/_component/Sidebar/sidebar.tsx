import './sidebar.css';

const Sidebar = () => {
    return (
        <div className="flex h-screen">
            <div className="background text-white w-64 p-6 space-y-6">
                {/* Quản lý đơn hàng
                <div className="text-xl font-bold">Quản lý đơn hàng</div>
                <div className="space-y-2">
                    <a href="/ordermanagement/all" className="item rounded-md px-3 py-2 cursor-pointer block">
                        Tất cả
                    </a>
                    <a href="/ordermanagement/refund" className="item rounded-md px-3 py-2 cursor-pointer block">
                        Trả hàng / hoàn tiền
                    </a>
                </div> */}

                {/* Quản lý sản phẩm */}
                <div className="text-xl font-bold">Quản lý sản phẩm</div>
                <div className="space-y-2">
                    <a href="/productmanagement/all" className="item rounded-md px-3 py-2 cursor-pointer block">
                        Tất cả sản phẩm
                    </a>
                    <a href="/productmanagement/add" className="item rounded-md px-3 py-2 cursor-pointer block">
                        Thêm sản phẩm
                    </a>
                    {/* <a href="/productmanagement/out-of-stock" className="item rounded-md px-3 py-2 cursor-pointer block">
                        Sản phẩm hết hàng
                    </a> */}
                </div>

                {/* Quản lý vận chuyển */}
                <div className="text-xl font-bold">Quản lý vận chuyển</div>
                <div className="space-y-2">
                    <a href="/shipmanagement" className="item rounded-md px-3 py-2 cursor-pointer block">
                        Cài đặt vận chuyển
                    </a>
                </div>

                {/* Tài Chính */}
                <div className="text-xl font-bold">Tài Chính</div>
                <div className="space-y-2">
                    <a href="/bankmanagement/bankaccount" className="item rounded-md px-3 py-2 cursor-pointer block">
                        Tài khoản ngân hàng
                    </a>
                </div>

                {/* Quản lý shop */}
                <div className="text-xl font-bold">Quản lý shop</div>
                <div className="space-y-2">
                    <a href="/shopmanagement/list" className="item rounded-md px-3 py-2 cursor-pointer block">
                        Danh mục shop
                    </a>
                    {/* <a href="/shopmanagement/feedback" className="item rounded-md px-3 py-2 cursor-pointer block">
                        Đánh giá shop
                    </a> */}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
