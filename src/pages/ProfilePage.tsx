import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StorefrontHeader from '../components/StorefrontHeader';
import StorefrontFooter from '../components/StorefrontFooter';
import { useAuth } from '../context/AuthContext';

const tabs = [
  { key: 'profile', icon: 'person_outline', label: 'Thông tin tài khoản' },
  { key: 'address', icon: 'location_on', label: 'Sổ địa chỉ nhận hàng' },
  { key: 'wishlist', icon: 'favorite_border', label: 'Danh sách yêu thích', badge: 12 },
  { key: 'orders', icon: 'receipt_long', label: 'Đơn mua của tôi' },
  { key: 'returns', icon: 'sync_alt', label: 'Phiếu đổi trả', badge: 0 },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <StorefrontHeader />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#747878] mb-6">
          <Link to="/" className="hover:text-[#1c1b1b]">Trang chủ</Link>
          <span>›</span>
          <span>Khách hàng thành viên</span>
          <span>›</span>
          <span className="text-[#1c1b1b]">Cài đặt &amp; Sổ địa chỉ</span>
        </div>
        <h1 className="font-serif text-2xl text-[#1c1b1b] mb-6">Hồ Sơ &amp; Sổ Địa Chỉ</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="space-y-4">
            {/* VIP Card */}
            <div className="bg-[#1c1b1b] p-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#c9a84c11] rounded-full -translate-y-6 translate-x-6" />
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-[#333] rounded-full flex items-center justify-center">
                    <span className="material-icons text-[#c9a84c]">person</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#c9a84c] rounded-full flex items-center justify-center">
                    <span className="material-icons text-white text-[10px]">photo_camera</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-0.5">
                    <span className="text-[10px] text-[#c9a84c] tracking-widest">HẠNG DIAMOND VIP</span>
                    <span className="material-icons text-[#c9a84c] text-xs">workspace_premium</span>
                  </div>
                  <p className="text-sm font-medium text-white">Trần Minh Thư</p>
                  <p className="text-[10px] text-[#747878]">minhthu.tran@vtluxury.vn</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-[#c4c7c7] mb-3">
                <span className="material-icons text-xs text-[#c9a84c]">verified</span>
                Đã liên kết định danh cấp 2
              </div>
              <div className="bg-[#c9a84c18] p-3 rounded">
                <p className="text-[10px] text-[#747878] mb-1">TÍCH LŨY CHI TIÊU</p>
                <p className="font-serif text-xl text-[#c9a84c]">184.250.000 đ</p>
                <div className="mt-2 h-1 bg-[#333] rounded-full overflow-hidden">
                  <div className="h-full bg-[#c9a84c] rounded-full" style={{width: '92%'}} />
                </div>
                <p className="text-[10px] text-[#747878] mt-1">Còn 15.750.000 đ để duy trì Đặc quyền VIP Platinum</p>
              </div>
            </div>

            {/* Nav */}
            <div className="bg-white border border-[#e9e8e6] overflow-hidden">
              {tabs.map(tab => (
                <button key={tab.key} onClick={() => { setActiveTab(tab.key); if (tab.key === 'orders') navigate('/orders'); if (tab.key === 'wishlist') navigate('/wishlist'); }} className={`w-full flex items-center gap-3 px-4 py-3 text-left border-b border-[#f4f3f1] last:border-0 transition-colors text-sm ${activeTab === tab.key ? 'bg-[#f4f3f1] text-[#1c1b1b] font-medium' : 'text-[#444748] hover:bg-[#faf9f7]'}`}>
                  <span className="material-icons text-lg text-[#747878]">{tab.icon}</span>
                  <span className="flex-1">{tab.label}</span>
                  {tab.badge !== undefined && (
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${tab.badge > 0 ? 'bg-[#c9a84c] text-white' : 'bg-[#e9e8e6] text-[#747878]'}`}>{tab.badge}</span>
                  )}
                </button>
              ))}
              <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm text-[#ba1a1a] hover:bg-[#ffeaea] transition-colors">
                <span className="material-icons text-lg">logout</span>
                Đăng xuất
              </button>
            </div>

            {/* VIP advisor */}
            <div className="bg-[#c9a84c11] border border-[#c9a84c44] p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-icons text-[#c9a84c]">diamond</span>
                <span className="text-xs font-medium text-[#1c1b1b]">Chuyên viên tư vấn VIP</span>
              </div>
              <p className="text-xs text-[#747878] leading-relaxed">Ưu tiên phục vụ riêng tại Flagship Store hoặc hỗ trợ trực tuyến 24/7.</p>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div className="bg-white border border-[#e9e8e6] p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-xl text-[#1c1b1b]">Thông tin bảo mật &amp; Nhận diện</h2>
                  <div className="flex items-center gap-1.5 text-xs text-[#c9a84c]">
                    <span className="material-icons text-sm">lock</span>
                    Mã hóa bảo vệ dữ liệu AES-256
                  </div>
                </div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#747878] mb-4">Hồ Sơ Cá Nhân</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Họ và tên', value: 'Trần Minh Thư', icon: null },
                    { label: 'Địa chỉ Email', value: 'minhthu.tran@vtluxury.vn', icon: 'check_circle', iconColor: '#4CAF50' },
                    { label: 'Số điện thoại liên lạc', value: '+84 912 345 678', icon: 'lock_person', iconColor: '#747878' },
                    { label: 'Ngày sinh', value: '15/06/1992', icon: null },
                  ].map(f => (
                    <div key={f.label}>
                      <label className="text-[10px] uppercase tracking-wider text-[#747878] mb-1.5 block">{f.label}</label>
                      <div className="relative">
                        <input defaultValue={f.value} className="w-full border border-[#e9e8e6] px-3 py-2.5 text-sm outline-none focus:border-[#c9a84c] bg-white pr-8" />
                        {f.icon && <span className="material-icons absolute right-3 top-1/2 -translate-y-1/2 text-base" style={{color: f.iconColor}}>{f.icon}</span>}
                      </div>
                    </div>
                  ))}
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#747878] mb-1.5 block">Giới tính</label>
                    <select className="w-full border border-[#e9e8e6] px-3 py-2.5 text-sm outline-none focus:border-[#c9a84c] bg-white">
                      <option>Nữ</option><option>Nam</option><option>Khác</option>
                    </select>
                  </div>
                </div>

                <div className="border-t border-[#e9e8e6] mt-6 pt-6">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#747878] mb-4">Đăng nhập nhanh Google OAuth2</h3>
                  <div className="flex items-center gap-4 p-4 border border-[#e9e8e6] bg-[#faf9f7]">
                    <div className="w-8 h-8 bg-[#4285F4] rounded-full flex items-center justify-center text-white text-xs font-bold">G</div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Liên kết với tài khoản</p>
                      <p className="text-xs text-[#747878]">minhthu.tran@gmail.com</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-[#4CAF50]">
                      <span className="material-icons text-sm">link</span>
                      Đã kích hoạt
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <button className="px-6 py-2.5 bg-[#1c1b1b] text-white text-xs tracking-widest uppercase hover:bg-[#333] transition-colors">Lưu thay đổi</button>
                </div>
              </div>
            )}

            {activeTab === 'address' && (
              <div className="bg-white border border-[#e9e8e6] p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-xl text-[#1c1b1b]">Sổ Địa Chỉ Nhận Hàng</h2>
                  <button className="flex items-center gap-2 text-xs text-[#c9a84c] border border-[#c9a84c] px-3 py-2 hover:bg-[#c9a84c08] transition-colors">
                    <span className="material-icons text-sm">add</span>
                    Thêm địa chỉ mới
                  </button>
                </div>
                {[
                  { name: 'Trần Minh Thư', phone: '+84 912 345 678', address: '123 Lê Lợi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh', default: true },
                  { name: 'Trần Minh Thư (Công ty)', phone: '+84 912 345 678', address: '456 Điện Biên Phủ, Phường 25, Bình Thạnh, TP. Hồ Chí Minh', default: false },
                ].map((addr, i) => (
                  <div key={i} className={`border p-4 mb-3 ${addr.default ? 'border-[#c9a84c] bg-[#c9a84c08]' : 'border-[#e9e8e6]'}`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-medium">{addr.name}</p>
                          {addr.default && <span className="text-[10px] bg-[#c9a84c] text-white px-1.5 py-0.5">Mặc định</span>}
                        </div>
                        <p className="text-xs text-[#747878]">{addr.phone}</p>
                        <p className="text-xs text-[#747878] mt-1">{addr.address}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="text-xs text-[#c9a84c] hover:underline">Sửa</button>
                        {!addr.default && <button className="text-xs text-[#ba1a1a] hover:underline">Xóa</button>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <StorefrontFooter />
    </div>
  );
}
