import AdminLayout from '../../components/AdminLayout';

const monthlyData = [
  { month: 'T4', revenue: 980, profit: 245 },
  { month: 'T5', revenue: 1120, profit: 302 },
  { month: 'T6', revenue: 890, profit: 198 },
  { month: 'T7', revenue: 1350, profit: 378 },
  { month: 'T8', revenue: 1280, profit: 345 },
  { month: 'T9', revenue: 1640, profit: 492 },
  { month: 'T10', revenue: 1280, profit: 368 },
];

const maxRevenue = Math.max(...monthlyData.map(d => d.revenue));

const topProducts = [
  { name: 'Áo Trench Coat Dạ Khâu Tay', revenue: '284.350.000₫', qty: 68, margin: '34%' },
  { name: 'Đầm Lụa Satin Cổ Đổ Haute Couture', revenue: '241.150.000₫', qty: 35, margin: '41%' },
  { name: 'Túi Xách Da Bê Structured Baguette', revenue: '207.000.000₫', qty: 18, margin: '55%' },
  { name: 'Áo Blazer Dạ Cashmere', revenue: '169.000.000₫', qty: 20, margin: '38%' },
  { name: 'Cardigan Len Lông Cừu Merino', revenue: '126.000.000₫', qty: 30, margin: '29%' },
];

export default function RevenuePage() {
  return (
    <AdminLayout title="Doanh thu & Lợi nhuận">
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="font-serif text-xl text-[#1c1b1b]">Doanh thu &amp; Lợi nhuận</h2>
            <p className="text-xs text-[#747878] mt-0.5">Tháng 10/2024 — Báo cáo tài chính</p>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-2 border border-[#e9e8e6] bg-white text-xs hover:border-[#c9a84c] transition-colors">
            <span className="material-icons text-sm text-[#c9a84c]">download</span> Xuất báo cáo
          </button>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: 'Doanh thu tháng', value: '1.280.400.000₫', change: '+12.4%', icon: 'trending_up' },
            { label: 'Lợi nhuận gộp', value: '368.000.000₫', change: '+8.2%', icon: 'savings' },
            { label: 'Biên lợi nhuận', value: '28.7%', change: '-1.2%', icon: 'percent' },
            { label: 'Tổng đơn thành công', value: '342 đơn', change: '+8.1%', icon: 'check_circle' },
          ].map(k => (
            <div key={k.label} className="bg-white border border-[#e9e8e6] p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="material-icons text-[#c9a84c] text-xl">{k.icon}</span>
                <span className={`text-xs font-medium ${k.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{k.change}</span>
              </div>
              <p className="font-serif text-lg font-semibold text-[#1c1b1b]">{k.value}</p>
              <p className="text-[10px] text-[#aaa] mt-0.5">{k.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Chart */}
          <div className="lg:col-span-2 bg-white border border-[#e9e8e6] p-5">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-sm font-semibold text-[#1c1b1b]">Doanh thu &amp; Lợi nhuận 7 tháng</h3>
              <div className="flex gap-3 text-[10px]">
                <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 bg-[#c9a84c]" /><span className="text-[#747878]">Doanh thu</span></div>
                <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 bg-[#1c1b1b]" /><span className="text-[#747878]">Lợi nhuận</span></div>
              </div>
            </div>
            <div className="flex items-end gap-3 h-48">
              {monthlyData.map(d => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex items-end gap-0.5 justify-center" style={{height: '160px'}}>
                    <div className="flex-1 bg-[#c9a84c] rounded-sm transition-all" style={{height: `${(d.revenue / maxRevenue) * 100}%`}} />
                    <div className="flex-1 bg-[#1c1b1b] rounded-sm transition-all" style={{height: `${(d.profit / maxRevenue) * 100}%`}} />
                  </div>
                  <span className="text-[10px] text-[#747878]">{d.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Category breakdown */}
          <div className="bg-white border border-[#e9e8e6] p-5">
            <h3 className="text-sm font-semibold text-[#1c1b1b] mb-4">Phân tích theo danh mục</h3>
            {[
              { cat: 'Áo khoác & Blazer', pct: 38, revenue: '486.552.000₫' },
              { cat: 'Đầm & Váy cao cấp', pct: 26, revenue: '332.904.000₫' },
              { cat: 'Phụ kiện da', pct: 18, revenue: '230.472.000₫' },
              { cat: 'Dệt kim cao cấp', pct: 12, revenue: '153.648.000₫' },
              { cat: 'Quần tây', pct: 6, revenue: '76.824.000₫' },
            ].map(c => (
              <div key={c.cat} className="mb-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-[#747878]">{c.cat}</span>
                  <span className="font-medium text-[#1c1b1b]">{c.pct}%</span>
                </div>
                <div className="h-1.5 bg-[#e9e8e6] rounded-full overflow-hidden">
                  <div className="h-full bg-[#c9a84c] rounded-full" style={{width: `${c.pct}%`}} />
                </div>
                <p className="text-[10px] text-[#747878] mt-0.5">{c.revenue}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Top products */}
        <div className="bg-white border border-[#e9e8e6]">
          <div className="p-4 border-b border-[#f4f3f1]">
            <h3 className="text-sm font-semibold text-[#1c1b1b]">Top Sản Phẩm Doanh Thu Cao Nhất</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#f4f3f1] bg-[#faf9f7]">
                  {['#', 'Sản phẩm', 'Doanh thu', 'Số lượng', 'Biên lợi nhuận'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-[10px] uppercase tracking-wider text-[#747878] font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {topProducts.map((p, i) => (
                  <tr key={i} className="border-b border-[#f4f3f1] hover:bg-[#faf9f7] transition-colors">
                    <td className="px-4 py-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${i === 0 ? 'bg-[#c9a84c] text-white' : i === 1 ? 'bg-[#e8d5a3] text-[#1c1b1b]' : 'bg-[#e9e8e6] text-[#747878]'}`}>{i + 1}</div>
                    </td>
                    <td className="px-4 py-3 font-medium text-[#1c1b1b]">{p.name}</td>
                    <td className="px-4 py-3 font-semibold text-[#1c1b1b]">{p.revenue}</td>
                    <td className="px-4 py-3 text-[#747878]">{p.qty} SP</td>
                    <td className="px-4 py-3">
                      <span className="text-green-700 font-semibold">{p.margin}</span>
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
