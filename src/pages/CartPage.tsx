import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StorefrontHeader from '../components/StorefrontHeader';
import StorefrontFooter from '../components/StorefrontFooter';

const cartItems = [
  { id: 1, name: 'Áo Blazer Lụa Cao Cấp', sku: 'VT-BLZ-01', color: 'Đen tuyền', size: 'S', price: 1480000, original: 1850000, qty: 1 },
  { id: 2, name: 'Chân Váy Midi Xếp Ly', sku: 'VT-SKR-04', color: 'Be sáng', size: 'M', price: 950000, original: null, qty: 1 },
  { id: 3, name: 'Áo Len Cashmere Cổ Lọ', sku: 'VT-KNI-09', color: 'Trắng kem', size: 'M', price: 1200000, original: null, qty: 1 },
];

const steps = ['Giỏ hàng', 'Thanh toán', 'Hoàn tất'];
const paymentMethods = [
  { id: 'cod', icon: 'local_shipping', title: 'Thanh toán khi nhận hàng (COD)', desc: 'Thanh toán bằng tiền mặt khi giao hàng tận nơi.' },
  { id: 'vietqr', icon: 'qr_code_scanner', title: 'VietQR / Chuyển khoản', desc: 'Thanh toán nhanh qua mã QR liên ngân hàng.' },
  { id: 'momo', icon: 'account_balance_wallet', title: 'Ví MoMo', desc: 'Thanh toán qua ví điện tử MoMo.' },
  { id: 'vnpay', icon: 'credit_card', title: 'VNPay / Thẻ ATM', desc: 'Thanh toán qua cổng VNPay.' },
];

export default function CartPage() {
  const [step, setStep] = useState(0);
  const [quantities, setQuantities] = useState<Record<number, number>>({ 1: 1, 2: 1, 3: 1 });
  const [payment, setPayment] = useState('cod');
  const [city, setCity] = useState('TP. Hồ Chí Minh');
  const [district, setDistrict] = useState('Quận 1');
  const [voucherCode, setVoucherCode] = useState('');
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * (quantities[item.id] || 1), 0);
  const discount = subtotal >= 2500000 ? Math.round(subtotal * 0.15) : subtotal >= 2000000 ? Math.round(subtotal * 0.10) : 0;
  const total = subtotal - discount;
  const fmt = (n: number) => n.toLocaleString('vi-VN') + 'đ';

  const progressPct = Math.min((subtotal / 3000000) * 100, 100);

  if (step === 2) {
    return (
      <div className="min-h-screen bg-[#faf9f7]">
        <StorefrontHeader />
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <div className="w-16 h-16 bg-[#c9a84c] rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="material-icons text-white text-3xl">check</span>
          </div>
          <h1 className="font-serif text-3xl text-[#1c1b1b] mb-3">Đặt hàng thành công!</h1>
          <p className="text-[#747878] text-sm mb-2">Mã đơn hàng: <span className="font-semibold text-[#1c1b1b]">#VT-ORD-98245</span></p>
          <p className="text-[#747878] text-sm mb-8">Chúng tôi sẽ liên hệ xác nhận đơn trong vòng 30 phút.</p>
          <div className="flex gap-3 justify-center">
            <Link to="/orders" className="px-6 py-3 bg-[#1c1b1b] text-white text-xs tracking-widest uppercase">Xem đơn hàng</Link>
            <Link to="/" className="px-6 py-3 border border-[#1c1b1b] text-[#1c1b1b] text-xs tracking-widest uppercase">Tiếp tục mua sắm</Link>
          </div>
        </div>
        <StorefrontFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <StorefrontHeader />
      <div className="border-b border-[#e9e8e6] bg-white">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-[#747878]">
            <span className="material-icons text-sm text-[#c9a84c]">lock</span>
            Thanh toán bảo mật
          </div>
          <div className="flex items-center gap-2">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`flex items-center gap-1.5 text-xs ${i === step ? 'text-[#1c1b1b] font-medium' : i < step ? 'text-[#c9a84c]' : 'text-[#c4c7c7]'}`}>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold ${i === step ? 'bg-[#1c1b1b] text-white' : i < step ? 'bg-[#c9a84c] text-white' : 'bg-[#e9e8e6] text-[#747878]'}`}>{i < step ? '✓' : i + 1}</div>
                  <span className="hidden sm:inline">{s}</span>
                </div>
                {i < steps.length - 1 && <div className="w-8 h-px bg-[#e9e8e6]" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {step === 0 && (
          <div>
            <h2 className="font-serif text-2xl text-[#1c1b1b] mb-6">Giỏ hàng &amp; Thanh toán</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                {/* Promo banner */}
                <div className="bg-[#c9a84c11] border border-[#c9a84c44] p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-icons text-[#c9a84c] text-lg">local_offer</span>
                    <span className="text-xs font-medium">Khuyến mãi bậc thang tự động</span>
                    <span className="ml-auto bg-[#c9a84c] text-white text-[10px] px-2 py-0.5">Đã áp dụng</span>
                  </div>
                  <p className="text-xs text-[#444748] mb-3">Bạn đã đạt mốc giảm <strong>15%</strong> cho đơn hàng từ 2.500.000đ.</p>
                  <div className="relative h-1.5 bg-[#e9e8e6] rounded-full overflow-hidden">
                    <div className="absolute left-0 top-0 h-full bg-[#c9a84c] rounded-full transition-all" style={{width: `${progressPct}%`}} />
                  </div>
                  <div className="flex justify-between text-[10px] text-[#747878] mt-1.5">
                    <span>0đ</span><span>2.000.000đ</span><span>3.000.000đ</span>
                  </div>
                </div>

                {/* Items */}
                <div className="bg-white border border-[#e9e8e6] p-4 space-y-4">
                  <h3 className="text-xs font-semibold uppercase tracking-wider">Sản phẩm trong giỏ ({cartItems.length})</h3>
                  {cartItems.map(item => (
                    <div key={item.id} className="flex gap-4 pb-4 border-b border-[#f4f3f1] last:border-0 last:pb-0">
                      <div className="w-20 h-24 bg-[#f4f3f1] flex-shrink-0 flex items-center justify-center">
                        <span className="material-icons text-3xl text-[#c4c7c7]">styler</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-medium text-[#1c1b1b] leading-snug">{item.name}</p>
                          <button className="text-[#747878] hover:text-[#ba1a1a] flex-shrink-0"><span className="material-icons text-lg">delete</span></button>
                        </div>
                        <p className="text-[10px] text-[#747878] mt-0.5">Mã SKU: {item.sku}</p>
                        <p className="text-[10px] text-[#747878]">Màu: {item.color} · Size: {item.size}</p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-[#e9e8e6]">
                            <button onClick={() => setQuantities(p => ({...p, [item.id]: Math.max(1, (p[item.id] || 1) - 1)}))} className="w-7 h-7 flex items-center justify-center text-lg">−</button>
                            <span className="w-7 text-center text-xs">{quantities[item.id] || 1}</span>
                            <button onClick={() => setQuantities(p => ({...p, [item.id]: (p[item.id] || 1) + 1}))} className="w-7 h-7 flex items-center justify-center text-lg">+</button>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-[#1c1b1b]">{fmt(item.price)}</p>
                            {item.original && <p className="text-[10px] text-[#747878] line-through">{fmt(item.original)}</p>}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Voucher */}
                <div className="bg-white border border-[#e9e8e6] p-4">
                  <h3 className="text-xs font-semibold uppercase tracking-wider mb-3">Ghi chú đơn hàng &amp; Mã giảm giá</h3>
                  <div className="flex gap-2">
                    <input value={voucherCode} onChange={e => setVoucherCode(e.target.value)} placeholder="Nhập mã voucher..." className="flex-1 border border-[#e9e8e6] px-3 py-2 text-xs outline-none focus:border-[#c9a84c]" />
                    <button className="px-4 py-2 bg-[#1c1b1b] text-white text-xs tracking-wider">Áp dụng</button>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-4">
                <div className="bg-white border border-[#e9e8e6] p-4 sticky top-24">
                  <h3 className="text-xs font-semibold uppercase tracking-wider mb-4">Tóm tắt đơn hàng</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-[#747878]">Tạm tính</span><span>{fmt(subtotal)}</span></div>
                    {discount > 0 && <div className="flex justify-between text-[#c9a84c]"><span>Ưu đãi bậc thang</span><span>−{fmt(discount)}</span></div>}
                    <div className="flex justify-between"><span className="text-[#747878]">Vận chuyển</span><span className="text-[#c9a84c] text-xs">Miễn phí</span></div>
                    <div className="border-t border-[#e9e8e6] pt-2 mt-2 flex justify-between font-semibold text-base">
                      <span>Tổng cộng</span><span>{fmt(total)}</span>
                    </div>
                  </div>
                  <button onClick={() => setStep(1)} className="w-full mt-4 py-3 bg-[#1c1b1b] text-white text-xs tracking-widest uppercase hover:bg-[#333] transition-colors">Tiến hành thanh toán</button>
                  <Link to="/products" className="block text-center text-xs text-[#747878] mt-3 hover:text-[#1c1b1b]">← Tiếp tục mua sắm</Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 className="font-serif text-2xl text-[#1c1b1b] mb-6">Thông tin giao hàng &amp; Thanh toán</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                {/* Shipping */}
                <div className="bg-white border border-[#e9e8e6] p-5">
                  <h3 className="text-xs font-semibold uppercase tracking-wider mb-4">Thông tin nhận hàng</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[['Họ và tên', 'text'], ['Số điện thoại', 'tel'], ['Email nhận hóa đơn', 'email'], ['Địa chỉ chi tiết', 'text']].map(([label, type]) => (
                      <div key={label} className={label === 'Địa chỉ chi tiết' ? 'sm:col-span-2' : ''}>
                        <label className="text-[10px] uppercase tracking-wider text-[#747878] mb-1 block">{label}</label>
                        <input type={type} className="w-full border border-[#e9e8e6] px-3 py-2.5 text-sm outline-none focus:border-[#c9a84c] bg-white" />
                      </div>
                    ))}
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-[#747878] mb-1 block">Tỉnh / Thành phố</label>
                      <select value={city} onChange={e => setCity(e.target.value)} className="w-full border border-[#e9e8e6] px-3 py-2.5 text-sm outline-none focus:border-[#c9a84c] bg-white">
                        {['TP. Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng'].map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-[#747878] mb-1 block">Quận / Huyện</label>
                      <select value={district} onChange={e => setDistrict(e.target.value)} className="w-full border border-[#e9e8e6] px-3 py-2.5 text-sm outline-none focus:border-[#c9a84c] bg-white">
                        {['Quận 1', 'Quận 3', 'Quận Bình Thạnh'].map(d => <option key={d}>{d}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Payment */}
                <div className="bg-white border border-[#e9e8e6] p-5">
                  <h3 className="text-xs font-semibold uppercase tracking-wider mb-4">Phương thức thanh toán</h3>
                  <div className="space-y-2">
                    {paymentMethods.map(m => (
                      <label key={m.id} onClick={() => setPayment(m.id)} className={`flex items-start gap-3 p-3 border cursor-pointer transition-colors ${payment === m.id ? 'border-[#c9a84c] bg-[#c9a84c08]' : 'border-[#e9e8e6] hover:border-[#c4c7c7]'}`}>
                        <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center ${payment === m.id ? 'border-[#c9a84c]' : 'border-[#c4c7c7]'}`}>
                          {payment === m.id && <div className="w-2 h-2 rounded-full bg-[#c9a84c]" />}
                        </div>
                        <span className="material-icons text-[#c9a84c] text-lg flex-shrink-0">{m.icon}</span>
                        <div>
                          <p className="text-sm font-medium text-[#1c1b1b]">{m.title}</p>
                          <p className="text-xs text-[#747878]">{m.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                  {payment === 'vietqr' && (
                    <div className="mt-4 border border-[#c9a84c44] bg-[#c9a84c08] p-5 text-center">
                      <p className="text-xs font-semibold text-[#1c1b1b] mb-4">Quét mã QR để thanh toán</p>
                      <div className="flex justify-center mb-3">
                        <div className="bg-white p-3 border border-[#e9e8e6] inline-block">
                          <svg width="150" height="150" viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
                            <rect width="150" height="150" fill="white"/>
                            <rect x="8" y="8" width="46" height="46" rx="2" fill="#1c1b1b"/><rect x="14" y="14" width="34" height="34" rx="1" fill="white"/><rect x="20" y="20" width="22" height="22" rx="1" fill="#1c1b1b"/>
                            <rect x="96" y="8" width="46" height="46" rx="2" fill="#1c1b1b"/><rect x="102" y="14" width="34" height="34" rx="1" fill="white"/><rect x="108" y="20" width="22" height="22" rx="1" fill="#1c1b1b"/>
                            <rect x="8" y="96" width="46" height="46" rx="2" fill="#1c1b1b"/><rect x="14" y="102" width="34" height="34" rx="1" fill="white"/><rect x="20" y="108" width="22" height="22" rx="1" fill="#1c1b1b"/>
                            {[[62,8],[70,8],[62,16],[78,16],[62,24],[70,24],[78,24],[86,24],[62,32],[86,32],[70,40],[78,40],[86,40]].map(([x,y]) => <rect key={`${x}${y}`} x={x} y={y} width="6" height="6" fill="#1c1b1b"/>)}
                            {[[96,62],[104,62],[112,62],[120,62],[128,62],[96,70],[120,70],[128,70],[104,78],[112,78],[96,86],[104,86],[120,86],[128,86]].map(([x,y]) => <rect key={`a${x}${y}`} x={x} y={y} width="6" height="6" fill="#1c1b1b"/>)}
                            {[[62,96],[70,96],[86,96],[62,104],[78,104],[86,104],[70,112],[78,112],[62,120],[70,120],[86,120],[62,128],[86,128]].map(([x,y]) => <rect key={`b${x}${y}`} x={x} y={y} width="6" height="6" fill="#1c1b1b"/>)}
                            <rect x="66" y="66" width="18" height="18" rx="2" fill="#c9a84c"/>
                            <rect x="70" y="70" width="10" height="10" rx="1" fill="white"/>
                          </svg>
                        </div>
                      </div>
                      <p className="text-xs font-semibold text-[#1c1b1b]">Vietcombank · 1234567890</p>
                      <p className="text-xs text-[#747878]">VT STORE — Thanh toán đơn hàng</p>
                      <p className="text-lg font-bold text-[#c9a84c] my-2">{fmt(total)}</p>
                      <p className="text-[10px] text-[#747878]">Nội dung: <span className="font-mono font-semibold text-[#1c1b1b]">VT{Math.floor(Math.random()*900000+100000)}</span></p>
                      <div className="flex items-center justify-center gap-1 text-[10px] text-green-600 mt-2">
                        <span className="material-icons text-xs">verified</span>
                        Tự động xác nhận qua Napas 24/7
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-4">
                <div className="bg-white border border-[#e9e8e6] p-4 sticky top-24">
                  <h3 className="text-xs font-semibold uppercase tracking-wider mb-3">Đơn hàng của bạn</h3>
                  {cartItems.map(item => (
                    <div key={item.id} className="flex gap-2 mb-3 text-xs">
                      <div className="w-10 h-12 bg-[#f4f3f1] flex items-center justify-center flex-shrink-0">
                        <span className="material-icons text-lg text-[#c4c7c7]">styler</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-[#1c1b1b] leading-snug">{item.name}</p>
                        <p className="text-[#747878]">{item.color} · {item.size} · x{quantities[item.id] || 1}</p>
                        <p className="font-semibold">{fmt(item.price)}</p>
                      </div>
                    </div>
                  ))}
                  <div className="border-t border-[#e9e8e6] pt-3 mt-3 space-y-1.5 text-sm">
                    <div className="flex justify-between"><span className="text-[#747878]">Tạm tính</span><span>{fmt(subtotal)}</span></div>
                    {discount > 0 && <div className="flex justify-between text-[#c9a84c]"><span>Giảm giá</span><span>−{fmt(discount)}</span></div>}
                    <div className="flex justify-between"><span className="text-[#747878]">Vận chuyển</span><span className="text-[#c9a84c] text-xs">Miễn phí</span></div>
                    <div className="flex justify-between font-semibold text-base pt-1 border-t border-[#e9e8e6]"><span>Tổng cộng</span><span>{fmt(total)}</span></div>
                  </div>
                  <button onClick={() => setStep(2)} className="w-full mt-4 py-3 bg-[#c9a84c] text-white text-xs tracking-widest uppercase hover:bg-[#b8943f] transition-colors">Đặt hàng ngay</button>
                  <button onClick={() => setStep(0)} className="block text-center text-xs text-[#747878] mt-3 hover:text-[#1c1b1b] w-full">← Quay lại giỏ hàng</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <StorefrontFooter />
    </div>
  );
}
