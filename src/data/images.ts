// Unsplash product images - cropped to portrait for product cards
const BASE = 'https://images.unsplash.com';

export const productImages = {
  trenchCoat: `${BASE}/photo-1580478491436-fd6a937acc9e?w=600&h=800&fit=crop`,
  blazer: `${BASE}/photo-1613915617430-8ab0fd7c6baf?w=600&h=800&fit=crop`,
  silkDress: `${BASE}/photo-1664076458686-3449062080ac?w=600&h=800&fit=crop`,
  beigeGown: `${BASE}/photo-1551621955-fa07d4b1376b?w=600&h=800&fit=crop`,
  suitWoman: `${BASE}/photo-1644216527791-5aa461d14076?w=600&h=800&fit=crop`,
  elegantWoman: `${BASE}/photo-1762605135376-ae5af70a5628?w=600&h=800&fit=crop`,
  blackDress: `${BASE}/photo-1772474500365-c2c520545f44?w=600&h=800&fit=crop`,
  sweaters: `${BASE}/photo-1670905934075-0c3cb559e977?w=600&h=800&fit=crop`,
  casualCouple: `${BASE}/photo-1759229875274-bd920070ceef?w=600&h=800&fit=crop`,
  knit: `${BASE}/photo-1633972767447-5098f0322a45?w=600&h=800&fit=crop`,
  greenDress: `${BASE}/photo-1653152707179-125e4e184a0b?w=600&h=800&fit=crop`,
  ornateGowns: `${BASE}/photo-1756483510882-55bc1249642d?w=600&h=800&fit=crop`,
};

export const products = [
  { id: 1, name: 'Áo Trench Coat Dạ Khâu Tay', desc: 'Chất liệu len lông cừu cao cấp', price: 2450000, original: 3100000, badge: '-20%', image: productImages.trenchCoat, cat: 'Áo khoác & Blazer' },
  { id: 2, name: 'Đầm Lụa Thiết Kế Cổ Chữ V', desc: 'Lụa Mulberry tự nhiên 100%', price: 1850000, original: 2300000, badge: null, image: productImages.silkDress, cat: 'Đầm dạ hội', hot: true },
  { id: 3, name: 'Quần Tây Nam Form Slimfit', desc: 'Vải wool Ý chống nhăn tự nhiên', price: 1250000, original: null, badge: 'MỚI', image: productImages.blazer, cat: 'Quần tây cao cấp' },
  { id: 4, name: 'Áo Len Cashmere Cổ Lọ', desc: 'Siêu nhẹ, giữ nhiệt tối ưu', price: 1650000, original: null, badge: null, image: productImages.knit, cat: 'Áo khoác & Blazer' },
  { id: 5, name: 'Chân Váy Xếp Ly Midi', desc: 'Độ rủ tự nhiên, uyển chuyển', price: 2120000, original: 2500000, badge: '-15%', image: productImages.beigeGown, cat: 'Chân váy midi' },
  { id: 6, name: 'Áo Khoác Blazer Dạ', desc: 'Thiết kế form đứng dáng tôn dáng', price: 4890000, original: null, badge: null, image: productImages.suitWoman, cat: 'Áo khoác & Blazer', hot: true },
  { id: 7, name: 'Áo Blazer Lụa Cao Cấp', desc: 'Lụa cao cấp, form dáng thanh lịch', price: 1480000, original: 1850000, badge: '-20%', image: productImages.elegantWoman, cat: 'Áo khoác & Blazer' },
  { id: 8, name: 'Cardigan Len Lông Cừu Merino', desc: 'Len Merino siêu mềm, nút vỏ sò', price: 4200000, original: null, badge: 'MỚI', image: productImages.sweaters, cat: 'Áo khoác & Blazer' },
  { id: 9, name: 'Đầm Lụa Satin Cổ Đổ', desc: 'Haute Couture, phong cách dạ tiệc', price: 6890000, original: null, badge: null, image: productImages.blackDress, cat: 'Đầm dạ hội' },
];
