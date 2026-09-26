import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const navGroups = [
  {
    label: 'TỔNG QUAN',
    items: [{ icon: 'grid_view', label: 'Tổng quan', path: '/admin' }],
  },
  {
    label: 'BÁN HÀNG & ĐƠN HÀNG',
    items: [
      { icon: 'receipt_long', label: 'Danh sách đơn', path: '/admin/orders' },
      { icon: 'qr_code_scanner', label: 'Tra soát VietQR', path: '/admin/vietqr' },
      { icon: 'published_with_changes', label: 'Quản lý đổi trả', path: '/admin/returns' },
    ],
  },
  {
    label: 'SẢN PHẨM & DANH MỤC',
    items: [
      { icon: 'account_tree', label: 'Cây danh mục', path: '/admin/categories' },
      { icon: 'checkroom', label: 'Sản phẩm & SKU', path: '/admin/products' },
    ],
  },
  {
    label: 'KHO VẬN & FULFILLMENT',
    items: [
      { icon: 'inventory_2', label: 'Xử lý & Đóng gói', path: '/admin/picking' },
      { icon: 'move_to_inbox', label: 'Phiếu nhập kho', path: '/admin/goods-receipt' },
      { icon: 'fact_check', label: 'Kiểm kê kho', path: '/admin/stockcount' },
    ],
  },
  {
    label: 'BÁO CÁO & TÀI CHÍNH',
    items: [
      { icon: 'bar_chart', label: 'Doanh thu & Lợi nhuận', path: '/admin/revenue' },
      { icon: 'local_shipping', label: 'Cước & Đối soát 3PL', path: '/admin/shipping' },
    ],
  },
  {
    label: 'CẤU HÌNH & NHÂN SỰ',
    items: [
      { icon: 'admin_panel_settings', label: 'Phân quyền RBAC', path: '/admin/rbac' },
      { icon: 'loyalty', label: 'Khuyến mãi & Voucher', path: '/admin/promotions' },
    ],
  },
];

interface Props { collapsed?: boolean; onCollapse?: (v: boolean) => void; }

export default function AdminSidebar({ collapsed = false, onCollapse }: Props) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={`${collapsed ? 'w-14' : 'w-56'} bg-[#1c1b1b] flex flex-col flex-shrink-0 transition-all duration-200 overflow-hidden`}>
      {/* Logo */}
      <div className="flex items-center gap-2 p-4 border-b border-[#333]">
        <span className="material-icons text-[#c9a84c] flex-shrink-0">diamond</span>
        {!collapsed && (
          <div className="min-w-0">
            <p className="font-serif text-sm text-white tracking-widest truncate">VT STORE</p>
            <p className="text-[9px] text-[#747878] tracking-wider">LUXURY BACK-OFFICE</p>
          </div>
        )}
        <button onClick={() => onCollapse?.(!collapsed)} className="ml-auto text-[#747878] hover:text-white flex-shrink-0">
          <span className="material-icons text-lg">{collapsed ? 'chevron_right' : 'chevron_left'}</span>
        </button>
      </div>

      {/* PROD badge */}
      {!collapsed && (
        <div className="px-4 py-2 border-b border-[#2a2a2a]">
          <span className="text-[9px] tracking-widest text-[#c9a84c] border border-[#c9a84c44] px-2 py-0.5">PROD</span>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-2">
        {navGroups.map(group => (
          <div key={group.label} className="mb-2">
            {!collapsed && (
              <p className="px-4 pt-3 pb-1 text-[9px] tracking-widest text-[#555] font-semibold">{group.label}</p>
            )}
            {group.items.map(item => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  title={item.label}
                  className={`flex items-center gap-3 px-4 py-2.5 text-xs transition-colors ${
                    active ? 'bg-[#c9a84c] text-[#1c1b1b] font-medium' : 'text-[#c4c7c7] hover:bg-[#2a2a2a] hover:text-white'
                  }`}
                >
                  <span className="material-icons text-lg flex-shrink-0">{item.icon}</span>
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User */}
      <div className="border-t border-[#333] p-3 flex items-center gap-3">
        <div className="w-7 h-7 bg-[#c9a84c] rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-[10px] font-bold text-[#1c1b1b]">VT</span>
        </div>
        {!collapsed && (
          <div className="min-w-0 flex-1">
            <p className="text-xs text-white font-medium truncate">Võ Tuấn</p>
            <p className="text-[10px] text-[#747878] truncate">Super Admin</p>
          </div>
        )}
        {!collapsed && (
          <button onClick={handleLogout} title="Đăng xuất" className="text-[#747878] hover:text-red-400 flex-shrink-0 transition-colors">
            <span className="material-icons text-lg">logout</span>
          </button>
        )}
      </div>
    </div>
  );
}