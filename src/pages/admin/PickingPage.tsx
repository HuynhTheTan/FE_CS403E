import React, { useState } from 'react'
import AdminLayout from '../../components/AdminLayout'

interface PickingBatch {
  id: string
  code: string
  createdDate: string
  picker: string
  totalOrders: number
  totalItems: number
  status: 'pending' | 'picking' | 'packed' | 'handed_over'
  zone: string
}

const mockBatches: PickingBatch[] = [
  {
    id: '1',
    code: 'BATCH-20260923-01',
    createdDate: '23/09/2026 08:30',
    picker: 'Trần Văn Kho',
    totalOrders: 12,
    totalItems: 28,
    status: 'picking',
    zone: 'Khu A - Quần Áo Nam',
  },
  {
    id: '2',
    code: 'BATCH-20260923-02',
    createdDate: '23/09/2026 09:15',
    picker: 'Lê Minh Hùng',
    totalOrders: 8,
    totalItems: 15,
    status: 'packed',
    zone: 'Khu B - Giày Dép',
  },
  {
    id: '3',
    code: 'BATCH-20260923-03',
    createdDate: '23/09/2026 10:00',
    picker: 'Chưa phân công',
    totalOrders: 15,
    totalItems: 34,
    status: 'pending',
    zone: 'Khu C - Phụ Kiện',
  },
  {
    id: '4',
    code: 'BATCH-20260922-09',
    createdDate: '22/09/2026 16:45',
    picker: 'Nguyễn Tấn Đạt',
    totalOrders: 20,
    totalItems: 42,
    status: 'handed_over',
    zone: 'Toàn sàn',
  },
]

export default function PickingPage() {
  const [batches, setBatches] = useState<PickingBatch[]>(mockBatches)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const getStatusBadge = (status: PickingBatch['status']) => {
    switch (status) {
      case 'pending':
        return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">Chờ soạn hàng</span>
      case 'picking':
        return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">Đang lấy hàng</span>
      case 'packed':
        return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200">Đã đóng gói</span>
      case 'handed_over':
        return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">Đã bàn giao 3PL</span>
    }
  }

  const filteredBatches = batches.filter((b) => {
    const matchesFilter = filterStatus === 'all' || b.status === filterStatus
    const matchesSearch = b.code.toLowerCase().includes(searchTerm.toLowerCase()) || b.picker.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <AdminLayout title="Xử lý & Đóng gói">
      <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
        {/* Tiêu đề & Nút hành động */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Xử lý & Đóng gói đơn hàng</h1>
            <p className="text-sm text-neutral-500 mt-1">Điều phối lấy hàng theo đợt (Batch Picking), kiểm soát đóng gói kiện và xuất phiếu bàn giao vận chuyển.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => alert('Đang tạo đợt lấy hàng mới từ các đơn đang chờ xử lý...')}
              className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-sm font-medium transition shadow-sm cursor-pointer"
            >
              + Tạo đợt lấy hàng
            </button>
          </div>
        </div>

        {/* Thẻ thống kê nhanh */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-white rounded-xl border border-neutral-200/80 shadow-xs">
            <div className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Chờ soạn hàng</div>
            <div className="text-2xl font-semibold text-neutral-900 mt-2">15 đơn hàng</div>
            <div className="text-xs text-amber-600 mt-1">1 đợt chưa phân công</div>
          </div>
          <div className="p-4 bg-white rounded-xl border border-neutral-200/80 shadow-xs">
            <div className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Đang lấy hàng</div>
            <div className="text-2xl font-semibold text-neutral-900 mt-2">28 sản phẩm</div>
            <div className="text-xs text-blue-600 mt-1">1 nhân viên đang thực hiện</div>
          </div>
          <div className="p-4 bg-white rounded-xl border border-neutral-200/80 shadow-xs">
            <div className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Đã đóng kiện</div>
            <div className="text-2xl font-semibold text-neutral-900 mt-2">8 kiện hàng</div>
            <div className="text-xs text-purple-600 mt-1">Sẵn sàng bàn giao cho bưu tá</div>
          </div>
          <div className="p-4 bg-white rounded-xl border border-neutral-200/80 shadow-xs">
            <div className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Hoàn tất hôm nay</div>
            <div className="text-2xl font-semibold text-emerald-600 mt-2">42 đơn</div>
            <div className="text-xs text-neutral-500 mt-1">Tỉ lệ đúng hẹn 98.5%</div>
          </div>
        </div>

        {/* Thanh lọc & Tìm kiếm */}
        <div className="bg-white rounded-xl border border-neutral-200/80 p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
            {['all', 'pending', 'picking', 'packed', 'handed_over'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer whitespace-nowrap ${
                  filterStatus === status
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                {status === 'all' && 'Tất cả'}
                {status === 'pending' && 'Chờ soạn'}
                {status === 'picking' && 'Đang lấy'}
                {status === 'packed' && 'Đã đóng gói'}
                {status === 'handed_over' && 'Đã bàn giao'}
              </button>
            ))}
          </div>

          <div className="w-full md:w-72">
            <input
              type="text"
              placeholder="Tìm mã đợt hoặc nhân viên..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3.5 py-1.5 text-sm border border-neutral-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-900"
            />
          </div>
        </div>

        {/* Bảng danh sách */}
        <div className="bg-white rounded-xl border border-neutral-200/80 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-neutral-50/75 border-b border-neutral-200 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Mã đợt</th>
                  <th className="py-3 px-4">Thời gian tạo</th>
                  <th className="py-3 px-4">Khu vực kho</th>
                  <th className="py-3 px-4 text-center">Số đơn</th>
                  <th className="py-3 px-4 text-center">Tổng SL</th>
                  <th className="py-3 px-4">Người phụ trách</th>
                  <th className="py-3 px-4">Trạng thái</th>
                  <th className="py-3 px-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {filteredBatches.map((item) => (
                  <tr key={item.id} className="hover:bg-neutral-50/50 transition">
                    <td className="py-3.5 px-4 font-mono font-medium text-neutral-900">{item.code}</td>
                    <td className="py-3.5 px-4 text-neutral-500 text-xs">{item.createdDate}</td>
                    <td className="py-3.5 px-4 text-neutral-700">{item.zone}</td>
                    <td className="py-3.5 px-4 text-center font-medium">{item.totalOrders}</td>
                    <td className="py-3.5 px-4 text-center text-neutral-600">{item.totalItems}</td>
                    <td className="py-3.5 px-4 text-neutral-700">{item.picker}</td>
                    <td className="py-3.5 px-4">{getStatusBadge(item.status)}</td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        onClick={() => alert(`Xem danh sách chi tiết mã hàng của đợt ${item.code}`)}
                        className="px-2.5 py-1 text-xs font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition cursor-pointer"
                      >
                        Chi tiết
                      </button>
                      <button
                        onClick={() => alert(`Đang chuẩn bị lệnh in phiếu soạn hàng & packing slip cho ${item.code}`)}
                        className="px-2.5 py-1 text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition cursor-pointer"
                      >
                        In phiếu
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}