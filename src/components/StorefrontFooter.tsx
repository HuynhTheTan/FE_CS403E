import { Link } from 'react-router-dom';

export default function StorefrontFooter() {
  return (
    <footer className="bg-[#1c1b1b] text-[#c4c7c7] mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="material-icons text-[#c9a84c] text-lg">diamond</span>
            <span className="font-serif text-xl text-white tracking-widest">VT STORE</span>
          </div>
          <p className="text-xs text-[#747878] leading-relaxed">Haute Couture &amp; Luxury Fashion. Sống cùng đẳng cấp từ năm 2019.</p>
          <p className="text-xs text-[#747878] mt-3">© 2025 VT Store Haute Couture</p>
        </div>
        <div>
          <h4 className="text-[10px] tracking-widest uppercase text-[#c9a84c] mb-4">Mua sắm</h4>
          <ul className="space-y-2 text-xs">
            {['Bộ sưu tập mới', 'Hàng best seller', 'Outlet & Sale', 'Phụ kiện'].map(l => (
              <li key={l}><Link to="/products" className="hover:text-white transition-colors">{l}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-[10px] tracking-widest uppercase text-[#c9a84c] mb-4">Hỗ trợ</h4>
          <ul className="space-y-2 text-xs">
            {['Theo dõi đơn hàng', 'Chính sách đổi trả', 'Hướng dẫn chọn size', 'Liên hệ CSKH'].map(l => (
              <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-[10px] tracking-widest uppercase text-[#c9a84c] mb-4">VT Privé Club</h4>
          <ul className="space-y-2 text-xs">
            {['Đăng ký thành viên', 'Tích điểm & Đổi quà', 'Hạng Diamond VIP', 'Ưu đãi độc quyền'].map(l => (
              <li key={l}><Link to="/login" className="hover:text-white transition-colors">{l}</Link></li>
            ))}
          </ul>
          <div className="mt-6 flex gap-3">
            {['facebook', 'instagram', 'tiktok'].map(s => (
              <a key={s} href="#" className="w-8 h-8 rounded-full border border-[#444] flex items-center justify-center hover:border-[#c9a84c] transition-colors">
                <span className="text-[10px] uppercase">{s[0]}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
