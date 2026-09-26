import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

const carriers = [
  { name: 'GHN', label: 'Giao Hàng Nhanh', orders: 84, delivered: 79, returned: 3, lost: 1, fee: 32400000, claimedFee: 35200000, color: 'text-orange-600', bg: 'bg-orange-50' },
  { name: 'GHTK', label: 'Giao Hàng Tiết Kiệm', orders: 62, delivered: 58, returned: 4, lost: 0, fee: 18600000, claimedFee: 19100000, color: 'text-blue-600', bg: 'bg-blue-50' },
  { name: 'VTP', label: 'Viettel Post', orders: 47, delivered: 44, returned: 2, lost: 0, fee: 14100000, claimedFee: 14100000, color: 'text-red-600', bg: 'bg-red-50' },
];

const shipments = [
  { carrier: 'GHN', waybill: 'GHN1234567890', order: '#VT-98241', cod: 6040000, fee: 35000, status: 'Đã giao', delivered: '24/10/2024', claimedFee: 38000, diff: 3000 },
  { carrier: 'GHTK', waybill: 'GHTK9876543210', order: '#VT-98240', cod: 8250000, fee: 25000, status: 'Đang giao', delivered: null, claimedFee: 25000, diff: 0 },
  { carrier: 'VTP', waybill: 'VTP5555123456', order: '#VT-98239', cod: 4890000, fee: 30000, status: 'Đã giao', delivered: '23/10/2024', claimedFee: 30000, diff: 0 },
  { carrier: 'GHN', waybill: 'GHN1234567801', order: '#VT-98237', cod: 8450000, fee: 35000, status: 'Hoàn hàng', delivered: null, claimedFee: 35000, diff: 0 },
  { carrier: 'GHN', waybill: 'GHN1234567795', order: '#VT-98235', cod: 3200000, fee: 35000, status: 'Đã giao', delivered: '22/10/2024', claimedFee: 40000, diff: 5000 },
];

const fmt = (n: number) => n.toLocaleString('vi-VN') + '₫';
const statusColor: Record<string, string> = {
  'Đã giao': 'text-green-700 bg-green-50',
  'Đang giao': 'text-blue-600 bg-blue-50',
  'Hoàn hàng': 'text-red-600 bg-red-50',
};

export default function ShippingPage() {
  const [activeCarrier, setActiveCarrier] = useState('Tất cả');
  const [activeTab, setActiveTab] = useState('Đối soát cước');
  const [reconciling, setReconciling] = useState<string | null>(null);

  const filtered = shipments.filter(s => activeCarrier === 'Tất cả' || s.carrier === activeCarrier);
  const totalFee = filtered.reduce((s, i) => s + i.fee, 0);
  const totalClaimed = filtered.reduce((s, i) => s + i.claimedFee, 0);
  const totalDiff = filtered.reduce((s, i) => s + i.diff, 0);

  return (
    <AdminLayout title="Cước & Đối soát 3PL">
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="font-serif text-xl text-[#1c1b1b]">Cước &amp; Đối soát 3PL</h2>
            <p className="text-xs text-[#747878] mt-0.5">Đối soát chi phí vận chuyển với GHN, GHTK, Viettel Post</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 px-3 py-2 border border-[#e9e8e6] bg-white text-xs hover:border-[#c9a84c] transition-colors">
              <span className="material-icons text-sm text-[#c9a84c]">sync</span> Đồng bộ dữ liệu
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 border border-[#e9e8e6] bg-white text-xs hover:border-[#c9a84c] transition-colors">
              <span className="material-icons text-sm text-[#747878]">download</span> Xuất báo cáo
            </button>
          </div>
        </div>

        {/* Carrier KPI cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {carriers.map(c => (
            <div key={c.name} className="bg-white border border-[#e9e8e6] p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-xs font-bold px-2 py-0.5 ${c.bg} ${c.color}`}>{c.name}</span>
                <span className="text-xs text-[#747878]">{c.label}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div><p className="text-[#747878]">Tổng đơn</p><p className="font-semibold text-[#1c1b1b]">{c.orders}</p></div>
                <div><p className="text-[#747878]">Đã giao</p><p className="font-semibold text-green-600">{c.delivered}</p></div>
                <div><p className="text-[#747878]">Hoàn hàng</p><p className="font-semibold text-amber-600">{c.returned}</p></div>
                <div><p className="text-[#747878]">Thất lạc</p><p className={`font-semibold ${c.lost > 0 ? 'text-red-600' : 'text-[#747878]'}`}>{c.lost}</p></div>
              </div>
              <div className="mt-3 pt-3 border-t border-[#f4f3f1]">
                <div className="flex justify-between text-xs">
                  <span className="text-[#747878]">Phí thực tế</span><span className="font-semibold">{fmt(c.fee)}</span>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span className="text-[#747878]">Phí đối soát</span><span className={`font-semibold ${c.claimedFee > c.fee ? 'text-amber-600' : 'text-green-600'}`}>{fmt(c.claimedFee)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1">
          {['Đối soát cước', 'Lịch sử vận đơn', 'Khiếu nại bồi thường'].map(t => (
            <button key={t} onClick={() => setActiveTab(t)} className={`px-3 py-1.5 text-xs border transition-colors ${activeTab === t ? 'bg-[#1c1b1b] text-white border-[#1c1b1b]' : 'border-[#e9e8e6] bg-white text-[#747878] hover:border-[#1c1b1b]'}`}>{t}</button>
          ))}
        </div>

        {activeTab === 'Đối soát cước' && (
          <div className="bg-white border border-[#e9e8e6] overflow-hidden">
            {/* Summary bar */}
            <div className="p-4 border-b border-[#f4f3f1] bg-[#faf9f7] flex items-center gap-6 text-xs flex-wrap">
              <div className="flex gap-1.5 items-center">
                <span className="material-icons text-sm text-[#c9a84c]">receipt_long</span>
                <span className="text-[#747878]">Tổng cước thực tế:</span>
                <span className="font-bold">{fmt(totalFee)}</span>
              </div>
              <div className="flex gap-1.5 items-center">
                <span className="material-icons text-sm text-[#747878]">request_quote</span>
                <span className="text-[#747878]">Phí đơn vị vận chuyển đối soát:</span>
                <span className="font-bold">{fmt(totalClaimed)}</span>
              </div>
              {totalDiff > 0 && <div className="flex gap-1.5 items-center text-amber-600">
                <span className="material-icons text-sm">warning</span>
                <span>Chênh lệch: <span className="font-bold">{fmt(totalDiff)}</span></span>
              </div>}
              <div className="flex gap-1 ml-auto">
                {['Tất cả', 'GHN', 'GHTK', 'VTP'].map(c => (
                  <button key={c} onClick={() => setActiveCarrier(c)} className={`px-2 py-0.5 text-[10px] border transition-colors ${activeCarrier === c ? 'bg-[#1c1b1b] text-white border-[#1c1b1b]' : 'border-[#e9e8e6] hover:border-[#1c1b1b]'}`}>{c}</button>
                ))}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-[#f4f3f1]">
                    {['ĐVVC', 'Mã vận đơn', 'Đơn hàng', 'Giá trị COD', 'Phí VT (thực)', 'Phí VT (đối soát)', 'Chênh lệch', 'Trạng thái', 'Thao tác'].map(h => (
                      <th key={h} className="px-3 py-3 text-left text-[10px] uppercase tracking-wider text-[#747878] font-medium whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(s => (
                    <tr key={s.waybill} className="border-b border-[#f4f3f1] hover:bg-[#faf9f7] transition-colors">
                      <td className="px-3 py-3">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 ${carriers.find(c => c.name === s.carrier)?.bg} ${carriers.find(c => c.name === s.carrier)?.color}`}>{s.carrier}</span>
                      </td>
                      <td className="px-3 py-3 font-mono text-[#747878]">{s.waybill}</td>
                      <td className="px-3 py-3 font-medium text-[#c9a84c]">{s.order}</td>
                      <td className="px-3 py-3 font-semibold">{fmt(s.cod)}</td>
                      <td className="px-3 py-3">{fmt(s.fee)}</td>
                      <td className="px-3 py-3">{fmt(s.claimedFee)}</td>
                      <td className="px-3 py-3">
                        {s.diff > 0 ? <span className="text-amber-600 font-semibold">+{fmt(s.diff)}</span> : <span className="text-green-600">Khớp</span>}
                      </td>
                      <td className="px-3 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${statusColor[s.status]}`}>{s.status}</span>
                      </td>
                      <td className="px-3 py-3">
                        {s.diff > 0 ? (
                          <button onClick={() => setReconciling(s.waybill)} className="px-2 py-1 bg-amber-50 border border-amber-200 text-amber-700 text-[10px] hover:bg-amber-100 transition-colors">Khiếu nại</button>
                        ) : (
                          <button className="px-2 py-1 border border-[#e9e8e6] text-[10px] hover:border-[#c9a84c] transition-colors">Xem</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'Lịch sử vận đơn' && (
          <div className="bg-white border border-[#e9e8e6] p-8 text-center text-[#747878]">
            <span className="material-icons text-3xl block mb-2">local_shipping</span>
            <p className="text-sm">Toàn bộ lịch sử vận đơn. Lọc theo ngày, đơn vị vận chuyển, trạng thái.</p>
            <p className="text-xs mt-1">Đang kết nối với API GHN, GHTK và Viettel Post...</p>
          </div>
        )}

        {activeTab === 'Khiếu nại bồi thường' && (
          <div className="bg-white border border-[#e9e8e6] p-8 text-center text-[#747878]">
            <span className="material-icons text-3xl block mb-2">gavel</span>
            <p className="text-sm">Quản lý khiếu nại bồi thường thất lạc hàng hóa với đơn vị vận chuyển.</p>
            <p className="text-xs mt-1">Chưa có khiếu nại nào đang mở.</p>
          </div>
        )}
      </div>

      {reconciling && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setReconciling(null)}>
          <div className="bg-white max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
            <h3 className="font-serif text-lg mb-1">Gửi khiếu nại cước</h3>
            <p className="text-xs text-[#747878] mb-4">Mã vận đơn: <span className="font-mono">{reconciling}</span></p>
            <textarea rows={4} className="w-full border border-[#e9e8e6] px-3 py-2 text-xs outline-none focus:border-[#c9a84c] mb-4" defaultValue="Phí vận chuyển đối soát cao hơn phí thực tế. Đề nghị điều chỉnh theo hóa đơn đính kèm." />
            <div className="flex gap-3">
              <button onClick={() => { alert('Đã gửi khiếu nại!'); setReconciling(null); }} className="flex-1 py-2.5 bg-amber-600 text-white text-xs tracking-wider hover:bg-amber-700 transition-colors">Gửi khiếu nại</button>
              <button onClick={() => setReconciling(null)} className="px-4 py-2.5 border border-[#e9e8e6] text-xs">Hủy</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
