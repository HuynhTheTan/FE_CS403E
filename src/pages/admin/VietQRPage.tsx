import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

const transactions = [
  { id: 'TXN-2024-10248', time: '24/10 14:35', amount: 6040000, content: 'VT98241', status: 'Khớp', order: '#VT-98241', bank: 'Vietcombank', method: 'VietQR' },
  { id: 'TXN-2024-10247', time: '24/10 13:12', amount: 1890000, content: 'VTKHONG', status: 'Chưa khớp', order: null, bank: 'Techcombank', method: 'VietQR' },
  { id: 'TXN-2024-10246', time: '24/10 11:08', amount: 8250000, content: 'VT98240', status: 'Khớp', order: '#VT-98240', bank: 'BIDV', method: 'VietQR' },
  { id: 'TXN-2024-10245', time: '24/10 09:55', amount: 3200000, content: 'VT98195', status: 'Đã hoàn', order: '#VT-98195', bank: 'MB Bank', method: 'VietQR' },
  { id: 'TXN-2024-10244', time: '23/10 18:30', amount: 4890000, content: 'VT98239', status: 'Khớp', order: '#VT-98239', bank: 'ACB', method: 'VietQR' },
  { id: 'TXN-2024-10243', time: '23/10 15:22', amount: 500000, content: 'VTTEST', status: 'Chưa khớp', order: null, bank: 'Vietcombank', method: 'Chuyển khoản' },
];

const fmt = (n: number) => n.toLocaleString('vi-VN') + '₫';
const statusColor: Record<string, string> = {
  'Khớp': 'text-green-700 bg-green-50',
  'Chưa khớp': 'text-amber-600 bg-amber-50',
  'Đã hoàn': 'text-blue-600 bg-blue-50',
};

export default function VietQRPage() {
  const [search, setSearch] = useState('');
  const [activeStatus, setActiveStatus] = useState('Tất cả');
  const [matchModal, setMatchModal] = useState<typeof transactions[0] | null>(null);
  const [matchOrderId, setMatchOrderId] = useState('');

  const statuses = ['Tất cả', 'Khớp', 'Chưa khớp', 'Đã hoàn'];
  const filtered = transactions.filter(t =>
    (activeStatus === 'Tất cả' || t.status === activeStatus) &&
    (!search || t.id.includes(search) || t.content.includes(search))
  );

  const totalKhop = transactions.filter(t => t.status === 'Khớp').reduce((s, t) => s + t.amount, 0);
  const totalChuaKhop = transactions.filter(t => t.status === 'Chưa khớp').reduce((s, t) => s + t.amount, 0);

  return (
    <AdminLayout title="Tra soát VietQR">
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="font-serif text-xl text-[#1c1b1b]">Tra soát VietQR &amp; Đối chiếu Thanh toán</h2>
            <p className="text-xs text-[#747878] mt-0.5">Xác minh giao dịch, khớp đơn và xử lý hoàn tiền qua Napas</p>
          </div>
          <button className="flex items-center gap-2 px-3 py-2 border border-[#e9e8e6] bg-white text-xs hover:border-[#c9a84c] transition-colors">
            <span className="material-icons text-sm text-[#c9a84c]">sync</span> Đồng bộ Napas
          </button>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: 'Tổng GD hôm nay', value: `${transactions.length}`, icon: 'receipt', color: 'text-[#c9a84c]' },
            { label: 'Đã khớp đơn', value: fmt(totalKhop), icon: 'check_circle', color: 'text-green-600' },
            { label: 'Chưa khớp', value: fmt(totalChuaKhop), icon: 'warning_amber', color: 'text-amber-600' },
            { label: 'GD chờ xử lý', value: '2', icon: 'pending', color: 'text-red-600' },
          ].map(k => (
            <div key={k.label} className="bg-white border border-[#e9e8e6] p-4">
              <div className="flex items-center gap-2 mb-2"><span className={`material-icons text-xl ${k.color}`}>{k.icon}</span></div>
              <p className={`font-serif text-lg font-semibold ${k.color}`}>{k.value}</p>
              <p className="text-[10px] text-[#aaa] mt-0.5">{k.label}</p>
            </div>
          ))}
        </div>

        {/* Scan QR section */}
        <div className="bg-white border border-[#e9e8e6] p-5">
          <h3 className="text-sm font-semibold text-[#1c1b1b] mb-4 flex items-center gap-2">
            <span className="material-icons text-[#c9a84c]">qr_code_scanner</span>
            Tra soát thủ công theo mã QR / Nội dung chuyển khoản
          </h3>
          <div className="flex gap-3 flex-wrap">
            <div className="relative flex-1 min-w-60">
              <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-[#747878] text-lg">search</span>
              <input value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-[#e9e8e6] text-sm outline-none focus:border-[#c9a84c]" placeholder="Nhập nội dung CK, mã GD, số tiền..." />
            </div>
            <button className="px-4 py-2 bg-[#c9a84c] text-white text-xs tracking-wider hover:bg-[#b8943f] transition-colors flex items-center gap-2">
              <span className="material-icons text-sm">qr_code_scanner</span> Quét mã QR
            </button>
            <button className="px-4 py-2 border border-[#e9e8e6] text-xs text-[#747878] hover:border-[#1c1b1b] transition-colors">Lọc theo ngân hàng</button>
          </div>
        </div>

        {/* Status tabs */}
        <div className="flex gap-1">
          {statuses.map(s => (
            <button key={s} onClick={() => setActiveStatus(s)} className={`px-3 py-1.5 text-xs border transition-colors ${activeStatus === s ? 'bg-[#1c1b1b] text-white border-[#1c1b1b]' : 'border-[#e9e8e6] bg-white text-[#747878] hover:border-[#1c1b1b]'}`}>{s}</button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white border border-[#e9e8e6] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#f4f3f1] bg-[#faf9f7]">
                  {['Mã GD', 'Thời gian', 'Số tiền', 'Nội dung CK', 'Ngân hàng', 'Đơn hàng', 'Trạng thái', 'Thao tác'].map(h => (
                    <th key={h} className="px-3 py-3 text-left text-[10px] uppercase tracking-wider text-[#747878] font-medium whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(t => (
                  <tr key={t.id} className="border-b border-[#f4f3f1] hover:bg-[#faf9f7] transition-colors">
                    <td className="px-3 py-3 font-mono text-xs text-[#1c1b1b]">{t.id}</td>
                    <td className="px-3 py-3 text-[#747878]">{t.time}</td>
                    <td className="px-3 py-3 font-bold text-[#1c1b1b]">{fmt(t.amount)}</td>
                    <td className="px-3 py-3 font-mono text-[#c9a84c]">{t.content}</td>
                    <td className="px-3 py-3 text-[#747878]">{t.bank}</td>
                    <td className="px-3 py-3">
                      {t.order ? <span className="font-medium text-[#c9a84c]">{t.order}</span> : <span className="text-[#c4c7c7] italic">Chưa khớp</span>}
                    </td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${statusColor[t.status]}`}>{t.status}</span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex gap-1">
                        {t.status === 'Chưa khớp' && (
                          <button onClick={() => setMatchModal(t)} className="px-2 py-1 bg-[#c9a84c] text-white text-[10px] hover:bg-[#b8943f] transition-colors whitespace-nowrap">Khớp đơn</button>
                        )}
                        {t.status === 'Khớp' && (
                          <button className="px-2 py-1 border border-[#e9e8e6] text-[#747878] text-[10px] hover:border-[#ba1a1a] hover:text-[#ba1a1a] transition-colors whitespace-nowrap">Hoàn tiền</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Match order modal */}
      {matchModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setMatchModal(null)}>
          <div className="bg-white max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-lg text-[#1c1b1b]">Khớp giao dịch với đơn hàng</h3>
              <button onClick={() => setMatchModal(null)}><span className="material-icons text-[#747878]">close</span></button>
            </div>
            <div className="bg-[#f4f3f1] p-3 mb-4 text-xs space-y-1">
              <p><span className="text-[#747878]">Mã GD:</span> <span className="font-mono font-medium">{matchModal.id}</span></p>
              <p><span className="text-[#747878]">Số tiền:</span> <span className="font-bold text-[#c9a84c]">{fmt(matchModal.amount)}</span></p>
              <p><span className="text-[#747878]">Nội dung:</span> <span className="font-mono">{matchModal.content}</span></p>
              <p><span className="text-[#747878]">Ngân hàng:</span> {matchModal.bank}</p>
            </div>
            <label className="text-[10px] uppercase tracking-wider text-[#747878] mb-1.5 block">Mã đơn hàng để khớp</label>
            <input value={matchOrderId} onChange={e => setMatchOrderId(e.target.value)} placeholder="#VT-98242" className="w-full border border-[#e9e8e6] px-3 py-2 text-sm outline-none focus:border-[#c9a84c] mb-4" />
            <div className="flex gap-3">
              <button onClick={() => { alert(`Đã khớp GD ${matchModal.id} với đơn ${matchOrderId}`); setMatchModal(null); setMatchOrderId(''); }} className="flex-1 py-2.5 bg-[#c9a84c] text-white text-xs tracking-wider hover:bg-[#b8943f] transition-colors">Xác nhận khớp đơn</button>
              <button onClick={() => setMatchModal(null)} className="px-4 py-2.5 border border-[#e9e8e6] text-xs text-[#747878]">Hủy</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
