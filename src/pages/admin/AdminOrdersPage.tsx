import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

const ordersData = [
  { id: '#VT-98241', date: '24/10/2024', customer: 'Trần Minh Thư', phone: '0912 345 678', items: 2, amount: 6040000, status: 'Đang giao', payment: 'VietQR', carrier: 'GHN', tracking: 'GHN-882910', address: '45 Lý Tự Trọng, Q.1, TP.HCM', note: '' },
  { id: '#VT-98242', date: '25/10/2024', customer: 'Nguyễn Văn B', phone: '0901 234 567', items: 1, amount: 1890000, status: 'Chờ xác nhận', payment: 'COD', carrier: null, tracking: null, address: '12 Nguyễn Huệ, Q.1, TP.HCM', note: 'Gọi điện trước khi giao' },
  { id: '#VT-98240', date: '23/10/2024', customer: 'Hoàng Hải Yến', phone: '0908 765 432', items: 3, amount: 8250000, status: 'Đang đóng gói', payment: 'MoMo', carrier: 'GHTK', tracking: 'GHTK-119823', address: '88 Pasteur, Q.3, TP.HCM', note: '' },
  { id: '#VT-98239', date: '23/10/2024', customer: 'Lê Thị Thu', phone: '0912 111 222', items: 1, amount: 4890000, status: 'Đã giao', payment: 'VNPay', carrier: 'GHN', tracking: 'GHN-881200', address: '23 Đinh Tiên Hoàng, Q.BT, TP.HCM', note: '' },
  { id: '#VT-98238', date: '22/10/2024', customer: 'Phạm Quốc Hùng', phone: '0903 333 444', items: 2, amount: 3200000, status: 'Đã giao', payment: 'COD', carrier: 'GHN', tracking: 'GHN-880010', address: '5 Lê Lợi, Q.1, TP.HCM', note: '' },
  { id: '#VT-98237', date: '22/10/2024', customer: 'Vũ Thanh Hà', phone: '0916 555 666', items: 1, amount: 11500000, status: 'Đang giao', payment: 'VietQR', carrier: 'ViettelPost', tracking: 'VTP-112345', address: '100 Trần Hưng Đạo, Q.5, TP.HCM', note: '' },
  { id: '#VT-98236', date: '21/10/2024', customer: 'Đặng Minh Khánh', phone: '0911 777 888', items: 4, amount: 15780000, status: 'Yêu cầu đổi trả', payment: 'VNPay', carrier: 'GHN', tracking: 'GHN-879900', address: '7 Võ Văn Tần, Q.3, TP.HCM', note: '' },
];

const fmt = (n: number) => n.toLocaleString('vi-VN') + '₫';
const statusColors: Record<string, string> = {
  'Đang giao': 'text-blue-600 bg-blue-50',
  'Chờ xác nhận': 'text-amber-600 bg-amber-50',
  'Đang đóng gói': 'text-purple-600 bg-purple-50',
  'Đã giao': 'text-green-700 bg-green-50',
  'Yêu cầu đổi trả': 'text-red-600 bg-red-50',
};

const tabs = ['Tất cả (193)', 'Chờ xác nhận (42)', 'Đang đóng gói (128)', 'Đang giao (18)', 'Đã giao (3)', 'Đổi trả (18)'];

type OrderDetail = typeof ordersData[0];

export default function AdminOrdersPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState('');
  const [carrier, setCarrier] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [viewOrder, setViewOrder] = useState<OrderDetail | null>(null);

  // Create order form state
  const [newOrder, setNewOrder] = useState({ name: '', phone: '', address: '', product: '', qty: 1, payment: 'COD', carrier: 'GHN', note: '' });
  const [createSuccess, setCreateSuccess] = useState(false);

  const handleCreateOrder = () => {
    setCreateSuccess(true);
    setShowCreateForm(false);
    setNewOrder({ name: '', phone: '', address: '', product: '', qty: 1, payment: 'COD', carrier: 'GHN', note: '' });
    setTimeout(() => setCreateSuccess(false), 3000);
  };

  const filtered = ordersData.filter(o =>
    (!search || o.id.includes(search) || o.customer.toLowerCase().includes(search.toLowerCase())) &&
    (!carrier || o.carrier === carrier)
  );

  return (
    <AdminLayout title="Quản lý Đơn hàng">
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="font-serif text-xl text-[#1c1b1b]">Danh sách Đơn hàng &amp; Xử lý Đổi trả</h2>
            <p className="text-xs text-[#747878] mt-0.5">Quản lý toàn bộ đơn hàng và xử lý yêu cầu đổi trả</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 px-3 py-2 border border-[#e9e8e6] bg-white text-xs hover:border-[#c9a84c] transition-colors">
              <span className="material-icons text-sm text-[#c9a84c]">download</span> Xuất Excel
            </button>
            <button onClick={() => { setShowCreateForm(!showCreateForm); setCreateSuccess(false); }} className="flex items-center gap-1.5 px-3 py-2 bg-[#c9a84c] text-white text-xs hover:bg-[#b8943f] transition-colors">
              <span className="material-icons text-sm">{showCreateForm ? 'close' : 'add'}</span>
              {showCreateForm ? 'Đóng form' : 'Tạo đơn thủ công'}
            </button>
          </div>
        </div>

        {createSuccess && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 flex items-center gap-2 text-sm">
            <span className="material-icons text-base">check_circle</span>
            Đơn hàng thủ công đã được tạo thành công!
          </div>
        )}

        {/* Create order form */}
        {showCreateForm && (
          <div className="bg-white border border-[#e9e8e6] p-5">
            <h3 className="text-sm font-semibold text-[#1c1b1b] mb-4 flex items-center gap-2">
              <span className="material-icons text-[#c9a84c] text-base">edit_note</span>
              Tạo đơn hàng thủ công
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#747878] mb-1.5 block">Tên khách hàng *</label>
                <input value={newOrder.name} onChange={e => setNewOrder(p => ({...p, name: e.target.value}))} className="w-full border border-[#e9e8e6] px-3 py-2 text-sm outline-none focus:border-[#c9a84c]" placeholder="Nguyễn Thị A" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#747878] mb-1.5 block">Số điện thoại *</label>
                <input value={newOrder.phone} onChange={e => setNewOrder(p => ({...p, phone: e.target.value}))} className="w-full border border-[#e9e8e6] px-3 py-2 text-sm outline-none focus:border-[#c9a84c]" placeholder="0912 345 678" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#747878] mb-1.5 block">Địa chỉ giao hàng *</label>
                <input value={newOrder.address} onChange={e => setNewOrder(p => ({...p, address: e.target.value}))} className="w-full border border-[#e9e8e6] px-3 py-2 text-sm outline-none focus:border-[#c9a84c]" placeholder="Số nhà, đường, quận, thành phố" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#747878] mb-1.5 block">Sản phẩm / SKU *</label>
                <input value={newOrder.product} onChange={e => setNewOrder(p => ({...p, product: e.target.value}))} className="w-full border border-[#e9e8e6] px-3 py-2 text-sm outline-none focus:border-[#c9a84c]" placeholder="Tìm tên hoặc mã SKU..." />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#747878] mb-1.5 block">Số lượng</label>
                <input type="number" min={1} value={newOrder.qty} onChange={e => setNewOrder(p => ({...p, qty: Number(e.target.value)}))} className="w-full border border-[#e9e8e6] px-3 py-2 text-sm outline-none focus:border-[#c9a84c]" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#747878] mb-1.5 block">Thanh toán</label>
                <select value={newOrder.payment} onChange={e => setNewOrder(p => ({...p, payment: e.target.value}))} className="w-full border border-[#e9e8e6] px-3 py-2 text-sm outline-none focus:border-[#c9a84c] bg-white">
                  <option>COD</option><option>VietQR</option><option>Chuyển khoản</option><option>VNPay</option><option>MoMo</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#747878] mb-1.5 block">Đơn vị vận chuyển</label>
                <select value={newOrder.carrier} onChange={e => setNewOrder(p => ({...p, carrier: e.target.value}))} className="w-full border border-[#e9e8e6] px-3 py-2 text-sm outline-none focus:border-[#c9a84c] bg-white">
                  <option>GHN</option><option>GHTK</option><option>ViettelPost</option><option>Tự giao</option>
                </select>
              </div>
              <div className="lg:col-span-2">
                <label className="text-[10px] uppercase tracking-wider text-[#747878] mb-1.5 block">Ghi chú nội bộ</label>
                <input value={newOrder.note} onChange={e => setNewOrder(p => ({...p, note: e.target.value}))} className="w-full border border-[#e9e8e6] px-3 py-2 text-sm outline-none focus:border-[#c9a84c]" placeholder="Ghi chú cho nhân viên kho..." />
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={handleCreateOrder} disabled={!newOrder.name || !newOrder.phone || !newOrder.product} className="px-6 py-2.5 bg-[#1c1b1b] text-white text-xs tracking-wider hover:bg-[#333] transition-colors disabled:opacity-50">Tạo đơn hàng</button>
              <button className="px-4 py-2.5 border border-[#e9e8e6] text-xs text-[#747878] hover:border-[#1c1b1b] transition-colors">Lưu nháp</button>
              <button onClick={() => setShowCreateForm(false)} className="px-4 py-2.5 text-xs text-[#747878]">Hủy</button>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white border border-[#e9e8e6] p-4 flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-40">
            <span className="material-icons absolute left-2 top-1/2 -translate-y-1/2 text-[#747878] text-lg">search</span>
            <input value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-8 pr-3 py-2 text-xs border border-[#e9e8e6] outline-none focus:border-[#c9a84c]" placeholder="Tìm mã đơn, tên khách hàng..." />
          </div>
          <select value={carrier} onChange={e => setCarrier(e.target.value)} className="px-3 py-2 text-xs border border-[#e9e8e6] outline-none focus:border-[#c9a84c] bg-white">
            <option value="">Đơn vị vận chuyển</option>
            <option>GHN</option><option>GHTK</option><option>ViettelPost</option>
          </select>
          <select className="px-3 py-2 text-xs border border-[#e9e8e6] outline-none focus:border-[#c9a84c] bg-white">
            <option>Loại đơn: Bán mới</option><option>Đổi hàng</option>
          </select>
        </div>

        {/* Status tabs */}
        <div className="flex gap-1 flex-wrap">
          {tabs.map((t, i) => (
            <button key={i} onClick={() => setActiveTab(i)} className={`px-3 py-1.5 text-xs border transition-colors ${activeTab === i ? 'bg-[#1c1b1b] text-white border-[#1c1b1b]' : 'border-[#e9e8e6] bg-white text-[#747878] hover:border-[#1c1b1b]'}`}>{t}</button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white border border-[#e9e8e6] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#f4f3f1] bg-[#faf9f7]">
                  <th className="w-4 px-4 py-3"><input type="checkbox" className="accent-[#c9a84c]" /></th>
                  {['Mã đơn', 'Ngày đặt', 'Khách hàng', 'Sản phẩm', 'Giá trị', 'Thanh toán', 'Vận chuyển', 'Trạng thái', 'Thao tác'].map(h => (
                    <th key={h} className="px-3 py-3 text-left text-[10px] uppercase tracking-wider text-[#747878] font-medium whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(o => (
                  <tr key={o.id} className="border-b border-[#f4f3f1] hover:bg-[#faf9f7] transition-colors">
                    <td className="px-4 py-3"><input type="checkbox" className="accent-[#c9a84c]" /></td>
                    <td className="px-3 py-3 font-medium text-[#c9a84c]">{o.id}</td>
                    <td className="px-3 py-3 text-[#747878]">{o.date}</td>
                    <td className="px-3 py-3">
                      <p className="font-medium text-[#1c1b1b]">{o.customer}</p>
                      <p className="text-[#747878]">{o.phone}</p>
                    </td>
                    <td className="px-3 py-3 text-[#747878]">{o.items} SP</td>
                    <td className="px-3 py-3 font-semibold text-[#1c1b1b]">{fmt(o.amount)}</td>
                    <td className="px-3 py-3 text-[#747878]">{o.payment}</td>
                    <td className="px-3 py-3">
                      {o.carrier ? (
                        <div>
                          <p className="text-[#747878]">{o.carrier}</p>
                          <p className="text-[#c9a84c]">{o.tracking}</p>
                        </div>
                      ) : <span className="text-[#c4c7c7]">—</span>}
                    </td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${statusColors[o.status] || 'text-gray-600 bg-gray-50'}`}>{o.status}</span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex gap-1">
                        <button onClick={() => setViewOrder(o)} className="w-7 h-7 border border-[#e9e8e6] flex items-center justify-center hover:border-[#c9a84c] transition-colors" title="Xem chi tiết">
                          <span className="material-icons text-sm text-[#747878]">visibility</span>
                        </button>
                        <button onClick={() => window.print()} className="w-7 h-7 border border-[#e9e8e6] flex items-center justify-center hover:border-[#c9a84c] transition-colors" title="In vận đơn">
                          <span className="material-icons text-sm text-[#747878]">print</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between p-4 border-t border-[#f4f3f1]">
            <p className="text-xs text-[#747878]">Hiển thị 1–{filtered.length} trong tổng số 193 đơn</p>
            <div className="flex gap-1">
              {[1, 2, 3, '...', 20].map((p, i) => (
                <button key={i} className={`w-8 h-8 text-xs border ${p === 1 ? 'bg-[#1c1b1b] text-white border-[#1c1b1b]' : 'border-[#e9e8e6] hover:border-[#1c1b1b]'}`}>{p}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Order detail modal */}
      {viewOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setViewOrder(null)}>
          <div className="bg-white max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-serif text-lg text-[#1c1b1b]">Chi tiết đơn hàng</h3>
                <p className="text-xs text-[#c9a84c] font-medium">{viewOrder.id}</p>
              </div>
              <button onClick={() => setViewOrder(null)}><span className="material-icons text-[#747878]">close</span></button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs mb-5">
              {[['Ngày đặt', viewOrder.date], ['Trạng thái', viewOrder.status], ['Khách hàng', viewOrder.customer], ['SĐT', viewOrder.phone], ['Địa chỉ', viewOrder.address], ['Thanh toán', viewOrder.payment], ['Vận chuyển', viewOrder.carrier || 'Chưa chỉ định'], ['Mã vận đơn', viewOrder.tracking || '—'], ['Số SP', `${viewOrder.items} sản phẩm`], ['Giá trị đơn', fmt(viewOrder.amount)]].map(([k, v]) => (
                <div key={k} className="bg-[#f4f3f1] p-2">
                  <p className="text-[#747878] mb-0.5">{k}</p>
                  <p className="font-medium text-[#1c1b1b]">{v}</p>
                </div>
              ))}
            </div>
            {viewOrder.note && <div className="bg-amber-50 border border-amber-200 px-3 py-2 text-xs text-amber-700 mb-4"><strong>Ghi chú:</strong> {viewOrder.note}</div>}
            <div className="flex gap-2 flex-wrap">
              <button className="flex-1 py-2.5 bg-[#c9a84c] text-white text-xs tracking-wider hover:bg-[#b8943f] transition-colors">Xác nhận đơn</button>
              <button onClick={() => window.print()} className="px-4 py-2.5 border border-[#e9e8e6] text-xs text-[#747878] hover:border-[#1c1b1b] flex items-center gap-1"><span className="material-icons text-sm">print</span> In vận đơn</button>
              <button onClick={() => setViewOrder(null)} className="px-4 py-2.5 border border-[#e9e8e6] text-xs text-[#747878]">Đóng</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
