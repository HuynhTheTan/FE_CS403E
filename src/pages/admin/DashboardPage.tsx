import AdminLayout from '../../components/AdminLayout';

const kpis = [
  { icon: 'payments', label: 'Doanh Thu Ngày / Tháng', value: '48.250.000₫', sub: 'Tháng: 1.280.400.000₫', change: '+12.4%', positive: true },
  { icon: 'orders', label: 'Tổng Đơn Hàng', value: '342 đơn', sub: 'Đang xử lý: 28', change: '+8.1%', positive: true },
  { icon: 'sync_alt', label: 'Tỷ Lệ Đổi Trả', value: '1.8%', sub: '6 đơn yêu cầu đổi', change: '-0.4%', positive: true },
  { icon: 'shopping_cart', label: 'Giá Trị Trung Bình (AOV)', value: '1.410.000₫', sub: 'Tối ưu giỏ hàng', change: '+3.5%', positive: true },
];

const chartBars = [
  { day: 'T2', value: 38, pct: 76 },
  { day: 'T3', value: 42, pct: 84 },
  { day: 'T4', value: 35, pct: 70 },
  { day: 'T5', value: 50, pct: 100 },
  { day: 'T6', value: 44, pct: 88 },
  { day: 'T7', value: 48, pct: 96 },
  { day: 'CN', value: 41, pct: 82 },
];

const recentOrders = [
  { id: '#VT-98241', customer: 'Trần Minh Thư', items: 2, amount: '6.040.000₫', status: 'Đang giao', statusColor: 'text-blue-600 bg-blue-50', payment: 'VietQR' },
  { id: '#VT-98242', customer: 'Nguyễn Văn B', items: 1, amount: '1.890.000₫', status: 'Chờ xác nhận', statusColor: 'text-amber-600 bg-amber-50', payment: 'COD' },
  { id: '#VT-98239', customer: 'Hoàng Hải Yến', items: 3, amount: '8.250.000₫', status: 'Đang đóng gói', statusColor: 'text-purple-600 bg-purple-50', payment: 'MoMo' },
  { id: '#VT-98238', customer: 'Lê Thị Thu', items: 1, amount: '4.890.000₫', status: 'Đã giao', statusColor: 'text-green-700 bg-green-50', payment: 'VNPay' },
  { id: '#VT-98237', customer: 'Phạm Quốc Hùng', items: 2, amount: '3.200.000₫', status: 'Đã giao', statusColor: 'text-green-700 bg-green-50', payment: 'COD' },
];

const alerts = [
  { icon: 'pending_actions', label: 'Chờ xác nhận COD', value: '42 đơn', sub: '+12% hôm nay', color: 'text-amber-600', bg: 'bg-amber-50' },
  { icon: 'inventory_2', label: 'Đang xử lý & Đóng gói', value: '128 đơn', sub: 'SLA < 2h giao kho', color: 'text-blue-600', bg: 'bg-blue-50' },
  { icon: 'sync_alt', label: 'Yêu cầu Đổi / Trả', value: '18 phiếu', sub: 'Cần duyệt gấp', color: 'text-red-600', bg: 'bg-red-50' },
  { icon: 'replay', label: 'Chuyển hoàn / Cần hoàn tiền', value: '5 đơn', sub: 'Chờ VietQR Napas', color: 'text-purple-600', bg: 'bg-purple-50' },
];

export default function DashboardPage() {
  return (
    <AdminLayout title="Tổng Quan">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="font-serif text-xl text-[#1c1b1b]">Dashboard Tổng Quan VT Store</h2>
            <p className="text-xs text-[#747878] flex items-center gap-1 mt-0.5">
              <span className="material-icons text-sm">calendar_today</span>
              Hôm nay: 24/10/2023
            </p>
          </div>
          <button className="flex items-center gap-2 px-3 py-2 border border-[#e9e8e6] text-xs bg-white hover:border-[#c9a84c] transition-colors">
            <span className="material-icons text-sm text-[#c9a84c]">download</span>
            Xuất báo cáo
          </button>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {kpis.map(k => (
            <div key={k.label} className="bg-white border border-[#e9e8e6] p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="material-icons text-[#c9a84c] text-xl">{k.icon}</span>
                <span className={`text-xs font-medium ${k.positive ? 'text-green-600' : 'text-red-600'}`}>{k.change}</span>
              </div>
              <p className="font-serif text-xl font-semibold text-[#1c1b1b]">{k.value}</p>
              <p className="text-[10px] text-[#747878] mt-0.5">{k.sub}</p>
              <p className="text-[10px] text-[#aaa] mt-1">{k.label}</p>
            </div>
          ))}
        </div>

        {/* Alerts */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {alerts.map(a => (
            <div key={a.label} className={`${a.bg} border border-opacity-20 p-3 rounded`} style={{borderColor: 'currentColor'}}>
              <div className="flex items-center gap-2 mb-1">
                <span className={`material-icons text-lg ${a.color}`}>{a.icon}</span>
                <p className="text-[10px] text-[#747878]">{a.label}</p>
              </div>
              <p className={`text-base font-bold ${a.color}`}>{a.value}</p>
              <p className="text-[10px] text-[#747878]">{a.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Chart */}
          <div className="lg:col-span-2 bg-white border border-[#e9e8e6] p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-[#1c1b1b]">Biểu Đồ Doanh Thu 7 Ngày Gần Nhất</h3>
                <p className="text-[10px] text-[#747878]">Đơn vị tính: Triệu VNĐ</p>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-[#c9a84c] rounded-sm" /><span className="text-[10px] text-[#747878]">Thực tế</span>
              </div>
            </div>
            <div className="flex items-end gap-2 h-40">
              {chartBars.map(bar => (
                <div key={bar.day} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[10px] text-[#747878]">{bar.value}M</span>
                  <div className="w-full bg-[#f4f3f1] rounded-sm overflow-hidden flex items-end" style={{height: '100px'}}>
                    <div className="w-full bg-[#c9a84c] rounded-sm transition-all" style={{height: `${bar.pct}%`}} />
                  </div>
                  <span className="text-[10px] text-[#747878]">{bar.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick stats */}
          <div className="bg-white border border-[#e9e8e6] p-5">
            <h3 className="text-sm font-semibold text-[#1c1b1b] mb-4">Trạng thái kho</h3>
            {[
              { label: 'Tổng SKU đang bán', value: '1.248', icon: 'inventory_2' },
              { label: 'SKU sắp hết hàng', value: '34', icon: 'warning_amber', alert: true },
              { label: 'Đơn chờ nhặt hàng', value: '128', icon: 'package_2' },
              { label: 'Tồn kho giá trị', value: '4.8 Tỷ', icon: 'account_balance' },
            ].map(s => (
              <div key={s.label} className="flex items-center gap-3 py-2.5 border-b border-[#f4f3f1] last:border-0">
                <span className={`material-icons text-lg ${s.alert ? 'text-amber-500' : 'text-[#c9a84c]'}`}>{s.icon}</span>
                <span className="flex-1 text-xs text-[#747878]">{s.label}</span>
                <span className={`text-sm font-semibold ${s.alert ? 'text-amber-600' : 'text-[#1c1b1b]'}`}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent orders table */}
        <div className="bg-white border border-[#e9e8e6]">
          <div className="flex items-center justify-between p-4 border-b border-[#f4f3f1]">
            <h3 className="text-sm font-semibold text-[#1c1b1b]">Đơn hàng gần nhất</h3>
            <a href="/admin/orders" className="text-xs text-[#c9a84c] hover:underline">Xem tất cả →</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#f4f3f1] bg-[#faf9f7]">
                  {['Mã đơn', 'Khách hàng', 'Sản phẩm', 'Giá trị', 'Thanh toán', 'Trạng thái'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-[10px] uppercase tracking-wider text-[#747878] font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(o => (
                  <tr key={o.id} className="border-b border-[#f4f3f1] hover:bg-[#faf9f7] transition-colors">
                    <td className="px-4 py-3 font-medium text-[#1c1b1b]">{o.id}</td>
                    <td className="px-4 py-3 text-[#444748]">{o.customer}</td>
                    <td className="px-4 py-3 text-[#747878]">{o.items} SP</td>
                    <td className="px-4 py-3 font-semibold text-[#1c1b1b]">{o.amount}</td>
                    <td className="px-4 py-3 text-[#747878]">{o.payment}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${o.statusColor}`}>{o.status}</span>
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
