import { useState } from 'react';
import { Link } from 'react-router-dom';
import StorefrontHeader from '../components/StorefrontHeader';
import StorefrontFooter from '../components/StorefrontFooter';
import { products as allProducts, productImages } from '../data/images';

const categories = [
  { name: 'Thời trang', icon: 'checkroom', sub: 'Bộ sưu tập mới', image: productImages.trenchCoat },
  { name: 'Phụ Kiện', icon: 'watch', sub: 'Túi & Trang sức', image: productImages.beigeGown },
  { name: 'Đồ Mặc Nhà', icon: 'bedroom_child', sub: 'Thoải mái cao cấp', image: productImages.casualCouple },
  { name: 'Hàng Mới', icon: 'new_releases', sub: 'Thu Đông 2026', image: productImages.sweaters },
];

const testimonials = [
  {
    name: 'Khánh Linh',
    role: 'Khách hàng VIP',
    comment: 'Chất vải lụa mềm mại vượt kỳ vọng. Form dáng chuẩn phong cách may đo bespoke cao cấp.',
    rating: 5,
  },
  {
    name: 'Hoàng Minh',
    role: 'Verified Buyer',
    comment: 'Đóng gói tinh tế như một hộp quà sang trọng. Thời gian giao hỏa tốc chỉ trong 2 tiếng.',
    rating: 5,
  },
  {
    name: 'Trang Nguyễn',
    role: 'Stylist tự do',
    comment: 'Thiết kế tối giản nhưng toát lên thần thái riêng. Sẽ tiếp tục đồng hành lâu dài cùng VT STORE.',
    rating: 5,
  },
];

const fmt = (n: number) => n.toLocaleString('vi-VN') + '₫';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'Tất cả' | 'MỚI' | 'HOT'>('Tất cả');
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  // Logic lọc sản phẩm theo tab thực tế
  const filteredProducts = allProducts.filter((p: any) => {
    if (activeTab === 'MỚI') return p.badge?.includes('MỚI') || p.badge?.includes('NEW');
    if (activeTab === 'HOT') return p.hot || p.badge?.includes('HOT') || p.badge?.startsWith('-');
    return true;
  }).slice(0, 6);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    showToast('Đăng ký thành công! Mã giảm giá 10% đã gửi vào hộp thư.');
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-[#faf9f7] text-[#1c1b1b]">
      <StorefrontHeader />

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1c1b1b] text-white px-5 py-3 rounded-lg shadow-xl text-xs flex items-center gap-2 border border-[#c9a84c]/30 animate-fade-in">
          <span className="material-icons text-[#c9a84c] text-sm">check_circle</span>
          {toastMsg}
        </div>
      )}

      {/* 1. Hero Section */}
      <section className="relative overflow-hidden min-h-[560px] lg:min-h-[640px] flex items-center">
        <img src={productImages.elegantWoman} alt="VT Store Hero" className="absolute inset-0 w-full h-full object-cover scale-105 animate-pulse-slow" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1c1b1b] via-[#1c1b1bcc] to-[#1c1b1b33]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-32 w-full">
          <div className="max-w-xl">
            <span className="inline-block py-1 px-3 bg-[#c9a84c]/20 border border-[#c9a84c]/40 text-[#c9a84c] text-[10px] tracking-[0.3em] uppercase mb-5 font-medium rounded-full">
              VT Store Luxury Collection
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-light leading-tight mb-6">
              Bộ Sưu Tập<br /><em className="italic text-[#c9a84c]">Thu Đông 2026</em>
            </h1>
            <p className="text-[#c4c7c7] text-sm mb-8 font-light leading-relaxed">
              Khám phá sự giao thoa giữa nghệ thuật cắt may đương đại và chất liệu thượng hạng — 100% Lụa tự nhiên, Len Cashmere nguyên bản.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/products" className="px-8 py-3.5 bg-[#c9a84c] text-[#1c1b1b] text-xs tracking-widest uppercase font-semibold hover:bg-[#e8d5a3] transition-all shadow-md">
                Khám Phá Ngay
              </Link>
              <Link to="/collections" className="px-8 py-3.5 border border-white/60 text-white text-xs tracking-widest uppercase font-light hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all">
                Xem Bộ Sưu Tập
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust Bar */}
      <section className="border-b border-[#e9e8e6] bg-white shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: 'local_shipping', title: 'Miễn phí vận chuyển', sub: 'Đơn hàng tiêu chuẩn từ 500.000₫' },
            { icon: 'verified', title: 'Kiểm định chính hãng', sub: 'Đồng kiểm trước khi thanh toán' },
            { icon: 'autorenew', title: 'Đổi trả linh hoạt', sub: 'Đổi trả tận nơi trong 30 ngày' },
            { icon: 'diamond', title: 'Chất liệu tuyển chọn', sub: '100% Cashmere & Lụa thượng hạng' },
          ].map((item) => (
            <div key={item.icon} className="flex items-center gap-3 py-1">
              <div className="w-10 h-10 rounded-full bg-[#f6f2e9] flex items-center justify-center flex-shrink-0">
                <span className="material-icons text-[#c9a84c] text-xl">{item.icon}</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#1c1b1b]">{item.title}</p>
                <p className="text-[11px] text-[#747878] mt-0.5">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Danh mục nổi bật */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#c9a84c] font-semibold mb-1.5">Khám phá danh mục</p>
            <h2 className="font-serif text-3xl text-[#1c1b1b]">Danh Mục Tuyển Chọn</h2>
          </div>
          <Link to="/collections" className="text-xs text-[#c9a84c] font-medium flex items-center gap-1 hover:gap-2 transition-all">
            Xem tất cả <span className="material-icons text-sm">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link key={cat.name} to="/products" className="group relative overflow-hidden aspect-[3/4] flex flex-col justify-end rounded-sm shadow-xs">
              <img src={cat.image} alt={cat.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1c1b1b] via-[#1c1b1b44] to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="relative p-5">
                <p className="text-[10px] text-[#c9a84c] tracking-wider uppercase font-medium">{cat.sub}</p>
                <p className="font-serif text-xl text-white font-normal mt-1 flex items-center justify-between">
                  {cat.name}
                  <span className="material-icons text-sm opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all">north_east</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Story Banner / Brand Highlight */}
      <section className="bg-white border-y border-[#e9e8e6] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
            <img src={productImages.casualCouple} alt="Chất liệu tự nhiên" className="w-full h-full object-cover" />
            <div className="absolute -bottom-4 -right-4 w-36 h-36 bg-[#c9a84c]/10 -z-10 rounded-full blur-xl" />
          </div>
          <div className="lg:pl-8 space-y-5">
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#c9a84c] font-semibold">Triết lý thiết kế</p>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1c1b1b] leading-tight">
              Tối giản trong kiểu dáng, hoàn mỹ từng mũi chỉ
            </h2>
            <p className="text-sm text-[#747878] leading-relaxed">
              Mỗi sản phẩm tại VT STORE được kiến tạo như một tác phẩm nghệ thuật. Chúng tôi nói không với thời trang nhanh (Fast Fashion), tập trung vào sự bền bỉ của chất vải và phom dáng trường tồn theo năm tháng.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-3">
              <div className="border-l-2 border-[#c9a84c] pl-4">
                <p className="font-serif text-2xl font-bold text-[#1c1b1b]">100%</p>
                <p className="text-xs text-[#747878] mt-1">Sợi tự nhiên hữu cơ</p>
              </div>
              <div className="border-l-2 border-[#c9a84c] pl-4">
                <p className="font-serif text-2xl font-bold text-[#1c1b1b]">50.000+</p>
                <p className="text-xs text-[#747878] mt-1">Khách hàng tin chọn</p>
              </div>
            </div>
            <div className="pt-2">
              <Link to="/products" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#1c1b1b] hover:text-[#c9a84c] transition-colors">
                Tìm hiểu thêm về chất liệu <span className="material-icons text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Sản phẩm bán chạy & Bộ lọc tab */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#c9a84c] font-semibold mb-1.5">Sản phẩm được yêu thích nhất</p>
            <h2 className="font-serif text-3xl text-[#1c1b1b]">Bán Chạy Nhất</h2>
          </div>
          <div className="flex gap-1.5 bg-[#eceae6] p-1 rounded-sm w-fit">
            {(['Tất cả', 'MỚI', 'HOT'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`px-5 py-2 text-xs tracking-wider transition-all cursor-pointer ${
                  activeTab === t
                    ? 'bg-[#1c1b1b] text-white font-medium shadow-xs'
                    : 'text-[#747878] hover:text-[#1c1b1b]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {filteredProducts.map((p: any) => (
            <div key={p.id} className="group flex flex-col bg-white border border-[#e9e8e6] p-3 rounded-sm hover:shadow-md transition-shadow">
              <div className="relative aspect-[3/4] mb-3 overflow-hidden bg-neutral-100 rounded-xs">
                <Link to={`/products/${p.id}`}>
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </Link>

                {p.badge && (
                  <span className={`absolute top-2 left-2 text-[10px] px-2.5 py-0.5 font-medium tracking-wider ${p.badge.startsWith('-') ? 'bg-[#c9a84c] text-[#1c1b1b]' : 'bg-[#1c1b1b] text-white'}`}>
                    {p.badge}
                  </span>
                )}
                {p.hot && !p.badge && (
                  <span className="absolute top-2 left-2 text-[10px] px-2.5 py-0.5 font-medium tracking-wider bg-[#ba1a1a] text-white">HOT</span>
                )}

                <button
                  onClick={() => showToast(`Đã thêm ${p.name} vào danh sách yêu thích!`)}
                  className="absolute top-2 right-2 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm cursor-pointer"
                  title="Thêm vào yêu thích"
                >
                  <span className="material-icons text-sm text-[#1c1b1b]">favorite_border</span>
                </button>

                <button
                  onClick={() => showToast(`Đã thêm 1x "${p.name}" vào giỏ hàng!`)}
                  className="absolute bottom-0 left-0 right-0 py-2.5 bg-[#1c1b1b]/95 hover:bg-[#c9a84c] hover:text-[#1c1b1b] text-white text-[10px] tracking-widest uppercase text-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer font-medium"
                >
                  + Thêm Vào Giỏ
                </button>
              </div>

              <p className="text-[11px] text-[#747878] mb-1">{p.desc}</p>
              <Link to={`/products/${p.id}`} className="text-sm font-medium text-[#1c1b1b] mb-1.5 hover:text-[#c9a84c] transition-colors truncate">
                {p.name}
              </Link>
              <div className="flex items-center gap-2 mt-auto">
                <span className="text-sm font-semibold text-[#1c1b1b]">{fmt(p.price)}</span>
                {p.original && <span className="text-xs text-[#747878] line-through">{fmt(p.original)}</span>}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/products" className="inline-flex items-center gap-2 px-9 py-3.5 border border-[#1c1b1b] text-xs tracking-widest uppercase hover:bg-[#1c1b1b] hover:text-white transition-all font-medium">
            Xem Tất Cả Sản Phẩm <span className="material-icons text-sm">arrow_forward</span>
          </Link>
        </div>
      </section>

      {/* 6. Đánh giá từ khách hàng */}
      <section className="bg-white border-t border-[#e9e8e6] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-10">
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#c9a84c] font-semibold mb-1.5">Trải nghiệm khách hàng</p>
            <h2 className="font-serif text-3xl text-[#1c1b1b]">Khách Hàng Nói Về VT STORE</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-[#faf9f7] p-6 border border-[#e9e8e6] rounded-sm flex flex-col justify-between">
                <div>
                  <div className="flex text-[#c9a84c] text-sm mb-3">
                    {'★'.repeat(t.rating)}
                  </div>
                  <p className="text-xs text-[#555] italic leading-relaxed mb-6">"{t.comment}"</p>
                </div>
                <div className="border-t border-[#e9e8e6] pt-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-[#1c1b1b]">{t.name}</p>
                    <p className="text-[10px] text-[#747878]">{t.role}</p>
                  </div>
                  <span className="material-icons text-sm text-emerald-600">verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Ưu đãi thành viên & Voucher */}
      <section className="bg-[#1c1b1b] py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#c9a84c] mb-2 font-semibold">Ưu đãi đặc quyền</p>
            <h2 className="font-serif text-3xl text-white font-light">Đặc Quyền Hội Viên 2026</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
            {[
              { tier: 'Đơn từ 1.000.000₫', discount: 'Giảm 100.000₫', extra: 'Mã: VT100' },
              { tier: 'Đơn từ 3.000.000₫', discount: 'Giảm 350.000₫', extra: '+ Tặng khăn lụa cao cấp' },
              { tier: 'Đơn từ 5.000.000₫', discount: 'Giảm 700.000₫', extra: '+ Miễn phí ship hỏa tốc' },
            ].map((promo) => (
              <div key={promo.tier} className="border border-[#c9a84c]/30 p-7 text-center hover:border-[#c9a84c] transition-all bg-[#232222]/50">
                <p className="text-[10px] tracking-widest text-[#c9a84c] uppercase mb-3 font-semibold">{promo.tier}</p>
                <p className="font-serif text-2xl text-white mb-2">{promo.discount}</p>
                <p className="text-xs text-[#999]">{promo.extra}</p>
              </div>
            ))}
          </div>

          {/* Form đăng ký nhận tin */}
          <div className="max-w-md mx-auto text-center border-t border-neutral-800 pt-8">
            <p className="text-xs uppercase tracking-widest text-neutral-300 font-medium mb-2">Nhận voucher giảm 10% đơn đầu tiên</p>
            <p className="text-[11px] text-neutral-500 mb-4">Đăng ký email để cập nhật các bộ sưu tập giới hạn mới nhất.</p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                placeholder="Nhập địa chỉ email của bạn..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2.5 bg-neutral-900 border border-neutral-700 text-xs text-white placeholder-neutral-500 focus:outline-hidden focus:border-[#c9a84c]"
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#c9a84c] text-[#1c1b1b] text-xs font-semibold uppercase tracking-wider hover:bg-[#e8d5a3] transition-colors cursor-pointer"
              >
                Đăng ký
              </button>
            </form>
          </div>
        </div>
      </section>

      <StorefrontFooter />
    </div>
  );
}