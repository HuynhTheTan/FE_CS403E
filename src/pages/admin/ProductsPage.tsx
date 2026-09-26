import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

const products = [
  { sku: 'VT-BLZ-01', name: 'Áo Blazer Lụa Cao Cấp', color: 'Đen tuyền', size: 'S', barcode: '8938507123001', listPrice: 1850000, salePrice: 1480000, stock: 45, reorder: 10, status: 'Đang bán' },
  { sku: 'VT-BLZ-09', name: 'Tailored Silk-Wool Single Blazer', color: 'Charcoal Black', size: 'M', barcode: '8938507123009', listPrice: 4850000, salePrice: 3890000, stock: 8, reorder: 5, status: 'Đang bán' },
  { sku: 'VT-SKR-04', name: 'Chân Váy Midi Xếp Ly', color: 'Be sáng', size: 'M', barcode: '8938507123040', listPrice: 950000, salePrice: 950000, stock: 23, reorder: 10, status: 'Đang bán' },
  { sku: 'VT-KNI-09', name: 'Áo Len Cashmere Cổ Lọ', color: 'Trắng kem', size: 'M', barcode: '8938507123090', listPrice: 1200000, salePrice: 1200000, stock: 3, reorder: 10, status: 'Sắp hết' },
  { sku: 'VT-DRS-03', name: 'Đầm Lụa Satin Cổ Đổ', color: 'Đen Noir', size: 'XS', barcode: '8938507123030', listPrice: 6890000, salePrice: 6890000, stock: 0, reorder: 5, status: 'Hết hàng' },
];

const colors = ['Đen Huyền (Black)', 'Trắng Sữa (Ivory)', 'Be Sáng (Beige)', 'Xám Than (Charcoal)'];
const sizes = ['S (Small)', 'M (Medium)', 'L (Large)', 'XL (Extra Large)'];
const fmt = (n: number) => n.toLocaleString('vi-VN') + '₫';

export default function ProductsPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <AdminLayout title="Sản phẩm & SKU">
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="font-serif text-xl text-[#1c1b1b]">Sản phẩm &amp; SKU</h2>
            <p className="text-xs text-[#747878] mt-0.5">Quản lý biến thể sản phẩm, giá bán và tồn kho</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 px-3 py-2 border border-[#e9e8e6] bg-white text-xs hover:border-[#c9a84c] transition-colors">
              <span className="material-icons text-sm text-[#c9a84c]">download</span> Xuất Excel
            </button>
            <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-1.5 px-3 py-2 bg-[#c9a84c] text-white text-xs hover:bg-[#b8943f] transition-colors">
              <span className="material-icons text-sm">add</span> Thêm SKU mới
            </button>
          </div>
        </div>

        {/* Add SKU form */}
        {showForm && (
          <div className="bg-white border border-[#c9a84c44] p-5">
            <h3 className="text-sm font-semibold text-[#1c1b1b] mb-1">Thêm / Cập nhật Biến thể SKU</h3>
            <p className="text-xs text-[#747878] mb-4">Thiết lập thông tin định danh, giá bán và định mức tồn kho cho biến thể sản phẩm thời trang cao cấp.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { label: 'Mã SKU', placeholder: 'VT-XXX-00', hint: 'Mã định danh duy nhất trong kho hàng' },
                { label: 'Tên sản phẩm', placeholder: 'Nhập tên sản phẩm...', hint: null },
                { label: 'Mã vạch (Barcode / UPC)', placeholder: '8938507XXXXXX', hint: null },
                { label: 'Giá niêm yết (VNĐ)', placeholder: '0', hint: null },
                { label: 'Giá bán thực tế (VNĐ)', placeholder: '0', hint: null },
                { label: 'Định mức tái đặt hàng', placeholder: '10', hint: null },
              ].map(f => (
                <div key={f.label}>
                  <label className="text-[10px] uppercase tracking-wider text-[#747878] mb-1.5 block">{f.label}</label>
                  <input placeholder={f.placeholder} className="w-full border border-[#e9e8e6] px-3 py-2 text-xs outline-none focus:border-[#c9a84c]" />
                  {f.hint && <p className="text-[10px] text-[#747878] mt-0.5">{f.hint}</p>}
                </div>
              ))}
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#747878] mb-1.5 block">Màu sắc</label>
                <select className="w-full border border-[#e9e8e6] px-3 py-2 text-xs outline-none focus:border-[#c9a84c] bg-white">
                  {colors.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#747878] mb-1.5 block">Kích cỡ (Size)</label>
                <select className="w-full border border-[#e9e8e6] px-3 py-2 text-xs outline-none focus:border-[#c9a84c] bg-white">
                  {sizes.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="px-4 py-2 bg-[#c9a84c] text-white text-xs hover:bg-[#b8943f] transition-colors">Lưu SKU</button>
              <button onClick={() => setShowForm(false)} className="px-4 py-2 border border-[#e9e8e6] text-xs text-[#747878] hover:border-[#1c1b1b] transition-colors">Hủy</button>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="bg-white border border-[#e9e8e6] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#f4f3f1] bg-[#faf9f7]">
                  {['Mã SKU', 'Tên sản phẩm', 'Màu / Size', 'Barcode', 'Giá niêm yết', 'Giá bán', 'Tồn kho', 'Trạng thái', 'Thao tác'].map(h => (
                    <th key={h} className="px-3 py-3 text-left text-[10px] uppercase tracking-wider text-[#747878] font-medium whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.sku} className="border-b border-[#f4f3f1] hover:bg-[#faf9f7] transition-colors">
                    <td className="px-3 py-3 font-mono font-medium text-[#c9a84c]">{p.sku}</td>
                    <td className="px-3 py-3 font-medium text-[#1c1b1b] max-w-40 truncate">{p.name}</td>
                    <td className="px-3 py-3 text-[#747878]">{p.color} · {p.size}</td>
                    <td className="px-3 py-3 font-mono text-[#747878]">{p.barcode}</td>
                    <td className="px-3 py-3 text-[#747878] line-through">{fmt(p.listPrice)}</td>
                    <td className="px-3 py-3 font-semibold text-[#1c1b1b]">{fmt(p.salePrice)}</td>
                    <td className="px-3 py-3">
                      <span className={`font-semibold ${p.stock === 0 ? 'text-[#ba1a1a]' : p.stock <= p.reorder ? 'text-amber-600' : 'text-green-700'}`}>{p.stock}</span>
                      <span className="text-[#c4c7c7] ml-1">/ min {p.reorder}</span>
                    </td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${p.status === 'Đang bán' ? 'bg-green-50 text-green-700' : p.status === 'Sắp hết' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'}`}>{p.status}</span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex gap-1">
                        <button className="w-7 h-7 border border-[#e9e8e6] flex items-center justify-center hover:border-[#c9a84c] transition-colors"><span className="material-icons text-sm text-[#747878]">edit</span></button>
                        <button className="w-7 h-7 border border-[#e9e8e6] flex items-center justify-center hover:border-[#ba1a1a] hover:text-[#ba1a1a] transition-colors"><span className="material-icons text-sm text-[#747878]">delete</span></button>
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
