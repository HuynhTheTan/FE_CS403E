import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import StorefrontHeader from '../components/StorefrontHeader';
import StorefrontFooter from '../components/StorefrontFooter';
import { products, productImages } from '../data/images';

const colors = [
  { name: 'Be thanh lịch', hex: '#c4b49a' },
  { name: 'Xám than', hex: '#6b7280' },
  { name: 'Đen huyền', hex: '#1c1b1b' },
];
const sizes = ['XS', 'S', 'M', 'L', 'XL'];
const sizeGuide = [
  { size: 'XS', weight: '45–52', height: '150–160', bust: '80–84', waist: '62–66' },
  { size: 'S', weight: '52–58', height: '155–165', bust: '84–88', waist: '66–70' },
  { size: 'M', weight: '58–65', height: '160–168', bust: '88–92', waist: '70–74' },
  { size: 'L', weight: '65–72', height: '163–170', bust: '92–96', waist: '74–78' },
  { size: 'XL', weight: '72–80', height: '165–173', bust: '96–102', waist: '78–84' },
];
const reviews = [
  { name: 'Nguyễn Minh Anh', days: '2 ngày trước', size: 'M', color: 'Be', fit: 'Vừa vặn', stars: 5, comment: 'Áo rất đẹp, chất liệu cao cấp, may rất tỉ mỉ. Mặc đi sự kiện được nhiều lời khen.' },
  { name: 'Trần Thu Hương', days: '1 tuần trước', size: 'S', color: 'Xám', fit: 'Hơi rộng nhẹ', stars: 4, comment: 'Chất vải mềm và ấm, form dáng đứng. Lần sau sẽ lấy size nhỏ hơn.' },
  { name: 'Hoàng Hải Yến', days: '2 tuần trước', size: 'L', color: 'Đen', fit: 'Chuẩn form', stars: 5, comment: 'Đẳng cấp thật sự, xứng đáng với giá tiền. Đóng gói rất cẩn thận.' },
];

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id)) || products[0];
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [qty, setQty] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const navigate = useNavigate();
  const fmt = (n: number) => n.toLocaleString('vi-VN') + ' đ';

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <StorefrontHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#747878] mb-6">
          <Link to="/" className="hover:text-[#1c1b1b]">Trang chủ</Link>
          <span>›</span>
          <Link to="/products" className="hover:text-[#1c1b1b]">Sản phẩm</Link>
          <span>›</span>
          <span className="text-[#1c1b1b]">Áo Trench Coat Dạ Khâu Tay</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Images */}
          <div className="space-y-3">
            <div className="aspect-[3/4] overflow-hidden relative group">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              <div className="absolute top-3 right-3 flex flex-col gap-2">
                <button onClick={() => setWishlisted(!wishlisted)} className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <span className={`material-icons text-lg ${wishlisted ? 'text-[#ba1a1a]' : 'text-[#1c1b1b]'}`}>{wishlisted ? 'favorite' : 'favorite_border'}</span>
                </button>
                <button className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <span className="material-icons text-lg text-[#1c1b1b]">share</span>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[product.image, productImages.blazer, productImages.sweaters, productImages.silkDress].map((img, i) => (
                <div key={i} className={`aspect-square overflow-hidden cursor-pointer border-2 ${i === 0 ? 'border-[#1c1b1b]' : 'border-transparent hover:border-[#c4c7c7]'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <p className="text-[10px] tracking-[0.3em] text-[#c9a84c] uppercase mb-2">VT Exclusive Atelier</p>
            <h1 className="font-serif text-3xl font-light text-[#1c1b1b] mb-3">{product.name}</h1>
            <div className="flex items-center gap-3 mb-5">
              <span className="text-2xl font-semibold text-[#1c1b1b]">{fmt(product.price)}</span>
              {product.original && <><span className="text-base text-[#747878] line-through">{fmt(product.original)}</span>
              <span className="bg-[#c9a84c] text-white text-xs px-2 py-0.5 font-medium">{product.badge}</span></>}
            </div>
            <div className="flex items-center gap-2 mb-5">
              {[1,2,3,4,5].map(i => <span key={i} className="material-icons text-[#c9a84c] text-sm">star</span>)}
              <span className="text-xs text-[#747878]">4.9 — 98% khách hàng hài lòng (124 đánh giá)</span>
            </div>

            {/* Color */}
            <div className="mb-5">
              <p className="text-xs font-medium mb-3">Màu sắc: <span className="font-light text-[#747878]">{colors[selectedColor].name}</span></p>
              <div className="flex gap-2">
                {colors.map((c, i) => (
                  <button key={i} onClick={() => setSelectedColor(i)} className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColor === i ? 'border-[#1c1b1b] scale-110' : 'border-[#e9e8e6] hover:scale-105'}`} style={{backgroundColor: c.hex}} />
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-medium">Kích cỡ</p>
                <button onClick={() => setShowSizeGuide(true)} className="text-xs text-[#c9a84c] flex items-center gap-1 hover:underline">
                  <span className="material-icons text-sm">straighten</span> Hướng dẫn chọn size
                </button>
              </div>
              <div className="flex gap-2 flex-wrap">
                {sizes.map(s => (
                  <button key={s} onClick={() => setSelectedSize(s)} className={`w-12 h-10 text-xs border transition-colors ${selectedSize === s ? 'bg-[#1c1b1b] text-white border-[#1c1b1b]' : 'border-[#c4c7c7] hover:border-[#1c1b1b]'}`}>{s}</button>
                ))}
              </div>
            </div>

            {/* Qty */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-[#e9e8e6]">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-[#f4f3f1]"><span className="material-icons text-lg">remove</span></button>
                <span className="w-10 text-center text-sm">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-[#f4f3f1]"><span className="material-icons text-lg">add</span></button>
              </div>
              <span className="text-xs text-[#747878]">Còn hàng</span>
            </div>

            <div className="flex gap-3 mb-8">
              <button onClick={() => navigate('/cart')} className="flex-1 py-3 border border-[#1c1b1b] text-[#1c1b1b] text-xs tracking-widest uppercase hover:bg-[#f4f3f1] transition-colors">Thêm vào giỏ hàng</button>
              <button onClick={() => navigate('/cart')} className="flex-1 py-3 bg-[#1c1b1b] text-white text-xs tracking-widest uppercase hover:bg-[#333] transition-colors">Mua ngay</button>
            </div>

            {/* Details */}
            <div className="space-y-3 border-t border-[#e9e8e6] pt-4">
              {[
                { icon: 'texture', text: 'Chất liệu len lông cừu cao cấp' },
                { icon: 'dry_cleaning', text: 'Khuyên dùng giặt khô. Không giặt nước, không tẩy. Ủi ở nhiệt độ thấp với khăn lót.' },
                { icon: 'local_shipping', text: 'Miễn phí vận chuyển cho đơn từ 500.000₫' },
                { icon: 'autorenew', text: 'Đổi trả trong vòng 30 ngày' },
              ].map(d => (
                <div key={d.icon} className="flex gap-3 text-xs text-[#444748]">
                  <span className="material-icons text-[#c9a84c] text-lg flex-shrink-0">{d.icon}</span>
                  <span>{d.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-16 border-t border-[#e9e8e6] pt-10">
          <div className="flex items-end gap-6 mb-8">
            <div>
              <p className="text-[10px] tracking-widest uppercase text-[#747878] mb-1">Đánh giá thực tế</p>
              <h2 className="font-serif text-2xl text-[#1c1b1b]">Trải nghiệm từ khách hàng</h2>
            </div>
            <div className="flex items-center gap-3 pb-1">
              <span className="font-serif text-5xl font-light text-[#1c1b1b]">4.9</span>
              <div>
                <div className="flex gap-0.5 mb-1">{[1,2,3,4,5].map(i => <span key={i} className="material-icons text-[#c9a84c] text-sm">star</span>)}</div>
                <p className="text-xs text-[#747878]">98% khách hàng hài lòng</p>
                <p className="text-xs text-[#747878]">Dựa trên 124 đánh giá sản phẩm</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {reviews.map(r => (
              <div key={r.name} className="bg-white border border-[#e9e8e6] p-5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm font-medium text-[#1c1b1b]">{r.name}</p>
                    <p className="text-[10px] text-[#747878]">{r.days} · Size {r.size} ({r.color}) · Form: {r.fit}</p>
                  </div>
                  <div className="flex gap-0.5">{Array(r.stars).fill(0).map((_, i) => <span key={i} className="material-icons text-[#c9a84c] text-xs">star</span>)}</div>
                </div>
                <p className="text-xs text-[#444748] leading-relaxed">{r.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Size guide modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowSizeGuide(false)}>
          <div className="bg-white max-w-xl w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-lg">Bảng size chuẩn VT Store</h3>
              <button onClick={() => setShowSizeGuide(false)}><span className="material-icons">close</span></button>
            </div>
            <p className="text-xs text-[#747878] mb-4">Thông số kích thước tính bằng centimet (cm). Vui lòng liên hệ nhân viên nếu bạn cần tư vấn riêng.</p>
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-[#f4f3f1]">
                  {['Size', 'Cân nặng (kg)', 'Chiều cao (cm)', 'Vòng ngực', 'Vòng eo'].map(h => (
                    <th key={h} className="border border-[#e9e8e6] px-3 py-2 text-left font-medium text-[#1c1b1b]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sizeGuide.map(row => (
                  <tr key={row.size} className={row.size === selectedSize ? 'bg-[#c9a84c11]' : ''}>
                    <td className="border border-[#e9e8e6] px-3 py-2 font-semibold">{row.size}</td>
                    <td className="border border-[#e9e8e6] px-3 py-2">{row.weight}</td>
                    <td className="border border-[#e9e8e6] px-3 py-2">{row.height}</td>
                    <td className="border border-[#e9e8e6] px-3 py-2">{row.bust}</td>
                    <td className="border border-[#e9e8e6] px-3 py-2">{row.waist}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <StorefrontFooter />
    </div>
  );
}
