import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

const initialItems = [
  { sku: 'VT-BLZ-01', name: 'Áo Blazer Lụa Cao Cấp', color: 'Đen', size: 'S', systemQty: 45, physicalQty: 44, value: 1480000 },
  { sku: 'VT-BLZ-09', name: 'Tailored Silk-Wool Single Blazer', color: 'Charcoal', size: 'M', systemQty: 8, physicalQty: 8, value: 3890000 },
  { sku: 'VT-KNI-09', name: 'Áo Len Cashmere Cổ Lọ', color: 'Trắng kem', size: 'M', systemQty: 3, physicalQty: 5, value: 1200000 },
  { sku: 'VT-SKR-04', name: 'Chân Váy Midi Xếp Ly', color: 'Be sáng', size: 'M', systemQty: 23, physicalQty: 20, value: 950000 },
  { sku: 'VT-TRS-44', name: 'Pleated Mulberry Silk Trouser', color: 'Ivory', size: '31', systemQty: 12, physicalQty: 12, value: 2150000 },
];

export default function StockCountPage() {
  const [items, setItems] = useState(initialItems.map(i => ({ ...i, editQty: i.physicalQty })));
  const [showNewModal, setShowNewModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);

  const updateQty = (sku: string, val: number) => {
    setItems(prev => prev.map(i => i.sku === sku ? { ...i, editQty: val } : i));
  };

  const computedItems = items.map(i => ({
    ...i,
    diff: i.editQty - i.systemQty,
    status: i.editQty === i.systemQty ? 'Khớp' : 'Chênh lệch',
  }));

  const totalDiff = computedItems.reduce((s, i) => s + i.diff * i.value, 0);

  const handleSaveDraft = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleSubmit = () => {
    setShowSubmitModal(false);
    setSubmitted(true);
  };

  return (
    <AdminLayout title="Kiểm kê kho">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="font-serif text-xl text-[#1c1b1b]">Biên bản Kiểm kê &amp; Cân bằng tồn</h2>
            <p className="text-xs text-[#747878] mt-0.5">Quy trình UC21 · Kho vận &amp; Fulfillment</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setHistoryOpen(true)} className="flex items-center gap-1.5 px-3 py-2 border border-[#e9e8e6] bg-white text-xs hover:border-[#c9a84c] transition-colors">
              <span className="material-icons text-sm text-[#747878]">history</span> Lịch sử cân bằng
            </button>
            <button onClick={() => setShowNewModal(true)} className="flex items-center gap-1.5 px-3 py-2 bg-[#c9a84c] text-white text-xs hover:bg-[#b8943f] transition-colors">
              <span className="material-icons text-sm">add_task</span> Lập biên bản mới
            </button>
          </div>
        </div>

        {saveSuccess && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 flex items-center gap-2 text-sm">
            <span className="material-icons text-base">check_circle</span>
            Đã lưu nháp biên bản kiểm kê thành công.
          </div>
        )}

        {submitted && (
          <div className="bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-[#b8943f] px-4 py-3 flex items-center gap-2 text-sm">
            <span className="material-icons text-base">task_alt</span>
            Biên bản kiểm kê <strong>KK-Q1-2024</strong> đã được nộp và đang chờ phê duyệt từ Quản lý.
          </div>
        )}

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { icon: 'calendar_today', label: 'Tiến độ kỳ kiểm kê', value: '04 / 04 đợt', sub: 'Chu kỳ: 15 ngày/lần', color: 'text-[#c9a84c]', badge: '100% Kế hoạch' },
            { icon: 'tune', label: 'Tỷ lệ sai lệch tồn', value: `${computedItems.filter(i => i.diff !== 0).length}/${computedItems.length} SKU`, sub: 'Mức an toàn · Ngưỡng ≤ 0.85%', color: computedItems.filter(i => i.diff !== 0).length === 0 ? 'text-green-600' : 'text-amber-600', badge: null },
            { icon: 'trending_down', label: 'Tổng giá trị sai lệch', value: `${totalDiff >= 0 ? '+' : ''}${totalDiff.toLocaleString('vi-VN')}₫`, sub: 'Khấu hao rách vải & lỗi mẫu', color: totalDiff < 0 ? 'text-red-600' : 'text-green-600', badge: submitted ? null : 'Chờ duyệt' },
            { icon: 'warning_amber', label: 'SKU cần cân bằng ngay', value: `${computedItems.filter(i => i.diff !== 0).length} SKU`, sub: 'Yêu cầu đối soát vật lý', color: 'text-amber-600', badge: computedItems.filter(i => i.diff !== 0).length > 0 ? 'Khẩn cấp' : null },
          ].map(k => (
            <div key={k.label} className="bg-white border border-[#e9e8e6] p-4">
              <div className="flex items-start justify-between mb-2">
                <span className={`material-icons text-xl ${k.color}`}>{k.icon}</span>
                {k.badge && <span className={`text-[9px] px-1.5 py-0.5 font-medium ${k.badge === 'Khẩn cấp' ? 'bg-red-50 text-red-600' : k.badge === 'Chờ duyệt' ? 'bg-amber-50 text-amber-600' : 'bg-green-50 text-green-700'}`}>{k.badge}</span>}
              </div>
              <p className={`font-serif text-lg font-semibold ${k.color}`}>{k.value}</p>
              <p className="text-[10px] text-[#aaa] mt-1">{k.label}</p>
            </div>
          ))}
        </div>

        {/* Session info */}
        <div className="bg-[#1c1b1b] p-4 flex items-center gap-6 flex-wrap">
          <div>
            <p className="text-[10px] text-[#747878]">Mã biên bản</p>
            <p className="text-sm font-mono font-semibold text-[#c9a84c]">KK-Q1-2024</p>
          </div>
          <div>
            <p className="text-[10px] text-[#747878]">Trạng thái</p>
            <p className="text-sm text-amber-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              {submitted ? 'Chờ phê duyệt' : 'Đang kiểm kê thực tế'}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-[#747878]">Kho trực thuộc</p>
            <p className="text-sm text-white flex items-center gap-1"><span className="material-icons text-sm">warehouse</span> Kho Củ Chi SOC</p>
          </div>
          <div>
            <p className="text-[10px] text-[#747878]">Người kiểm kê</p>
            <p className="text-sm text-white">Lê Minh Tuấn — Thủ kho</p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-[#e9e8e6] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#f4f3f1] bg-[#faf9f7]">
                  {['Mã SKU', 'Tên sản phẩm', 'Màu / Size', 'Tồn hệ thống', 'Kiểm kê thực tế', 'Chênh lệch', 'Giá trị sai lệch', 'Trạng thái'].map(h => (
                    <th key={h} className="px-3 py-3 text-left text-[10px] uppercase tracking-wider text-[#747878] font-medium whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {computedItems.map(item => (
                  <tr key={item.sku} className={`border-b border-[#f4f3f1] hover:bg-[#faf9f7] transition-colors ${item.status === 'Chênh lệch' ? 'bg-amber-50/30' : ''}`}>
                    <td className="px-3 py-3 font-mono font-medium text-[#c9a84c]">{item.sku}</td>
                    <td className="px-3 py-3 font-medium text-[#1c1b1b] max-w-36 truncate">{item.name}</td>
                    <td className="px-3 py-3 text-[#747878]">{item.color} · {item.size}</td>
                    <td className="px-3 py-3 font-semibold">{item.systemQty}</td>
                    <td className="px-3 py-3">
                      <input
                        type="number"
                        value={item.editQty}
                        onChange={e => updateQty(item.sku, Number(e.target.value))}
                        disabled={submitted}
                        className="w-16 border border-[#e9e8e6] px-2 py-1 text-xs outline-none focus:border-[#c9a84c] disabled:bg-[#f4f3f1] disabled:cursor-not-allowed"
                      />
                    </td>
                    <td className="px-3 py-3">
                      <span className={`font-semibold ${item.diff > 0 ? 'text-green-600' : item.diff < 0 ? 'text-red-600' : 'text-[#747878]'}`}>
                        {item.diff > 0 ? '+' : ''}{item.diff}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      {item.diff !== 0 ? (
                        <span className={`font-semibold ${item.diff > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {item.diff > 0 ? '+' : ''}{(item.diff * item.value).toLocaleString('vi-VN')}₫
                        </span>
                      ) : <span className="text-[#c4c7c7]">—</span>}
                    </td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${item.status === 'Khớp' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-600'}`}>{item.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-[#faf9f7] border-t border-[#e9e8e6]">
                  <td colSpan={6} className="px-3 py-3 font-semibold text-right text-xs">Tổng giá trị sai lệch:</td>
                  <td className={`px-3 py-3 font-bold ${totalDiff < 0 ? 'text-red-600' : 'text-green-600'}`}>{totalDiff >= 0 ? '+' : ''}{totalDiff.toLocaleString('vi-VN')}₫</td>
                  <td />
                </tr>
              </tfoot>
            </table>
          </div>
          {!submitted && (
            <div className="p-4 flex justify-end gap-2 border-t border-[#f4f3f1]">
              <button onClick={handleSaveDraft} className="px-4 py-2 border border-[#e9e8e6] text-xs text-[#747878] hover:border-[#1c1b1b] transition-colors flex items-center gap-1">
                <span className="material-icons text-sm">save</span> Lưu nháp
              </button>
              <button onClick={() => setShowSubmitModal(true)} className="px-4 py-2 bg-[#c9a84c] text-white text-xs hover:bg-[#b8943f] transition-colors flex items-center gap-1">
                <span className="material-icons text-sm">task_alt</span> Nộp biên bản kiểm kê
              </button>
            </div>
          )}
        </div>
      </div>

      {/* New session modal */}
      {showNewModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowNewModal(false)}>
          <div className="bg-white max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
            <h3 className="font-serif text-lg mb-1">Lập biên bản kiểm kê mới</h3>
            <p className="text-xs text-[#747878] mb-4">Tạo đợt kiểm kê mới cho kỳ hiện tại</p>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#747878] mb-1 block">Tên đợt kiểm kê</label>
                <input defaultValue="KK-Q2-2024" className="w-full border border-[#e9e8e6] px-3 py-2 text-sm outline-none focus:border-[#c9a84c]" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#747878] mb-1 block">Ngày bắt đầu</label>
                <input type="date" defaultValue={new Date().toISOString().slice(0, 10)} className="w-full border border-[#e9e8e6] px-3 py-2 text-sm outline-none focus:border-[#c9a84c]" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#747878] mb-1 block">Người phụ trách</label>
                <select className="w-full border border-[#e9e8e6] px-3 py-2 text-sm outline-none focus:border-[#c9a84c] bg-white">
                  <option>Lê Minh Tuấn — Thủ kho</option>
                  <option>Trần Thị Lan — Quản lý</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => { setShowNewModal(false); setSubmitted(false); setSaveSuccess(false); }} className="flex-1 py-2.5 bg-[#c9a84c] text-white text-xs tracking-wider hover:bg-[#b8943f] transition-colors">Tạo biên bản</button>
              <button onClick={() => setShowNewModal(false)} className="px-4 py-2.5 border border-[#e9e8e6] text-xs">Hủy</button>
            </div>
          </div>
        </div>
      )}

      {/* Submit confirmation modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowSubmitModal(false)}>
          <div className="bg-white max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <span className="material-icons text-amber-500 text-2xl">warning_amber</span>
              <h3 className="font-serif text-lg">Xác nhận nộp biên bản</h3>
            </div>
            <p className="text-sm text-[#444748] mb-2">Bạn sắp nộp biên bản kiểm kê <strong>KK-Q1-2024</strong>.</p>
            <div className="bg-[#f4f3f1] px-3 py-2 text-xs mb-4 space-y-1">
              <p>• <strong>{computedItems.filter(i => i.diff !== 0).length} SKU</strong> có chênh lệch tồn kho</p>
              <p>• Tổng giá trị sai lệch: <strong className={totalDiff < 0 ? 'text-red-600' : 'text-green-600'}>{totalDiff.toLocaleString('vi-VN')}₫</strong></p>
              <p>• Biên bản sẽ được gửi đến Quản lý để phê duyệt</p>
              <p>• Dữ liệu sẽ được khóa sau khi nộp</p>
            </div>
            <div className="flex gap-3">
              <button onClick={handleSubmit} className="flex-1 py-2.5 bg-[#1c1b1b] text-white text-xs tracking-wider hover:bg-[#333] transition-colors">Xác nhận nộp</button>
              <button onClick={() => setShowSubmitModal(false)} className="px-4 py-2.5 border border-[#e9e8e6] text-xs">Hủy</button>
            </div>
          </div>
        </div>
      )}

      {/* History modal */}
      {historyOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setHistoryOpen(false)}>
          <div className="bg-white max-w-2xl w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-lg">Lịch sử biên bản kiểm kê</h3>
              <button onClick={() => setHistoryOpen(false)}><span className="material-icons text-[#747878]">close</span></button>
            </div>
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#f4f3f1] bg-[#faf9f7]">
                  {['Mã biên bản', 'Ngày', 'SKU chênh', 'Giá trị sai lệch', 'Trạng thái'].map(h => (
                    <th key={h} className="px-3 py-2.5 text-left text-[10px] uppercase tracking-wider text-[#747878] font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 'KK-Q4-2023', date: '15/12/2023', skuDiff: 2, value: -2100000, status: 'Đã duyệt' },
                  { id: 'KK-Q3-2023', date: '30/09/2023', skuDiff: 0, value: 0, status: 'Đã duyệt' },
                  { id: 'KK-Q2-2023', date: '30/06/2023', skuDiff: 5, value: -8900000, status: 'Đã duyệt' },
                ].map(r => (
                  <tr key={r.id} className="border-b border-[#f4f3f1] hover:bg-[#faf9f7]">
                    <td className="px-3 py-2.5 font-mono text-[#c9a84c]">{r.id}</td>
                    <td className="px-3 py-2.5 text-[#747878]">{r.date}</td>
                    <td className="px-3 py-2.5">{r.skuDiff} SKU</td>
                    <td className={`px-3 py-2.5 font-semibold ${r.value < 0 ? 'text-red-600' : 'text-green-600'}`}>{r.value.toLocaleString('vi-VN')}₫</td>
                    <td className="px-3 py-2.5"><span className="px-2 py-0.5 rounded-full text-[10px] bg-green-50 text-green-700">{r.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
