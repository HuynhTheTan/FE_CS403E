import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StorefrontHeader from '../components/StorefrontHeader';
import StorefrontFooter from '../components/StorefrontFooter';

const wishlistItems = [
  { id: 1, cat: 'Độc bản Thu Đông', subCat: 'May đo & Áo khoác', name: 'Áo Blazer Dạ Cashmere Dáng Suông', price: 8450000, original: 10200000, color: 'Kem Oat', size: 'M', stock: 3 },
  { id: 2, cat: 'Haute Couture', subCat: 'Đầm Dạ Tiệc', name: 'Đầm Lụa Satin Cổ Đổ Haute Couture', price: 6890000, original: null, color: 'Đen Noir', size: 'XS', stock: null },
  { id: 3, cat: 'Quần Nữ Sang Trọng', subCat: null, name: 'Quần Tây Xếp Ly Ống Rộng Wool Blend', price: 3650000, original: null, color: 'Nâu Mocha', size: 'M', stock: null },
  { id: 4, cat: 'Dệt Kim Cao Cấp', subCat: null, name: 'Cardigan Len Lông Cừu Merino Nút Vỏ Sò', price: 4200000, original: null, color: 'Xanh Navy', size: 'S', stock: 2 },
  { id: 5, cat: 'Phụ Kiện Da Thuần', subCat: null, name: 'Túi Xách Da Bê Structured Baguette', price: 11500000, original: null, color: 'Đen', size: 'Tiêu Chuẩn (28 x 15cm)', stock: null },
  { id: 6, cat: 'Sơ Mi & Áo Kiểu', subCat: null, name: 'Áo Sơ Mi Lụa Tơ Tằm Cổ Điển Dáng Rủ', price: 2980000, original: 3500000, color: 'Trắng kem', size: 'S', stock: null },
];

export default function WishlistPage() {
  const [items, setItems] = useState(wishlistItems);
  const navigate = useNavigate();
  const fmt = (n: number) => n.toLocaleString('vi-VN') + '₫';

  const removeItem = (id: number) => setItems(p => p.filter(item => item.id !== id));

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <StorefrontHeader wishlistCount={items.length} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* VIP promo banner */}
        <div className="bg-[#1c1b1b] p-4 mb-6 flex items-center gap-3 flex-wrap">
          <span className="material-icons text-[#c9a84c]">stars</span>
          <p className="text-sm text-white flex-1">
            <span className="font-medium">Đặc quyền danh sách lưu: Giảm thêm <span className="text-[#c9a84c]">10%</span></span>
            {' '}khi mua từ 2 sản phẩm trở lên hôm nay.
          </p>
          <span className="text-[10px] text-[#c9a84c] border border-[#c9a84c44] px-2 py-1">Mã tự động áp dụng</span>
        </div>

        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <p className="text-[10px] tracking-widest uppercase text-[#747878] mb-0.5">Khách Hàng Thân Thiết</p>
            <h1 className="font-serif text-2xl text-[#1c1b1b]">Bộ Sưu Tập Lưu Trữ</h1>
            <p className="text-sm text-[#747878] mt-0.5">Danh Sách Yêu Thích <span className="font-medium text-[#1c1b1b]">({items.length} món)</span></p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setItems([])} className="flex items-center gap-1.5 px-3 py-2 text-xs border border-[#e9e8e6] text-[#747878] hover:border-[#ba1a1a] hover:text-[#ba1a1a] transition-colors">
              <span className="material-icons text-sm">delete_sweep</span> Xóa danh sách
            </button>
            <button onClick={() => navigate('/cart')} className="flex items-center gap-1.5 px-3 py-2 text-xs bg-[#1c1b1b] text-white hover:bg-[#333] transition-colors">
              Thêm tất cả vào túi
            </button>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <span className="material-icons text-5xl text-[#c4c7c7] mb-4 block">favorite_border</span>
            <p className="text-[#747878] text-sm">Danh sách yêu thích của bạn đang trống.</p>
            <Link to="/products" className="inline-block mt-4 px-6 py-2.5 bg-[#1c1b1b] text-white text-xs tracking-widest uppercase">Khám phá sản phẩm</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map(item => (
              <div key={item.id} className="bg-white border border-[#e9e8e6] flex flex-col">
                {/* Image */}
                <div className="relative aspect-[3/4] bg-[#f4f3f1] flex items-center justify-center group">
                  <span className="material-icons text-5xl text-[#c4c7c7]">styler</span>
                  <button onClick={() => removeItem(item.id)} className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:text-[#ba1a1a] transition-colors">
                    <span className="material-icons text-sm">close</span>
                  </button>
                  {item.original && (
                    <span className="absolute top-2 left-2 text-[10px] px-2 py-0.5 bg-[#c9a84c] text-white font-medium">
                      -{Math.round((1 - item.price / item.original) * 100)}%
                    </span>
                  )}
                  {item.stock !== null && item.stock <= 3 && (
                    <div className="absolute bottom-0 left-0 right-0 bg-[#1c1b1b88] text-white text-[10px] text-center py-1">
                      Còn {item.stock} sản phẩm
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-4 flex flex-col flex-1">
                  <p className="text-[10px] text-[#c9a84c] uppercase tracking-wider mb-0.5">{item.cat}</p>
                  {item.subCat && <p className="text-[10px] text-[#747878] mb-1">{item.subCat}</p>}
                  <p className="text-sm font-medium text-[#1c1b1b] leading-snug mb-2 flex-1">{item.name}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-semibold text-[#1c1b1b]">{fmt(item.price)}</span>
                    {item.original && <span className="text-xs text-[#747878] line-through">{fmt(item.original)}</span>}
                  </div>
                  <div className="flex gap-2 text-[10px] text-[#747878] mb-3">
                    <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-[#c4b49a] border border-[#e9e8e6]" />{item.color}</span>
                    <span>·</span>
                    <span>Cỡ: {item.size}</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => navigate('/cart')} className="flex-1 py-2 bg-[#1c1b1b] text-white text-[10px] tracking-widest uppercase flex items-center justify-center gap-1 hover:bg-[#333] transition-colors">
                      <span className="material-icons text-xs">add_shopping_cart</span> Thêm vào túi
                    </button>
                    <button onClick={() => navigate('/cart')} className="px-3 py-2 border border-[#e9e8e6] text-[10px] text-[#1c1b1b] hover:border-[#c9a84c] transition-colors whitespace-nowrap">Mua ngay</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <StorefrontFooter />
    </div>
  );
}
