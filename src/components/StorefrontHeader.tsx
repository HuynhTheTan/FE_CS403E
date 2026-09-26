import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface Props { cartCount?: number; wishlistCount?: number; }

export default function StorefrontHeader({ cartCount = 3, wishlistCount = 6 }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 bg-[#faf9f7] border-b border-[#e9e8e6]">
      <div className="bg-[#1c1b1b] text-[#e8d5a3] text-xs text-center py-2 tracking-widest font-light">
        MIỄN PHÍ VẬN CHUYỂN CHO ĐƠN TỪ 500.000₫ &nbsp;|&nbsp; ĐỔI TRẢ 30 NGÀY TOÀN QUỐC
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="material-icons text-[#1c1b1b]">menu</span>
        </button>

        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <span className="material-icons text-[#c9a84c] text-lg">diamond</span>
          <span className="font-serif text-xl font-semibold tracking-widest text-[#1c1b1b]">VT STORE</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          <Link to="/collections" className="text-xs tracking-widest uppercase hover:text-[#c9a84c] transition-colors">Bộ sưu tập</Link>
          <Link to="/products" className="text-xs tracking-widest uppercase hover:text-[#c9a84c] transition-colors">Sản phẩm</Link>
          <Link to="/new-arrivals" className="text-xs tracking-widest uppercase hover:text-[#c9a84c] transition-colors">Hàng mới về</Link>
          <Link to="/orders" className="text-xs tracking-widest uppercase hover:text-[#c9a84c] transition-colors">Đơn hàng</Link>
        </nav>

        <div className="flex items-center gap-3">
          <button onClick={() => setSearchOpen(!searchOpen)} className="hover:text-[#c9a84c] transition-colors">
            <span className="material-icons text-[22px]">search</span>
          </button>
          <Link to="/wishlist" className="relative hover:text-[#c9a84c] transition-colors">
            <span className="material-icons text-[22px]">favorite</span>
            {wishlistCount > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#c9a84c] text-white text-[9px] rounded-full flex items-center justify-center font-medium">{wishlistCount}</span>}
          </Link>
          <Link to="/cart" className="relative hover:text-[#c9a84c] transition-colors">
            <span className="material-icons text-[22px]">shopping_bag</span>
            {cartCount > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#1c1b1b] text-white text-[9px] rounded-full flex items-center justify-center font-medium">{cartCount}</span>}
          </Link>
          {isLoggedIn ? (
            <div className="relative group">
              <button className="hover:text-[#c9a84c] transition-colors flex items-center gap-1">
                <span className="material-icons text-[22px]">person</span>
              </button>
              <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-[#e9e8e6] shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <Link to="/profile" className="flex items-center gap-2 px-4 py-3 text-xs hover:bg-[#f4f3f1] transition-colors">
                  <span className="material-icons text-sm text-[#747878]">person_outline</span> Tài khoản
                </Link>
                <Link to="/orders" className="flex items-center gap-2 px-4 py-3 text-xs hover:bg-[#f4f3f1] transition-colors">
                  <span className="material-icons text-sm text-[#747878]">receipt_long</span> Đơn hàng
                </Link>
                <Link to="/wishlist" className="flex items-center gap-2 px-4 py-3 text-xs hover:bg-[#f4f3f1] transition-colors">
                  <span className="material-icons text-sm text-[#747878]">favorite_border</span> Yêu thích
                </Link>
                <Link to="/admin" className="flex items-center gap-2 px-4 py-3 text-xs hover:bg-[#f4f3f1] border-t border-[#f4f3f1] transition-colors text-[#c9a84c]">
                  <span className="material-icons text-sm">admin_panel_settings</span> Admin
                </Link>
                <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-3 text-xs hover:bg-[#ffeaea] text-[#ba1a1a] transition-colors border-t border-[#f4f3f1]">
                  <span className="material-icons text-sm">logout</span> Đăng xuất
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="hover:text-[#c9a84c] transition-colors">
              <span className="material-icons text-[22px]">person</span>
            </Link>
          )}
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-[#e9e8e6] px-4 py-3 bg-[#faf9f7]">
          <div className="max-w-2xl mx-auto flex items-center gap-3 bg-[#f4f3f1] rounded px-4 py-2">
            <span className="material-icons text-[#747878] text-lg">search</span>
            <input autoFocus className="flex-1 bg-transparent text-sm outline-none placeholder-[#747878]" placeholder="Tìm kiếm sản phẩm..." />
            <button onClick={() => setSearchOpen(false)}><span className="material-icons text-[#747878] text-lg">close</span></button>
          </div>
        </div>
      )}

      {menuOpen && (
        <div className="lg:hidden border-t border-[#e9e8e6] bg-[#faf9f7] px-4 py-4 flex flex-col gap-4">
          {[
            { label: 'Bộ sưu tập', path: '/collections' },
            { label: 'Sản phẩm', path: '/products' },
            { label: 'Hàng mới về', path: '/new-arrivals' },
            { label: 'Đơn hàng', path: '/orders' },
          ].map(item => (
            <Link key={item.path} to={item.path} className="text-sm tracking-widest uppercase border-b border-[#e9e8e6] pb-3" onClick={() => setMenuOpen(false)}>{item.label}</Link>
          ))}
        </div>
      )}
    </header>
  );
}
