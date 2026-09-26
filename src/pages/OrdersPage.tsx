import { useState } from 'react';
import { Link } from 'react-router-dom';
import StorefrontHeader from '../components/StorefrontHeader';
import StorefrontFooter from '../components/StorefrontFooter';

const statusTabs = ['Tất cả đơn (6)', 'Chờ xác nhận (1)', 'Đang chuẩn bị hàng (1)', 'Đang giao (1)', 'Đã giao (3)', 'Đổi trả / Hoàn tiền (1)', 'Đã hủy (0)'];

const orders = [
  {
    id: '#VT-ORD-98241', date: '24/10/2024 - 14:32', status: 'Đang giao', statusColor: 'text-blue-600 bg-blue-50',
    payment: 'VietQR Đã xác nhận', carrier: 'Giao Hàng Nhanh (GHN Express)', trackingCode: 'GHN-882910',
    eta: '26/10/2024 (Buổi chiều)', location: 'Trung tâm phân loại tự động GHN Tây Bắc HCM',
    items: [
      { name: 'Áo khoác may đo', sub: 'Tailored Silk-Wool Single Blazer', variant: 'Charcoal Black | Size: M | SKU: VT-BLZ-09', qty: 1, price: 3890000 },
      { name: 'Quần âu cao cấp', sub: 'Pleated Mulberry Silk Trouser', variant: 'Ivory Sand | Size: 31 | SKU: VT-TRS-44', qty: 1, price: 2150000 },
    ],
    total: 6040000, freeShip: true,
    timeline: [
      { label: 'Đã tiếp nhận', time: '24/10 - 14:35', done: true },
      { label: 'Đóng gói bưu kiện', time: '24/10 - 16:10', done: true },
      { label: 'Bàn giao GHN', time: '24/10 - 18:40', done: true },
      { label: 'Kho Củ Chi SOC', time: 'Đang luân chuyển', done: false },
    ],
  },
  {
    id: '#VT-ORD-98220', date: '25/10/2024', status: 'Chờ xác nhận', statusColor: 'text-amber-600 bg-amber-50',
    payment: 'Thanh toán khi nhận (COD)', carrier: null, trackingCode: null, eta: null, location: null,
    items: [
      { name: 'Đầm Lụa Midi Dự Tiệc', sub: null, variant: 'Xanh ngọc / Size S', qty: 1, price: 1890000 },
    ],
    total: 1890000, freeShip: false, timeline: null,
  },
  {
    id: '#VT-ORD-98195', date: '18/10/2024', status: 'Đã giao', statusColor: 'text-green-700 bg-green-50',
    payment: 'Đã thanh toán (MoMo)', carrier: null, trackingCode: null, eta: null, location: null,
    items: [
      { name: 'Áo Trench Coat Dạ Dáng Dài', sub: null, variant: 'Màu Lạc đà / Size L', qty: 1, price: 3200000 },
    ],
    total: 3200000, freeShip: true, timeline: null,
  },
];

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [expandedOrder, setExpandedOrder] = useState<string | null>('#VT-ORD-98241');
  const fmt = (n: number) => n.toLocaleString('vi-VN') + ' đ';

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <StorefrontHeader />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="font-serif text-2xl text-[#1c1b1b]">Đơn Mua Của Bạn</h1>
          <span className="text-xs text-[#747878]">(6 đơn hàng lưu trữ)</span>
        </div>

        {/* Wallet info */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            { icon: 'account_balance_wallet', label: 'Ví hoàn tiền / Điểm VT', value: '2.450.000 đ', color: 'text-[#c9a84c]' },
            { icon: 'verified_user', label: 'Bảo hành may đo & Đổi trả', value: '7 ngày chuẩn', color: 'text-[#4CAF50]' },
          ].map(item => (
            <div key={item.label} className="bg-white border border-[#e9e8e6] p-4 flex items-center gap-3">
              <span className={`material-icons ${item.color}`}>{item.icon}</span>
              <div>
                <p className="text-[10px] text-[#747878]">{item.label}</p>
                <p className="text-sm font-semibold text-[#1c1b1b]">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Status tabs */}
        <div className="flex gap-1 flex-wrap mb-6">
          {statusTabs.map((tab, i) => (
            <button key={i} onClick={() => setActiveTab(i)} className={`px-3 py-1.5 text-xs border transition-colors ${activeTab === i ? 'bg-[#1c1b1b] text-white border-[#1c1b1b]' : 'border-[#e9e8e6] text-[#747878] hover:border-[#1c1b1b]'}`}>{tab}</button>
          ))}
        </div>

        {/* Orders */}
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="bg-white border border-[#e9e8e6]">
              {/* Order header */}
              <div className="flex items-center justify-between p-4 border-b border-[#f4f3f1] cursor-pointer" onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}>
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="text-sm font-semibold text-[#1c1b1b]">{order.id}</span>
                  <span className="text-xs text-[#747878]">Ngày đặt: {order.date}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${order.statusColor}`}>{order.status}</span>
                </div>
                <span className="material-icons text-[#747878]">{expandedOrder === order.id ? 'expand_less' : 'expand_more'}</span>
              </div>

              {expandedOrder === order.id && (
                <div className="p-4">
                  {/* Tracking */}
                  {order.carrier && (
                    <div className="bg-[#f4f3f1] p-4 mb-4">
                      <div className="flex items-start gap-2 mb-3">
                        <span className="material-icons text-blue-600 text-lg">local_shipping</span>
                        <div className="flex-1">
                          <p className="text-xs font-medium">Trạng thái: {order.status}</p>
                          <p className="text-xs text-[#747878]">Đơn vị vận chuyển: {order.carrier}</p>
                          <p className="text-xs text-[#747878]">Mã vận đơn: {order.trackingCode}</p>
                          <p className="text-xs text-[#747878]">Dự kiến giao: {order.eta}</p>
                        </div>
                      </div>
                      {order.timeline && (
                        <div className="space-y-2">
                          {order.timeline.map((t, i) => (
                            <div key={i} className="flex items-center gap-3">
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${t.done ? 'bg-[#c9a84c]' : 'bg-[#e9e8e6]'}`}>
                                {t.done ? <span className="material-icons text-white text-[10px]">check</span> : <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />}
                              </div>
                              <div>
                                <p className="text-xs font-medium text-[#1c1b1b]">{t.label}</p>
                                <p className="text-[10px] text-[#747878]">{t.time}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      {order.location && (
                        <div className="flex items-center gap-2 mt-3 text-xs text-[#747878]">
                          <span className="material-icons text-sm text-[#c9a84c]">pin_drop</span>
                          Vị trí hiện tại: {order.location}
                          <span className="text-[10px] italic">— Cập nhật 15 phút trước</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Items */}
                  <div className="space-y-3 mb-4">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex gap-3">
                        <div className="w-14 h-16 bg-[#f4f3f1] flex items-center justify-center flex-shrink-0">
                          <span className="material-icons text-2xl text-[#c4c7c7]">styler</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-[#1c1b1b]">{item.name}</p>
                          {item.sub && <p className="text-xs text-[#747878] italic">{item.sub}</p>}
                          <p className="text-[10px] text-[#747878]">{item.variant} · x{item.qty}</p>
                          <p className="text-sm font-semibold mt-1">{fmt(item.price)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Payment & Total */}
                  <div className="border-t border-[#f4f3f1] pt-3 flex items-center justify-between flex-wrap gap-2">
                    <div className="text-xs text-[#747878]">
                      <span>Thanh toán: {order.payment}</span>
                      {order.freeShip && <span className="ml-2 text-[#c9a84c]">· Free Ship</span>}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-[#747878]">Tổng: <span className="text-sm font-bold text-[#1c1b1b]">{fmt(order.total)}</span></span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-4 flex-wrap">
                    {order.status === 'Đã giao' && (
                      <button className="px-4 py-2 text-xs border border-[#e9e8e6] flex items-center gap-1 hover:border-[#1c1b1b] transition-colors">
                        <span className="material-icons text-sm">sync_alt</span> Yêu cầu đổi trả
                      </button>
                    )}
                    {order.status === 'Chờ xác nhận' && (
                      <button className="px-4 py-2 text-xs border border-[#ba1a1a] text-[#ba1a1a] flex items-center gap-1 hover:bg-[#ba1a1a] hover:text-white transition-colors">
                        Hủy đơn hàng
                      </button>
                    )}
                    {order.carrier && (
                      <button className="px-4 py-2 text-xs border border-[#c9a84c] text-[#c9a84c] flex items-center gap-1 hover:bg-[#c9a84c08] transition-colors">
                        <span className="material-icons text-sm">map</span> Tra cứu vận đơn
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <StorefrontFooter />
    </div>
  );
}
