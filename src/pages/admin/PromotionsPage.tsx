import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

const vouchers = [
  { code: 'VTGOLD15', type: 'Bậc thang', discount: '15%', condition: 'Đơn từ 2.500.000₫', uses: 128, limit: 500, status: 'Đang chạy', expires: '31/12/2024' },
  { code: 'NEWMEMBER10', type: 'Thành viên mới', discount: '10%', condition: 'Lần đầu mua hàng', uses: 45, limit: 100, status: 'Đang chạy', expires: '31/12/2024' },
  { code: 'FREESHIP', type: 'Miễn phí ship', discount: 'Free ship', condition: 'Đơn từ 500.000₫', uses: 892, limit: null, status: 'Đang chạy', expires: '31/12/2024' },
  { code: 'FLASH50K', type: 'Flash sale', discount: '-50.000₫', condition: 'Đơn bất kỳ', uses: 200, limit: 200, status: 'Đã dùng hết', expires: '30/10/2024' },
  { code: 'VIP350K', type: 'VIP Platinum', discount: '-350.000₫', condition: 'Đơn từ 3.000.000₫', uses: 34, limit: 200, status: 'Đang chạy', expires: '31/01/2025' },
];

const tiers = [
  { min: 0, max: 2000000, label: 'Đơn từ 0 – 2 Triệu', discount: '0%' },
  { min: 2000000, max: 2500000, label: 'Đơn từ 2 – 2.5 Triệu', discount: '10%' },
  { min: 2500000, max: 3000000, label: 'Đơn từ 2.5 – 3 Triệu', discount: '15%' },
  { min: 3000000, max: null, label: 'Đơn từ 3 Triệu trở lên', discount: '20% + Free ship' },
];

export default function PromotionsPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <AdminLayout title="Khuyến mãi & Voucher">
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="font-serif text-xl text-[#1c1b1b]">Khuyến mãi &amp; Voucher</h2>
            <p className="text-xs text-[#747878] mt-0.5">Quản lý mã giảm giá và chương trình ưu đãi bậc thang</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-1.5 px-3 py-2 bg-[#c9a84c] text-white text-xs hover:bg-[#b8943f] transition-colors">
            <span className="material-icons text-sm">add</span> Tạo voucher mới
          </button>
        </div>

        {/* Tiered promotions */}
        <div className="bg-white border border-[#e9e8e6] p-5">
          <h3 className="text-sm font-semibold text-[#1c1b1b] mb-4">Khuyến mãi Bậc Thang Tự Động</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {tiers.map((tier, i) => (
              <div key={i} className={`border p-4 ${i === tiers.length - 1 ? 'border-[#c9a84c] bg-[#c9a84c08]' : 'border-[#e9e8e6]'}`}>
                <p className="text-[10px] text-[#747878] mb-1">{tier.label}</p>
                <p className="font-serif text-2xl font-semibold text-[#c9a84c]">{tier.discount}</p>
                {i > 0 && (
                  <div className="mt-2 flex items-center gap-1">
                    <div className="flex-1 h-1 bg-[#c9a84c] rounded-full" />
                    <span className="text-[10px] text-[#c9a84c]">active</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Voucher form */}
        {showForm && (
          <div className="bg-white border border-[#c9a84c44] p-5">
            <h3 className="text-sm font-semibold mb-4">Tạo voucher mới</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { label: 'Mã Voucher', placeholder: 'VT-SUMMER25' },
                { label: 'Loại khuyến mãi', placeholder: null, select: ['Phần trăm (%)', 'Cố định (₫)', 'Miễn phí ship', 'Bậc thang'] },
                { label: 'Giá trị giảm', placeholder: '10' },
                { label: 'Điều kiện tối thiểu (₫)', placeholder: '500000' },
                { label: 'Số lượt sử dụng tối đa', placeholder: '500' },
                { label: 'Ngày hết hạn', placeholder: '31/12/2024' },
              ].map(f => (
                <div key={f.label}>
                  <label className="text-[10px] uppercase tracking-wider text-[#747878] mb-1.5 block">{f.label}</label>
                  {f.select ? (
                    <select className="w-full border border-[#e9e8e6] px-3 py-2 text-xs outline-none focus:border-[#c9a84c] bg-white">
                      {f.select.map(o => <option key={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input placeholder={f.placeholder || ''} className="w-full border border-[#e9e8e6] px-3 py-2 text-xs outline-none focus:border-[#c9a84c]" />
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-4">
              <button className="px-4 py-2 bg-[#c9a84c] text-white text-xs hover:bg-[#b8943f] transition-colors">Tạo Voucher</button>
              <button onClick={() => setShowForm(false)} className="px-4 py-2 border border-[#e9e8e6] text-xs text-[#747878] hover:border-[#1c1b1b] transition-colors">Hủy</button>
            </div>
          </div>
        )}

        {/* Voucher table */}
        <div className="bg-white border border-[#e9e8e6] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#f4f3f1] bg-[#faf9f7]">
                  {['Mã voucher', 'Loại', 'Giảm', 'Điều kiện', 'Đã dùng / Giới hạn', 'Trạng thái', 'Hết hạn', 'Thao tác'].map(h => (
                    <th key={h} className="px-3 py-3 text-left text-[10px] uppercase tracking-wider text-[#747878] font-medium whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {vouchers.map(v => (
                  <tr key={v.code} className="border-b border-[#f4f3f1] hover:bg-[#faf9f7] transition-colors">
                    <td className="px-3 py-3 font-mono font-bold text-[#c9a84c]">{v.code}</td>
                    <td className="px-3 py-3 text-[#747878]">{v.type}</td>
                    <td className="px-3 py-3 font-semibold text-[#1c1b1b]">{v.discount}</td>
                    <td className="px-3 py-3 text-[#747878]">{v.condition}</td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-[#e9e8e6] rounded-full overflow-hidden">
                          <div className="h-full bg-[#c9a84c] rounded-full" style={{width: `${v.limit ? Math.min((v.uses / v.limit) * 100, 100) : 50}%`}} />
                        </div>
                        <span className="text-[#747878]">{v.uses}{v.limit ? `/${v.limit}` : ''}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${v.status === 'Đang chạy' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{v.status}</span>
                    </td>
                    <td className="px-3 py-3 text-[#747878]">{v.expires}</td>
                    <td className="px-3 py-3">
                      <div className="flex gap-1">
                        <button className="w-7 h-7 border border-[#e9e8e6] flex items-center justify-center hover:border-[#c9a84c] transition-colors"><span className="material-icons text-sm text-[#747878]">edit</span></button>
                        <button className="w-7 h-7 border border-[#e9e8e6] flex items-center justify-center hover:border-[#ba1a1a] transition-colors"><span className="material-icons text-sm text-[#747878]">delete</span></button>
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
