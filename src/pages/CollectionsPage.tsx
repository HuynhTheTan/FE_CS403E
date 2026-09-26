import { useState } from 'react';
import { Link } from 'react-router-dom';
import StorefrontHeader from '../components/StorefrontHeader';
import StorefrontFooter from '../components/StorefrontFooter';
import { productImages } from '../data/images';

const collections = [
  {
    id: 'fw25',
    title: 'Thu Đông 2025',
    subtitle: 'Fall/Winter Collection',
    desc: 'Bộ sưu tập lấy cảm hứng từ kiến trúc Paris — những đường cắt sắc nét, chất liệu cao cấp và màu sắc trầm lắng.',
    image: productImages.trenchCoat,
    items: 24,
    badge: 'MỚI NHẤT',
  },
  {
    id: 'ss25',
    title: 'Xuân Hè 2025',
    subtitle: 'Spring/Summer Collection',
    desc: 'Nhẹ nhàng, thanh lịch — lụa tự nhiên và linen thoáng mát cho mùa hè thượng lưu.',
    image: productImages.silkDress,
    items: 18,
    badge: null,
  },
  {
    id: 'exclusive',
    title: 'VT Exclusive Atelier',
    subtitle: 'Hàng may đo thủ công',
    desc: 'Mỗi sản phẩm là một tác phẩm nghệ thuật — được may thủ công bởi các thợ lành nghề với hơn 20 năm kinh nghiệm.',
    image: productImages.suitWoman,
    items: 8,
    badge: 'LIMITED',
  },
  {
    id: 'fw24',
    title: 'Thu Đông 2024',
    subtitle: 'Archive Collection',
    desc: 'Những thiết kế vượt thời gian từ mùa trước — ưu đãi đặc biệt cho thành viên VIP.',
    image: productImages.elegantWoman,
    items: 32,
    badge: 'SALE',
  },
];

const lookbooks = [
  { title: 'The Architecture of Elegance', image: productImages.beigeGown, season: 'FW25' },
  { title: 'Lumière de Paris', image: productImages.blazer, season: 'SS25' },
  { title: 'Monochrome Noir', image: productImages.blackDress, season: 'FW24' },
];

export default function CollectionsPage() {
  const [activeFilter, setActiveFilter] = useState('Tất cả');
  const filters = ['Tất cả', 'Đang bán', 'Mới nhất', 'Limited Edition', 'Archive'];

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <StorefrontHeader />

      {/* Hero */}
      <div className="relative bg-[#1c1b1b] py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-[#c9a84c22] to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative">
          <p className="text-[10px] tracking-[0.4em] text-[#c9a84c] uppercase mb-3">VT Store</p>
          <h1 className="font-serif text-4xl sm:text-5xl text-white font-light mb-4">Bộ Sưu Tập</h1>
          <p className="text-[#747878] text-sm font-light max-w-xl mx-auto">Khám phá từng chương trình thời trang — từ phong cách đường phố tinh tế đến haute couture thuần túy.</p>
        </div>
      </div>

      {/* Filter */}
      <div className="border-b border-[#e9e8e6] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex gap-1 overflow-x-auto py-3">
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)} className={`px-4 py-1.5 text-xs tracking-wider border flex-shrink-0 transition-colors ${activeFilter === f ? 'bg-[#1c1b1b] text-white border-[#1c1b1b]' : 'border-[#e9e8e6] text-[#747878] hover:border-[#1c1b1b]'}`}>{f}</button>
          ))}
        </div>
      </div>

      {/* Collections grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {collections.map((col) => (
            <Link key={col.id} to={`/products?collection=${col.id}`} className="group block relative overflow-hidden bg-[#f4f3f1]">
              <div className="aspect-[16/9] overflow-hidden">
                <img src={col.image} alt={col.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c1b1b] via-[#1c1b1b44] to-transparent" />
              </div>
              {col.badge && (
                <div className="absolute top-4 left-4">
                  <span className={`text-[10px] px-2 py-1 font-semibold tracking-widest ${col.badge === 'MỚI NHẤT' ? 'bg-[#c9a84c] text-white' : col.badge === 'LIMITED' ? 'bg-[#1c1b1b] text-[#c9a84c] border border-[#c9a84c]' : 'bg-[#ba1a1a] text-white'}`}>{col.badge}</span>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-[10px] tracking-widest text-[#c9a84c] uppercase mb-1">{col.subtitle}</p>
                <h2 className="font-serif text-2xl text-white font-light mb-2">{col.title}</h2>
                <p className="text-xs text-[#c4c7c7] line-clamp-2 mb-3">{col.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#747878]">{col.items} sản phẩm</span>
                  <span className="text-xs text-[#c9a84c] flex items-center gap-1 group-hover:gap-2 transition-all">
                    Khám phá <span className="material-icons text-sm">arrow_forward</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Lookbook */}
      <section className="bg-[#1c1b1b] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <p className="text-[10px] tracking-[0.3em] text-[#c9a84c] uppercase mb-2">Editorial</p>
            <h2 className="font-serif text-2xl text-white">Lookbook &amp; Câu Chuyện Thời Trang</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {lookbooks.map(lb => (
              <div key={lb.title} className="group cursor-pointer relative overflow-hidden aspect-[3/4]">
                <img src={lb.image} alt={lb.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c1b1b] to-transparent opacity-70" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] text-[#c9a84c] tracking-widest">{lb.season}</span>
                  <p className="font-serif text-lg text-white font-light mt-1">{lb.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StorefrontFooter />
    </div>
  );
}
