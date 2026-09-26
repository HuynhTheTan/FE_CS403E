import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

const suppliers = ['Công ty TNHH Dệt May Phú Thịnh', 'Nhà máy Sản xuất VT Exclusive', 'Đơn vị gia công Minh Phát', 'Nhập khẩu trực tiếp từ Ý'];
const skuDB = [
  { sku: 'VT-TC-001-L-BE', name: 'Áo Trench Coat Dạ Khâu Tay', size: 'L', color: 'Be', price: 1800000 },
  { sku: 'VT-BL-002-M-XA', name: 'Áo Blazer Dạ Cashmere', size: 'M', color: 'Xám', price: 5200000 },
  { sku: 'VT-DD-003-S-DEN', name: 'Đầm Lụa Satin Cổ Đổ', size: 'S', color: 'Đen', price: 4800000 },
  { sku: 'VT-KN-004-M-BE', name: 'Cardigan Len Merino', size: 'M', color: 'Be', price: 2800000 },
];

type ReceiptItem = { sku: string; name: string; size: string; color: string; qty: number; unitCost: number; note: string };

const pastReceipts = [
  { id: 'GR-2024-018', date: '22/10/2024', supplier: 'Công ty TNHH Dệt May Phú Thịnh', items: 4, totalQty: 120, totalValue: 320000000, status: 'Đã nhập kho' },
  { id: 'GR-2024-017', date: '20/10/2024', supplier: 'Nhà máy Sản xuất VT Exclusive', items: 6, totalQty: 200, totalValue: 890000000, status: 'Đã nhập kho' },
  { id: 'GR-2024-016', date: '18/10/2024', supplier: 'Nhập khẩu trực tiếp từ Ý', items: 2, totalQty: 30, totalValue: 450000000, status: 'Chờ kiểm tra' },
];

const fmt = (n: number) => n.toLocaleString('vi-VN') + '₫';

export default function GoodsReceiptPage() {
  const [showForm, setShowForm] = useState(false);
  const [supplier, setSupplier] = useState('');
  const [receiptDate, setReceiptDate] = useState(new Date().toISOString().slice(0, 10));
  const [items, setItems] = useState<ReceiptItem[]>([]);
  const [skuSearch, setSkuSearch] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const skuResults = skuDB.filter(s =>
    skuSearch.length > 1 && (s.sku.toLowerCase().includes(skuSearch.toLowerCase()) || s.name.toLowerCase().includes(skuSearch.toLowerCase()))
  );

  const addItem = (s: typeof skuDB[0]) => {
    if (!items.find(i => i.sku === s.sku)) {
      setItems(prev => [...prev, { sku: s.sku, name: s.name, size: s.size, color: s.color, qty: 1, unitCost: s.price, note: '' }]);
    }
    setSkuSearch('');
  };

  const updateItem = (sku: string, field: keyof ReceiptItem, val: string | number) => {
    setItems(prev => prev.map(i => i.sku === sku ? { ...i, [field]: val } : i));
  };

  const removeItem = (sku: string) => setItems(prev => prev.filter(i => i.sku !== sku));
  const totalValue = items.reduce((s, i) => s + i.qty * i.unitCost, 0);
  const totalQty = items.reduce((s, i) => s + i.qty, 0);

  const handleSubmit = () => {
    setSubmitted(true);
    setShowForm(false);
    setItems([]);
    setSupplier('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <AdminLayout title="Phiếu nhập kho">
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="font-serif text-xl text-[#1c1b1b]">Phiếu Nhập Kho</h2>
            <p className="text-xs text-[#747878] mt-0.5">Tiếp nhận hàng từ nhà cung cấp, cập nhật tồn kho theo thời gian thực</p>
          </div>
          <button onClick={() => { setShowForm(!showForm); setSubmitted(false); }} className="flex items-center gap-2 px-4 py-2 bg-[#c9a84c] text-white text-xs tracking-wider hover:bg-[#b8943f] transition-colors">
            <span className="material-icons text-sm">{showForm ? 'close' : 'add_box'}</span>
            {showForm ? 'Đóng form' : 'Tạo phiếu nhập mới'}
          </button>
        </div>

        {submitted && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 flex items-center gap-2 text-sm">
            <span className="material-icons text-base">check_circle</span>
            Phiếu nhập kho đã được tạo thành công. Tồn kho đã được cập nhật.
          </div>
        )}

        {/* New receipt form */}
        {showForm && (
          <div className="bg-white border border-[#e9e8e6] p-5 space-y-5">
            <h3 className="text-sm font-semibold text-[#1c1b1b] flex items-center gap-2">
              <span className="material-icons text-[#c9a84c] text-base">inventory_2</span>
              Tạo phiếu nhập kho mới
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#747878] mb-1.5 block">Nhà cung cấp *</label>
                <select value={supplier} onChange={e => setSupplier(e.target.value)} className="w-full border border-[#e9e8e6] px-3 py-2 text-sm outline-none focus:border-[#c9a84c] bg-white">
                  <option value="">Chọn nhà cung cấp</option>
                  {suppliers.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#747878] mb-1.5 block">Ngày nhập *</label>
                <input type="date" value={receiptDate} onChange={e => setReceiptDate(e.target.value)} className="w-full border border-[#e9e8e6] px-3 py-2 text-sm outline-none focus:border-[#c9a84c]" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#747878] mb-1.5 block">Số hóa đơn NCC</label>
                <input className="w-full border border-[#e9e8e6] px-3 py-2 text-sm outline-none focus:border-[#c9a84c]" placeholder="Ví dụ: INV-2024-1234" />
              </div>
            </div>

            {/* SKU lookup */}
            <div>
              <label className="text-[10px] uppercase tracking-wider text-[#747878] mb-1.5 block">Tìm SKU để thêm</label>
              <div className="relative">
                <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-[#747878] text-base">search</span>
                <input value={skuSearch} onChange={e => setSkuSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 text-sm border border-[#e9e8e6] outline-none focus:border-[#c9a84c]" placeholder="Nhập mã SKU hoặc tên sản phẩm..." />
              </div>
              {skuResults.length > 0 && (
                <div className="border border-[#e9e8e6] border-t-0 bg-white shadow-sm">
                  {skuResults.map(s => (
                    <button key={s.sku} onClick={() => addItem(s)} className="w-full px-4 py-2.5 text-left flex items-center justify-between hover:bg-[#f4f3f1] text-xs transition-colors">
                      <div>
                        <p className="font-mono font-medium text-[#c9a84c]">{s.sku}</p>
                        <p className="text-[#747878]">{s.name} — Size {s.size} / {s.color}</p>
                      </div>
                      <span className="text-[#1c1b1b] font-semibold">{fmt(s.price)}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Items table */}
            {items.length > 0 && (
              <div className="border border-[#e9e8e6] overflow-hidden">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[#faf9f7] border-b border-[#e9e8e6]">
                      {['Mã SKU', 'Tên sản phẩm', 'Size/Màu', 'Số lượng', 'Đơn giá nhập', 'Thành tiền', 'Ghi chú', ''].map(h => (
                        <th key={h} className="px-3 py-2.5 text-left text-[10px] uppercase tracking-wider text-[#747878] font-medium">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {items.map(item => (
                      <tr key={item.sku} className="border-b border-[#f4f3f1]">
                        <td className="px-3 py-2 font-mono text-[#c9a84c] whitespace-nowrap">{item.sku}</td>
                        <td className="px-3 py-2 max-w-40 truncate">{item.name}</td>
                        <td className="px-3 py-2 text-[#747878]">{item.size} / {item.color}</td>
                        <td className="px-3 py-2">
                          <input type="number" min={1} value={item.qty} onChange={e => updateItem(item.sku, 'qty', Number(e.target.value))} className="w-16 border border-[#e9e8e6] px-2 py-1 text-center outline-none focus:border-[#c9a84c]" />
                        </td>
                        <td className="px-3 py-2">
                          <input type="number" value={item.unitCost} onChange={e => updateItem(item.sku, 'unitCost', Number(e.target.value))} className="w-28 border border-[#e9e8e6] px-2 py-1 outline-none focus:border-[#c9a84c]" />
                        </td>
                        <td className="px-3 py-2 font-semibold whitespace-nowrap">{fmt(item.qty * item.unitCost)}</td>
                        <td className="px-3 py-2"><input value={item.note} onChange={e => updateItem(item.sku, 'note', e.target.value)} className="w-32 border border-[#e9e8e6] px-2 py-1 text-[10px] outline-none focus:border-[#c9a84c]" placeholder="Ghi chú..." /></td>
                        <td className="px-3 py-2"><button onClick={() => removeItem(item.sku)} className="text-[#ba1a1a] hover:text-red-700"><span className="material-icons text-sm">delete</span></button></td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-[#faf9f7] font-semibold">
                      <td colSpan={3} className="px-3 py-2.5 text-right text-xs text-[#747878]">Tổng cộng:</td>
                      <td className="px-3 py-2.5 text-xs">{totalQty} SP</td>
                      <td />
                      <td className="px-3 py-2.5 text-sm text-[#c9a84c]">{fmt(totalValue)}</td>
                      <td colSpan={2} />
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button onClick={handleSubmit} disabled={!supplier || items.length === 0} className="px-6 py-2.5 bg-[#1c1b1b] text-white text-xs tracking-wider hover:bg-[#333] transition-colors disabled:opacity-50">Nhập kho</button>
              <button className="px-6 py-2.5 border border-[#e9e8e6] text-xs text-[#747878] hover:border-[#1c1b1b] transition-colors">Lưu nháp</button>
              <button onClick={() => { setShowForm(false); setItems([]); }} className="px-4 py-2.5 text-xs text-[#747878]">Hủy</button>
            </div>
          </div>
        )}

        {/* Past receipts */}
        <div className="bg-white border border-[#e9e8e6] overflow-hidden">
          <div className="px-4 py-3 border-b border-[#f4f3f1] flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[#1c1b1b]">Lịch sử phiếu nhập</h3>
            <div className="flex gap-2">
              <button className="text-[10px] border border-[#e9e8e6] px-3 py-1.5 text-[#747878] hover:border-[#c9a84c] transition-colors flex items-center gap-1"><span className="material-icons text-xs">download</span> Xuất Excel</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#f4f3f1] bg-[#faf9f7]">
                  {['Mã phiếu', 'Ngày nhập', 'Nhà cung cấp', 'Số SKU', 'Tổng SL', 'Tổng giá trị', 'Trạng thái', 'Thao tác'].map(h => (
                    <th key={h} className="px-3 py-3 text-left text-[10px] uppercase tracking-wider text-[#747878] font-medium whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pastReceipts.map(r => (
                  <tr key={r.id} className="border-b border-[#f4f3f1] hover:bg-[#faf9f7] transition-colors">
                    <td className="px-3 py-3 font-mono font-medium text-[#c9a84c]">{r.id}</td>
                    <td className="px-3 py-3 text-[#747878]">{r.date}</td>
                    <td className="px-3 py-3">{r.supplier}</td>
                    <td className="px-3 py-3">{r.items} SKU</td>
                    <td className="px-3 py-3">{r.totalQty} SP</td>
                    <td className="px-3 py-3 font-semibold">{fmt(r.totalValue)}</td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${r.status === 'Đã nhập kho' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>{r.status}</span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex gap-1">
                        <button className="px-2 py-1 border border-[#e9e8e6] text-[10px] hover:border-[#c9a84c] transition-colors">Xem</button>
                        <button className="px-2 py-1 border border-[#e9e8e6] text-[10px] hover:border-[#c9a84c] transition-colors">In phiếu</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
