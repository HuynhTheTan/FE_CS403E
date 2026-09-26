import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StorefrontHeader from '../components/StorefrontHeader';
import StorefrontFooter from '../components/StorefrontFooter';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(true);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const navigate = useNavigate();
  const { login } = useAuth();

  // Xử lý đăng nhập thông thường
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Vui lòng nhập đầy đủ Email và Mật khẩu.');
      return;
    }

    try {
      (login as any)?.(email, password);
    } catch {
      // Safe fallback
    }

    if (email.toLowerCase().includes('admin')) {
      navigate('/admin');
    } else {
      navigate('/profile');
    }
  };

  // Đăng nhập nhanh tài khoản mẫu (Demo 1-Click)
  const handleQuickLogin = (role: 'admin' | 'customer') => {
    setError(null);
    if (role === 'admin') {
      setEmail('admin@vtstore.vn');
      setPassword('admin123456');
      try {
        (login as any)?.('admin@vtstore.vn', 'admin123456');
      } catch {
        // Safe fallback
      }
      navigate('/admin');
    } else {
      setEmail('vip.member@vtstore.vn');
      setPassword('vip123456');
      try {
        (login as any)?.('vip.member@vtstore.vn', 'vip123456');
      } catch {
        // Safe fallback
      }
      navigate('/profile');
    }
  };

  // Xử lý Đăng ký VIP
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName || !phone || !email || !password) {
      setError('Vui lòng điền đầy đủ tất cả các trường thông tin.');
      return;
    }

    setSuccessMsg('Đăng ký thành viên VIP thành công! Vui lòng đăng nhập.');
    setTimeout(() => {
      setSuccessMsg(null);
      setMode('login');
    }, 1800);
  };

  // Xử lý Quên mật khẩu
  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError('Vui lòng nhập email nhận liên kết khôi phục.');
      return;
    }

    setSuccessMsg(`Liên kết đặt lại mật khẩu đã được gửi tới ${email}.`);
    setTimeout(() => {
      setSuccessMsg(null);
      setMode('login');
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#faf9f7] text-[#1c1b1b]">
      <StorefrontHeader />

      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left: Brand Panel */}
        <div className="hidden lg:block bg-[#1c1b1b] p-10 sticky top-24 rounded-xs shadow-md">
          <div className="flex items-center gap-2 mb-8">
            <span className="material-icons text-[#c9a84c]">diamond</span>
            <span className="font-serif text-2xl text-white tracking-widest">VT Privé Club</span>
            <span className="text-[10px] text-[#747878] border border-[#444] px-1.5 py-0.5 ml-2">FW26</span>
          </div>

          <div className="mb-8">
            <p className="text-[10px] tracking-[0.3em] text-[#c9a84c] uppercase mb-3">Tuyên ngôn thời trang</p>
            <h2 className="font-serif text-3xl text-white font-light italic leading-tight">
              The Architecture<br />of Elegance
            </h2>
          </div>

          <div className="space-y-4 mb-10">
            <p className="text-[10px] tracking-widest uppercase text-[#747878]">Đặc quyền dành riêng cho Hội viên VT</p>
            {[
              { num: '10%', label: 'Tích điểm hoàn tiền trên mọi đơn hàng' },
              { num: 'VIP', label: 'Ưu đãi và quà tặng sinh nhật riêng biệt' },
              { num: '07', label: 'Ngày đổi trả tận nơi không cần lý do' },
            ].map((d) => (
              <div key={d.num} className="flex items-center gap-4">
                <div className="w-12 h-12 border border-[#c9a84c]/40 flex items-center justify-center flex-shrink-0 bg-[#242323]">
                  <span className="font-serif text-[#c9a84c] text-lg font-semibold">{d.num}</span>
                </div>
                <p className="text-sm text-[#c4c7c7] font-light">{d.label}</p>
              </div>
            ))}
          </div>

          {/* Tiện ích đăng nhập nhanh dành cho demo */}
          <div className="border border-[#c9a84c]/30 bg-[#252424] p-4 rounded-xs mb-8">
            <p className="text-[10px] tracking-widest uppercase text-[#c9a84c] font-semibold mb-2 flex items-center gap-1.5">
              <span className="material-icons text-xs">bolt</span> Demo 1-Click (Đăng nhập nhanh)
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('customer')}
                className="py-2 px-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs text-left rounded-xs transition-colors cursor-pointer"
              >
                👤 Khách hàng VIP
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('admin')}
                className="py-2 px-3 bg-[#c9a84c] hover:bg-[#e8d5a3] text-[#1c1b1b] text-xs font-medium text-left rounded-xs transition-colors cursor-pointer"
              >
                ⚡ Quản trị Admin
              </button>
            </div>
          </div>

          <div className="border-t border-[#333] pt-6">
            <div className="flex items-center gap-2 text-[10px] text-[#747878]">
              <span className="material-icons text-sm">lock</span>
              Bảo mật mã hóa SSL 256-Bit
            </div>
            <p className="text-[10px] text-[#747878] mt-1">© 2026 VT Store Haute Couture — SỐNG CÙNG ĐẲNG CẤP</p>
          </div>
        </div>

        {/* Right: Form Panel */}
        <div className="bg-white border border-[#e9e8e6] p-8 sm:p-10 shadow-sm rounded-xs">
          {/* Mode switcher */}
          <div className="flex border border-[#e9e8e6] mb-6 rounded-xs overflow-hidden">
            {[
              { key: 'login', icon: 'login', label: 'Đăng nhập' },
              { key: 'register', icon: 'person_add', label: 'Đăng ký VIP' },
              { key: 'forgot', icon: 'lock_reset', label: 'Quên mật khẩu' },
            ].map((m) => (
              <button
                key={m.key}
                type="button"
                onClick={() => {
                  setMode(m.key as any);
                  setError(null);
                  setSuccessMsg(null);
                }}
                className={`flex-1 py-3 flex flex-col items-center justify-center gap-1 text-[11px] transition-all cursor-pointer ${
                  mode === m.key ? 'bg-[#1c1b1b] text-white font-medium' : 'text-[#747878] hover:text-[#1c1b1b] bg-neutral-50/50'
                }`}
              >
                <span className="material-icons text-base">{m.icon}</span>
                <span>{m.label}</span>
              </button>
            ))}
          </div>

          {/* Feedback banners */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xs flex items-center gap-2">
              <span className="material-icons text-sm">error_outline</span>
              {error}
            </div>
          )}
          {successMsg && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xs flex items-center gap-2">
              <span className="material-icons text-sm">check_circle</span>
              {successMsg}
            </div>
          )}

          {/* 1. Form Đăng nhập */}
          {mode === 'login' && (
            <form onSubmit={handleLoginSubmit}>
              <h2 className="font-serif text-2xl text-[#1c1b1b] mb-1">Mừng bạn trở lại</h2>
              <p className="text-xs text-[#747878] mb-6">Khám phá không gian mua sắm tinh tuyển và theo dõi đơn hàng của bạn.</p>

              <button
                type="button"
                onClick={() => handleQuickLogin('customer')}
                className="w-full py-3 border border-[#e9e8e6] flex items-center justify-center gap-3 mb-4 hover:border-[#c9a84c] hover:bg-neutral-50 transition-all text-xs font-medium cursor-pointer"
              >
                <span className="w-4 h-4 rounded-full bg-[#4285F4] text-white text-[9px] font-bold flex items-center justify-center">G</span>
                Đăng nhập nhanh với Google
              </button>

              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 h-px bg-[#e9e8e6]" />
                <span className="text-[11px] text-[#747878] uppercase tracking-wider">hoặc bằng tài khoản</span>
                <div className="flex-1 h-px bg-[#e9e8e6]" />
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#747878] mb-1.5 block font-medium">Địa chỉ Email</label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@vtstore.vn hoặc email cá nhân"
                      className="w-full border border-[#e9e8e6] px-3.5 pr-10 py-2.5 text-sm outline-none focus:border-[#c9a84c] rounded-xs"
                    />
                    <span className="material-icons absolute right-3 top-1/2 -translate-y-1/2 text-[#747878] text-lg">mail</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-[#747878] font-medium">Mật khẩu</label>
                    <button
                      type="button"
                      onClick={() => setMode('forgot')}
                      className="text-[10px] text-[#c9a84c] hover:underline cursor-pointer"
                    >
                      Quên mật khẩu?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPass ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full border border-[#e9e8e6] px-3.5 pr-10 py-2.5 text-sm outline-none focus:border-[#c9a84c] rounded-xs"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#747878] hover:text-[#1c1b1b] cursor-pointer"
                    >
                      <span className="material-icons text-lg">{showPass ? 'visibility_off' : 'visibility'}</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    id="remember"
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="w-4 h-4 accent-[#1c1b1b] cursor-pointer"
                  />
                  <label htmlFor="remember" className="text-xs text-[#747878] cursor-pointer select-none">
                    Ghi nhớ đăng nhập trên thiết bị này
                  </label>
                  <div className="ml-auto flex items-center gap-1 text-[10px] text-[#c9a84c] font-medium">
                    <span className="material-icons text-xs">shield</span> Bảo mật 2FA
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#1c1b1b] text-white text-xs tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-[#333] transition-all cursor-pointer font-medium mt-2 shadow-xs"
                >
                  Đăng nhập vào tài khoản
                  <span className="material-icons text-sm">arrow_forward</span>
                </button>
              </div>

              <p className="text-center text-xs text-[#747878] mt-6">
                Bạn chưa có tài khoản hội viên?{' '}
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className="text-[#c9a84c] font-medium hover:underline cursor-pointer"
                >
                  Tạo tài khoản VIP
                </button>
              </p>
            </form>
          )}

          {/* 2. Form Đăng ký VIP */}
          {mode === 'register' && (
            <form onSubmit={handleRegisterSubmit}>
              <h2 className="font-serif text-2xl text-[#1c1b1b] mb-1">Khởi tạo phong cách</h2>
              <p className="text-xs text-[#747878] mb-6">Gia nhập cộng đồng thượng lưu VT Privé Club để nhận trọn vẹn đặc quyền.</p>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#747878] mb-1.5 block font-medium">Họ và tên quý khách</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Nguyễn Văn A"
                      className="w-full border border-[#e9e8e6] px-3.5 pr-10 py-2.5 text-sm outline-none focus:border-[#c9a84c] rounded-xs"
                    />
                    <span className="material-icons absolute right-3 top-1/2 -translate-y-1/2 text-[#747878] text-lg">badge</span>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#747878] mb-1.5 block font-medium">Số điện thoại liên hệ</label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0912 345 678"
                      className="w-full border border-[#e9e8e6] px-3.5 pr-10 py-2.5 text-sm outline-none focus:border-[#c9a84c] rounded-xs"
                    />
                    <span className="material-icons absolute right-3 top-1/2 -translate-y-1/2 text-[#747878] text-lg">call</span>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#747878] mb-1.5 block font-medium">Địa chỉ Email</label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@email.com"
                      className="w-full border border-[#e9e8e6] px-3.5 pr-10 py-2.5 text-sm outline-none focus:border-[#c9a84c] rounded-xs"
                    />
                    <span className="material-icons absolute right-3 top-1/2 -translate-y-1/2 text-[#747878] text-lg">mail</span>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#747878] mb-1.5 block font-medium">Mật khẩu bảo mật</label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Tối thiểu 6 ký tự"
                      className="w-full border border-[#e9e8e6] px-3.5 pr-10 py-2.5 text-sm outline-none focus:border-[#c9a84c] rounded-xs"
                    />
                    <span className="material-icons absolute right-3 top-1/2 -translate-y-1/2 text-[#747878] text-lg">key</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#c9a84c] text-[#1c1b1b] text-xs font-semibold tracking-widest uppercase hover:bg-[#e8d5a3] transition-all cursor-pointer rounded-xs shadow-xs mt-2"
                >
                  Gia nhập VT Privé Club
                </button>
              </div>

              <p className="text-center text-xs text-[#747878] mt-6">
                Đã có tài khoản?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-[#c9a84c] font-medium hover:underline cursor-pointer"
                >
                  Đăng nhập ngay
                </button>
              </p>
            </form>
          )}

          {/* 3. Form Quên mật khẩu */}
          {mode === 'forgot' && (
            <form onSubmit={handleForgotSubmit}>
              <h2 className="font-serif text-2xl text-[#1c1b1b] mb-1">Khôi phục mật khẩu</h2>
              <p className="text-xs text-[#747878] mb-6">Nhập email đăng ký tài khoản của bạn để nhận hướng dẫn thiết lập lại mật khẩu.</p>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#747878] mb-1.5 block font-medium">Địa chỉ Email đã đăng ký</label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@email.com"
                      className="w-full border border-[#e9e8e6] px-3.5 pr-10 py-2.5 text-sm outline-none focus:border-[#c9a84c] rounded-xs"
                    />
                    <span className="material-icons absolute right-3 top-1/2 -translate-y-1/2 text-[#747878] text-lg">mail</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#1c1b1b] text-white text-xs tracking-widest uppercase hover:bg-[#333] transition-all cursor-pointer font-medium shadow-xs"
                >
                  Gửi liên kết khôi phục
                </button>

                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="block text-center text-xs text-[#747878] hover:text-[#1c1b1b] w-full pt-2 cursor-pointer"
                >
                  ← Quay lại màn hình đăng nhập
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <StorefrontFooter />
    </div>
  );
}