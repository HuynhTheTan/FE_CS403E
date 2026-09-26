import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import StorefrontHeader from '../components/StorefrontHeader';
import StorefrontFooter from '../components/StorefrontFooter';
import { products as allProducts } from '../data/images';

const categories = ['Áo sơ mi & Blouse', 'Đầm dạ hội', 'Áo khoác & Blazer', 'Quần tây cao cấp', 'Chân váy midi'];
const sizes = ['XS', 'S', 'M', 'L', 'XL'];
const materials = ['Lụa tơ tằm', 'Dạ Cashmere', 'Linen tự nhiên', 'Cotton cao cấp'];
const colors = ['#1c1b1b', '#f5f0e8', '#9e9e9e', '#8B6914', '#c4b49a'];
const sorts = ['Mới nhất', 'Giá tăng dần', 'Giá giảm dần'];
const fmt = (n: number) => n.toLocaleString('vi-VN') + ' đ';

export default function ProductListPage() {
  const location = useLocation();
  const isNewArrivals = location.pathname.includes('new-arrivals');

  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sort, setSort] = useState('Mới nhất');
  const [priceMax, setPriceMax] = useState(10000000);
  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggleCat = (c: string) => setSelectedCats(p => p.includes(c) ? p.filter(x => x !== c) : [...p, c]);
  const toggleSize = (s: string) => setSelectedSizes(p => p.includes(s) ? p.filter(x => x !== s) : [...p, s]);
  const toggleWishlist = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    setWishlist(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  };

  // 1. Phân loại nguồn sản phẩm: Nếu ở /new-arrivals thì chỉ lấy hàng mới/hot
  const sourceProducts = isNewArrivals
    ? allProducts.filter((p: any) => 
        p.badge?.includes('MỚI') || 
        p.badge?.includes('NEW') || 
        p.hot || 
        (p.badge && p.badge !== '')
      )
    : allProducts;

  // 2. Lọc theo danh mục và giá
  let filtered = sourceProducts.filter(p =>
    (selectedCats.length === 0 || selectedCats.includes(p.cat)) &&
    p.price <= priceMax
  );

  // 3. Sắp xếp
  if (sort === 'Giá tăng dần') filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === 'Giá giảm dần') filtered = [...filtered].sort((a, b) => b.price - a.price);

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <StorefrontHeader />

      {/* Hero Banner linh hoạt theo trang */}
      <div className="bg-[#1c1b1b] py-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#c9a84c_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="relative max-w-4xl mx-auto px-4">
          <p className="text-[10px] tracking-[0.3em] text-[#c9a84c] uppercase mb-2 font-medium">
            {isNewArrivals ? 'VT Store • Giới Hạn Mùa Mới' : 'VT Store • Danh Mục Tinh Tuyển'}
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl text-white font-light">
            {isNewArrivals ? 'Bộ Sưu Tập Mới Về' : 'Tất Cả Sản Phẩm'}
          </h1>
          <p className="text-[#c4c7c7] text-xs sm:text-sm mt-2 italic font-light">
            {isNewArrivals
              ? 'Khám phá những sáng tạo mới nhất mùa Thu Đông 2026 với form dáng chuẩn mực.'
              : 'Trọn bộ thiết kế trang phục đương đại may đo tỉ mỉ vượt thời gian.'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex gap-8">
        {/* Sidebar filter */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs tracking-widest uppercase font-semibold">Bộ lọc</h3>
              <button 
                onClick={() => { setSelectedCats([]); setSelectedSizes([]); setPriceMax(10000000); }} 
                className="text-[10px] text-[#c9a84c] hover:underline cursor-pointer"
              >
                Xóa tất cả
              </button>
            </div>

            <div className="mb-6">
              <h4 className="text-[10px] tracking-widest uppercase text-[#747878] mb-3">Danh mục</h4>
              {categories.map(c => (
                <label key={c} className="flex items-center gap-2 mb-2 cursor-pointer group">
                  <div 
                    className={`w-4 h-4 border flex items-center justify-center transition-colors flex-shrink-0 ${selectedCats.includes(c) ? 'bg-[#1c1b1b] border-[#1c1b1b]' : 'border-[#c4c7c7] group-hover:border-[#1c1b1b]'}`} 
                    onClick={() => toggleCat(c)}
                  >
                    {selectedCats.includes(c) && <span className="material-icons text-white text-[10px]">check</span>}
                  </div>
                  <span className="text-xs text-[#444748]">{c}</span>
                </label>
              ))}
            </div>

            <div className="mb-6">
              <h4 className="text-[10px] tracking-widest uppercase text-[#747878] mb-3">Khoảng giá</h4>
              <input 
                type="range" 
                min={500000} 
                max={10000000} 
                step={100000} 
                value={priceMax} 
                onChange={e => setPriceMax(Number(e.target.value))} 
                className="w-full accent-[#c9a84c] cursor-pointer" 
              />
              <div className="flex justify-between text-[10px] text-[#747878] mt-1 font-mono">
                <span>500K</span><span>{(priceMax/1000000).toFixed(1)}M₫</span>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-[10px] tracking-widest uppercase text-[#747878] mb-3">Màu sắc</h4>
              <div className="flex gap-2 flex-wrap">
                {colors.map(c => (
                  <button 
                    key={c} 
                    className="w-6 h-6 rounded-full border-2 border-[#e9e8e6] hover:scale-110 transition-transform cursor-pointer" 
                    style={{backgroundColor: c}} 
                  />
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-[10px] tracking-widest uppercase text-[#747878] mb-3">Kích cỡ</h4>
              <div className="flex gap-2 flex-wrap">
                {sizes.map(s => (
                  <button 
                    key={s} 
                    onClick={() => toggleSize(s)} 
                    className={`w-9 h-9 text-xs border transition-colors cursor-pointer ${selectedSizes.includes(s) ? 'bg-[#1c1b1b] text-white border-[#1c1b1b]' : 'border-[#c4c7c7] hover:border-[#1c1b1b]'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-[10px] tracking-widest uppercase text-[#747878] mb-3">Chất liệu</h4>
              {materials.map(m => (
                <label key={m} className="flex items-center gap-2 mb-2 cursor-pointer">
                  <div className="w-4 h-4 border border-[#c4c7c7] hover:border-[#1c1b1b] transition-colors flex-shrink-0" />
                  <span className="text-xs text-[#444748]">{m}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <p className="text-sm text-[#747878]">
              Hiển thị <span className="font-semibold text-[#1c1b1b]">{filtered.length}</span> {isNewArrivals ? 'mẫu thiết kế mới' : 'sản phẩm'}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#747878]">Sắp xếp:</span>
              <select 
                value={sort} 
                onChange={e => setSort(e.target.value)} 
                className="text-xs border border-[#e9e8e6] px-3 py-1.5 outline-none bg-white cursor-pointer"
              >
                {sorts.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filtered.map(p => (
              <Link key={p.id} to={`/products/${p.id}`} className="group">
                <div className="relative aspect-[3/4] mb-3 overflow-hidden bg-neutral-100">
                  <img 
                    src={p.image} 
                    alt={p.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  {p.badge && (
                    <span className={`absolute top-2 left-2 text-[10px] px-2 py-0.5 font-medium tracking-wider ${p.badge.startsWith('-') ? 'bg-[#c9a84c] text-white' : p.badge === 'HOT' ? 'bg-[#ba1a1a] text-white' : 'bg-[#1c1b1b] text-white'}`}>
                      {p.badge}
                    </span>
                  )}
                  <button 
                    onClick={(e) => toggleWishlist(p.id, e)} 
                    className="absolute top-2 right-2 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm cursor-pointer"
                  >
                    <span className={`material-icons text-sm ${wishlist.includes(p.id) ? 'text-[#ba1a1a]' : 'text-[#1c1b1b]'}`}>
                      {wishlist.includes(p.id) ? 'favorite' : 'favorite_border'}
                    </span>
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 py-2.5 bg-[#1c1b1bcc] text-white text-[10px] tracking-widest uppercase text-center opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                    Thêm vào giỏ
                  </div>
                </div>
                <p className="text-[10px] text-[#747878] mb-0.5">{p.desc}</p>
                <p className="text-sm font-medium text-[#1c1b1b] mb-1 leading-snug group-hover:text-[#c9a84c] transition-colors">{p.name}</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-[#1c1b1b]">{fmt(p.price)}</span>
                  {p.original && <span className="text-xs text-[#747878] line-through">{fmt(p.original)}</span>}
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 bg-white border border-[#e9e8e6] rounded-xs">
              <span className="material-icons text-4xl text-[#c4c7c7] mb-3 block">search_off</span>
              <p className="text-[#747878] text-sm">Không tìm thấy sản phẩm phù hợp trong danh mục này.</p>
              <button 
                onClick={() => { setSelectedCats([]); setPriceMax(10000000); }} 
                className="mt-3 text-xs text-[#c9a84c] underline cursor-pointer font-medium"
              >
                Xóa tất cả bộ lọc
              </button>
            </div>
          )}

          {/* Phân trang */}
          {filtered.length > 0 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button className="w-8 h-8 flex items-center justify-center border border-[#e9e8e6] cursor-pointer hover:border-[#1c1b1b]">
                <span className="material-icons text-sm">chevron_left</span>
              </button>
              {[1, 2, 3].map(n => (
                <button 
                  key={n} 
                  className={`w-8 h-8 text-xs border cursor-pointer transition-colors ${n === 1 ? 'bg-[#1c1b1b] text-white border-[#1c1b1b]' : 'border-[#e9e8e6] hover:border-[#1c1b1b]'}`}
                >
                  {n}
                </button>
              ))}
              <button className="w-8 h-8 flex items-center justify-center border border-[#e9e8e6] cursor-pointer hover:border-[#1c1b1b]">
                <span className="material-icons text-sm">chevron_right</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <StorefrontFooter />
    </div>
  );
}