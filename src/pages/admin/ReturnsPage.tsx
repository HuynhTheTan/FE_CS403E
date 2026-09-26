import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

const returns = [
  { id: 'RET-2024-001', orderId: '#VT-98195', date: '22/10/2024', customer: 'Hoàng Hải Yến', phone: '0908 765 432', product: 'Áo Trench Coat Dạ Dáng Dài', reason: 'Sai size (L → M)', amount: 3200000, status: 'Chờ duyệt', type: 'Đổi size' },
  { id: 'RET-2024-002', orderId: '#VT-98237', date: '23/10/2024', customer: 'Đặng Minh Khánh', phone: '0911 777 888', product: 'Áo Blazer Dạ Cashmere', reason: 'Hàng lỗi — đường chỉ không đều', amount: 8450000, status: 'Đang xử lý', type: 'Hoàn tiền' },
  { id: 'RET-2024-003', orderId: '#VT-98230', date: '20/10/2024', customer: 'Nguyễn Thu Lan', phone: '0912 555 111', product: 'Đầm Lụa Satin Cổ Đổ', reason: 'Sản phẩm không như mô tả', amount: 6890000, status: 'Đã hoàn tiền', type: 'Hoàn tiền' },
  { id: 'RET-2024-004', orderId: '#VT-98228', date: '19/10/2024', customer: 'Trần Thu Hương', phone: '0916 888 222', product: 'Cardigan Len Merino', reason: 'Đổi màu (Xanh → Đen)', amount: 4200000, status: 'Đã hoàn hàng', type: 'Đổi màu' },
];

const fmt = (n: number) => n.toLocaleString('vi-VN') + '₫';
const statusColor: Record<string, string> = {
  'Chờ duyệt': 'text-amber-600 bg-amber-50',
  'Đang xử lý': 'text-blue-600 bg-blue-50',
  'Đã hoàn tiền': 'text-green-700 bg-green-50',
  'Đã hoàn hàng': 'text-purple-600 bg-purple-50',
};

export default function ReturnsPage() {
  const [items, setItems] = useState(returns);
  const [activeTab, setActiveTab] = useState('Tất cả');
  const [selected, setSelected] = useState<typeof returns[0] | null>(null);
  const [note, setNote] = useState('');

  const tabs = ['Tất cả', 'Chờ duyệt', 'Đang xử lý', 'Đã hoàn tiền', 'Đã hoàn hàng'];
  const filtered = items.filter(r => activeTab === 'Tất cả' || r.status === activeTab);

  const approve = (id: string, newStatus: string) => {
    setItems(p => p.map(r => r.id === id ? {...r, status: newStatus} : r));
    setSelected(null);
  };

  return (
    <AdminLayout title="Quản lý Đổi trả">
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="font-serif text-xl text-[#1c1b1b]">Quản lý Đổi trả &amp; Khiếu nại</h2>
            <p className="text-xs text-[#747878] mt-0.5">Xử lý yêu cầu đổi hàng, hoàn tiền từ khách hàng</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 px-3 py-2 border border-[#e9e8e6] bg-white text-xs hover:border-[#c9a84c] transition-colors">
              <span className="material-icons text-sm text-[#c9a84c]">download</span> Xuất báo cáo
            </button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: 'Tổng yêu cầu', value: `${items.length}`, icon: 'sync_alt', color: 'text-[#c9a84c]' },
            { label: 'Chờ duyệt', value: `${items.filter(r => r.status === 'Chờ duyệt').length}`, icon: 'pending_actions', color: 'text-amber-600' },
            { label: 'Đang xử lý', value: `${items.filter(r => r.status === 'Đang xử lý').length}`, icon: 'autorenew', color: 'text-blue-600' },
            { label: 'Đã hoàn', value: `${items.filter(r => r.status.startsWith('Đã')).length}`, icon: 'check_circle', color: 'text-green-600' },
          ].map(k => (
            <div key={k.label} className="bg-white border border-[#e9e8e6] p-4">
              <span className={`material-icons text-xl ${k.color} block mb-2`}>{k.icon}</span>
              <p className={`font-serif text-2xl font-semibold ${k.color}`}>{k.value}</p>
              <p className="text-[10px] text-[#aaa] mt-0.5">{k.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 flex-wrap">
          {tabs.map(t => (
            <button key={t} onClick={() => setActiveTab(t)} className={`px-3 py-1.5 text-xs border transition-colors ${activeTab === t ? 'bg-[#1c1b1b] text-white border-[#1c1b1b]' : 'border-[#e9e8e6] bg-white text-[#747878] hover:border-[#1c1b1b]'}`}>{t}</button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white border border-[#e9e8e6] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#f4f3f1] bg-[#faf9f7]">
                  {['Mã phiếu', 'Đơn hàng', 'Ngày YC', 'Khách hàng', 'Sản phẩm', 'Lý do', 'Loại', 'Giá trị', 'Trạng thái', 'Thao tác'].map(h => (
                    <th key={h} className="px-3 py-3 text-left text-[10px] uppercase tracking-wider text-[#747878] font-medium whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(r => (
                  <tr key={r.id} className="border-b border-[#f4f3f1] hover:bg-[#faf9f7] transition-colors">
                    <td className="px-3 py-3 font-mono font-medium text-[#c9a84c]">{r.id}</td>
                    <td className="px-3 py-3 font-medium">{r.orderId}</td>
                    <td className="px-3 py-3 text-[#747878]">{r.date}</td>
                    <td className="px-3 py-3">
                      <p className="font-medium">{r.customer}</p>
                      <p className="text-[#747878]">{r.phone}</p>
                    </td>
                    <td className="px-3 py-3 max-w-32 truncate text-[#747878]">{r.product}</td>
                    <td className="px-3 py-3 text-[#747878] max-w-32 truncate">{r.reason}</td>
                    <td className="px-3 py-3">
                      <span className={`px-1.5 py-0.5 text-[10px] font-medium ${r.type === 'Hoàn tiền' ? 'bg-red-50 text-red-600' : 'bg-purple-50 text-purple-600'}`}>{r.type}</span>
                    </td>
                    <td className="px-3 py-3 font-semibold">{fmt(r.amount)}</td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${statusColor[r.status]}`}>{r.status}</span>
                    </td>
                    <td className="px-3 py-3">
                      <button onClick={() => setSelected(r)} className="px-2 py-1 border border-[#e9e8e6] text-[10px] hover:border-[#c9a84c] transition-colors">Chi tiết</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white max-w-lg w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-serif text-lg">Chi tiết phiếu {selected.id}</h3>
              <button onClick={() => setSelected(null)}><span className="material-icons text-[#747878]">close</span></button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs mb-4">
              {[['Đơn hàng', selected.orderId], ['Ngày YC', selected.date], ['Khách hàng', selected.customer], ['SĐT', selected.phone], ['Sản phẩm', selected.product], ['Loại YC', selected.type], ['Lý do', selected.reason], ['Giá trị', fmt(selected.amount)]].map(([k, v]) => (
                <div key={k} className="bg-[#f4f3f1] p-2">
                  <p className="text-[#747878] mb-0.5">{k}</p>
                  <p className="font-medium text-[#1c1b1b]">{v}</p>
                </div>
              ))}
            </div>
            <div className="mb-4">
              <label className="text-[10px] uppercase tracking-wider text-[#747878] mb-1 block">Ghi chú xử lý</label>
              <textarea value={note} onChange={e => setNote(e.target.value)} rows={3} className="w-full border border-[#e9e8e6] px-3 py-2 text-xs outline-none focus:border-[#c9a84c]" placeholder="Nhập ghi chú..." />
            </div>
            <div className="flex gap-2 flex-wrap">
              {selected.status === 'Chờ duyệt' && <>
                <button onClick={() => approve(selected.id, 'Đang xử lý')} className="flex-1 py-2.5 bg-[#c9a84c] text-white text-xs tracking-wider hover:bg-[#b8943f] transition-colors">Phê duyệt</button>
                <button onClick={() => approve(selected.id, 'Đã hoàn tiền')} className="flex-1 py-2.5 bg-green-600 text-white text-xs tracking-wider hover:bg-green-700 transition-colors">Duyệt hoàn tiền</button>
              </>}
              {selected.status === 'Đang xử lý' && <>
                <button onClick={() => approve(selected.id, 'Đã hoàn tiền')} className="flex-1 py-2.5 bg-green-600 text-white text-xs tracking-wider hover:bg-green-700 transition-colors">Xác nhận hoàn tiền</button>
                <button onClick={() => approve(selected.id, 'Đã hoàn hàng')} className="flex-1 py-2.5 bg-purple-600 text-white text-xs tracking-wider hover:bg-purple-700 transition-colors">Xác nhận đổi hàng</button>
              </>}
              <button onClick={() => setSelected(null)} className="px-4 py-2.5 border border-[#e9e8e6] text-xs text-[#747878]">Đóng</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
