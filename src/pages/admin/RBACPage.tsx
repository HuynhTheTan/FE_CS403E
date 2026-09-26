import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

type Role = { id: string; name: string; desc: string; staffCount: number; color: string };
type Permission = { module: string; actions: string[] };
type StaffMember = { id: string; name: string; email: string; role: string; lastLogin: string; status: 'Hoạt động' | 'Tạm khóa' };

const roles: Role[] = [
  { id: 'superadmin', name: 'Super Admin', desc: 'Toàn quyền hệ thống', staffCount: 1, color: 'bg-red-100 text-red-700' },
  { id: 'manager', name: 'Quản lý', desc: 'Quản lý đơn hàng, sản phẩm, kho', staffCount: 3, color: 'bg-purple-100 text-purple-700' },
  { id: 'warehouse', name: 'Thủ kho', desc: 'Quản lý tồn kho, nhập hàng', staffCount: 4, color: 'bg-blue-100 text-blue-700' },
  { id: 'cs', name: 'CSKH', desc: 'Xử lý đơn hàng và đổi trả', staffCount: 6, color: 'bg-green-100 text-green-700' },
  { id: 'accounting', name: 'Kế toán', desc: 'Đối soát, doanh thu, cước phí', staffCount: 2, color: 'bg-amber-100 text-amber-700' },
];

const modules: Permission[] = [
  { module: 'Dashboard', actions: ['Xem'] },
  { module: 'Đơn hàng', actions: ['Xem', 'Tạo', 'Sửa', 'Hủy', 'In'] },
  { module: 'Sản phẩm & SKU', actions: ['Xem', 'Tạo', 'Sửa', 'Xóa'] },
  { module: 'Kho & Nhập hàng', actions: ['Xem', 'Tạo phiếu', 'Xuất kho', 'Kiểm kê'] },
  { module: 'Đổi trả', actions: ['Xem', 'Duyệt', 'Từ chối', 'Hoàn tiền'] },
  { module: 'Khuyến mãi', actions: ['Xem', 'Tạo', 'Sửa', 'Xóa'] },
  { module: 'Tài chính & Doanh thu', actions: ['Xem', 'Xuất báo cáo'] },
  { module: 'VietQR & Thanh toán', actions: ['Xem', 'Đối soát', 'Hoàn tiền'] },
  { module: 'Vận chuyển 3PL', actions: ['Xem', 'Đối soát cước'] },
  { module: 'Phân quyền RBAC', actions: ['Xem', 'Tạo vai trò', 'Phân quyền'] },
];

const permsMatrix: Record<string, Record<string, string[]>> = {
  superadmin: Object.fromEntries(modules.map(m => [m.module, [...m.actions]])),
  manager: {
    'Dashboard': ['Xem'], 'Đơn hàng': ['Xem', 'Tạo', 'Sửa', 'In'], 'Sản phẩm & SKU': ['Xem', 'Tạo', 'Sửa'],
    'Kho & Nhập hàng': ['Xem', 'Tạo phiếu', 'Kiểm kê'], 'Đổi trả': ['Xem', 'Duyệt', 'Từ chối'],
    'Khuyến mãi': ['Xem', 'Tạo', 'Sửa'], 'Tài chính & Doanh thu': ['Xem', 'Xuất báo cáo'],
    'VietQR & Thanh toán': ['Xem', 'Đối soát'], 'Vận chuyển 3PL': ['Xem', 'Đối soát cước'], 'Phân quyền RBAC': ['Xem'],
  },
  warehouse: {
    'Dashboard': ['Xem'], 'Đơn hàng': ['Xem'], 'Sản phẩm & SKU': ['Xem'],
    'Kho & Nhập hàng': ['Xem', 'Tạo phiếu', 'Xuất kho', 'Kiểm kê'], 'Đổi trả': ['Xem'],
    'Khuyến mãi': [], 'Tài chính & Doanh thu': [], 'VietQR & Thanh toán': [], 'Vận chuyển 3PL': ['Xem'], 'Phân quyền RBAC': [],
  },
  cs: {
    'Dashboard': ['Xem'], 'Đơn hàng': ['Xem', 'Tạo', 'In'], 'Sản phẩm & SKU': ['Xem'],
    'Kho & Nhập hàng': ['Xem'], 'Đổi trả': ['Xem', 'Duyệt', 'Từ chối'],
    'Khuyến mãi': ['Xem'], 'Tài chính & Doanh thu': [], 'VietQR & Thanh toán': ['Xem'], 'Vận chuyển 3PL': ['Xem'], 'Phân quyền RBAC': [],
  },
  accounting: {
    'Dashboard': ['Xem'], 'Đơn hàng': ['Xem', 'In'], 'Sản phẩm & SKU': ['Xem'],
    'Kho & Nhập hàng': ['Xem'], 'Đổi trả': ['Xem', 'Hoàn tiền'],
    'Khuyến mãi': ['Xem'], 'Tài chính & Doanh thu': ['Xem', 'Xuất báo cáo'],
    'VietQR & Thanh toán': ['Xem', 'Đối soát', 'Hoàn tiền'], 'Vận chuyển 3PL': ['Xem', 'Đối soát cước'], 'Phân quyền RBAC': [],
  },
};

const staff: StaffMember[] = [
  { id: '1', name: 'Nguyễn Văn Admin', email: 'admin@vtstore.vn', role: 'superadmin', lastLogin: 'Hôm nay 14:32', status: 'Hoạt động' },
  { id: '2', name: 'Trần Thị Lan', email: 'lan.tran@vtstore.vn', role: 'manager', lastLogin: 'Hôm nay 11:15', status: 'Hoạt động' },
  { id: '3', name: 'Lê Minh Tuấn', email: 'm.tuan@vtstore.vn', role: 'warehouse', lastLogin: 'Hôm qua 16:40', status: 'Hoạt động' },
  { id: '4', name: 'Phạm Thu Hà', email: 'thu.ha@vtstore.vn', role: 'cs', lastLogin: 'Hôm nay 09:05', status: 'Hoạt động' },
  { id: '5', name: 'Vũ Kế Toán', email: 'ketoan@vtstore.vn', role: 'accounting', lastLogin: '3 ngày trước', status: 'Tạm khóa' },
];

export default function RBACPage() {
  const [activeTab, setActiveTab] = useState('Nhân sự');
  const [selectedRole, setSelectedRole] = useState('manager');
  const [perms, setPerms] = useState(permsMatrix);

  const togglePerm = (role: string, mod: string, action: string) => {
    setPerms(prev => {
      const cur = prev[role]?.[mod] || [];
      const next = cur.includes(action) ? cur.filter(a => a !== action) : [...cur, action];
      return { ...prev, [role]: { ...prev[role], [mod]: next } };
    });
  };

  return (
    <AdminLayout title="Phân quyền RBAC">
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="font-serif text-xl text-[#1c1b1b]">Phân quyền RBAC</h2>
            <p className="text-xs text-[#747878] mt-0.5">Quản lý vai trò và quyền truy cập hệ thống cho từng nhân viên</p>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-2 bg-[#c9a84c] text-white text-xs hover:bg-[#b8943f] transition-colors">
            <span className="material-icons text-sm">person_add</span> Thêm nhân viên
          </button>
        </div>

        {/* Role pills */}
        <div className="flex gap-2 flex-wrap">
          {roles.map(r => (
            <div key={r.id} className="bg-white border border-[#e9e8e6] px-4 py-2.5 flex items-center gap-2">
              <span className={`text-[10px] font-bold px-1.5 py-0.5 ${r.color}`}>{r.name}</span>
              <span className="text-xs text-[#747878]">{r.desc}</span>
              <span className="text-[10px] text-[#c9a84c] font-semibold">{r.staffCount} người</span>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1">
          {['Nhân sự', 'Ma trận quyền'].map(t => (
            <button key={t} onClick={() => setActiveTab(t)} className={`px-3 py-1.5 text-xs border transition-colors ${activeTab === t ? 'bg-[#1c1b1b] text-white border-[#1c1b1b]' : 'border-[#e9e8e6] bg-white text-[#747878] hover:border-[#1c1b1b]'}`}>{t}</button>
          ))}
        </div>

        {activeTab === 'Nhân sự' && (
          <div className="bg-white border border-[#e9e8e6] overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#f4f3f1] bg-[#faf9f7]">
                  {['Nhân viên', 'Email', 'Vai trò', 'Đăng nhập lần cuối', 'Trạng thái', 'Thao tác'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-[10px] uppercase tracking-wider text-[#747878] font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {staff.map(s => {
                  const role = roles.find(r => r.id === s.role);
                  return (
                    <tr key={s.id} className="border-b border-[#f4f3f1] hover:bg-[#faf9f7] transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-[#e9e8e6] flex items-center justify-center text-[10px] font-bold text-[#747878]">{s.name.charAt(0)}</div>
                          <span className="font-medium">{s.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[#747878] font-mono">{s.email}</td>
                      <td className="px-4 py-3">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 ${role?.color}`}>{role?.name}</span>
                      </td>
                      <td className="px-4 py-3 text-[#747878]">{s.lastLogin}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${s.status === 'Hoạt động' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>{s.status}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <button className="px-2 py-1 border border-[#e9e8e6] text-[10px] hover:border-[#c9a84c] transition-colors">Sửa</button>
                          <button className="px-2 py-1 border border-[#e9e8e6] text-[10px] hover:border-[#ba1a1a] hover:text-[#ba1a1a] transition-colors">{s.status === 'Hoạt động' ? 'Khóa' : 'Mở khóa'}</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'Ma trận quyền' && (
          <div className="space-y-3">
            <div className="flex gap-2 flex-wrap">
              {roles.map(r => (
                <button key={r.id} onClick={() => setSelectedRole(r.id)} className={`px-3 py-1.5 text-xs border transition-colors ${selectedRole === r.id ? 'bg-[#1c1b1b] text-white border-[#1c1b1b]' : 'border-[#e9e8e6] bg-white text-[#747878] hover:border-[#1c1b1b]'}`}>
                  {r.name}
                </button>
              ))}
            </div>
            <div className="bg-white border border-[#e9e8e6] overflow-hidden">
              <div className="px-4 py-2.5 border-b border-[#f4f3f1] bg-[#faf9f7] flex items-center justify-between">
                <h4 className="text-xs font-semibold">Quyền của: <span className={`px-1.5 py-0.5 text-[10px] font-bold ${roles.find(r => r.id === selectedRole)?.color}`}>{roles.find(r => r.id === selectedRole)?.name}</span></h4>
                <button className="text-xs text-[#c9a84c] hover:underline">Lưu thay đổi</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-[#f4f3f1]">
                      <th className="px-4 py-2.5 text-left text-[10px] uppercase tracking-wider text-[#747878] font-medium w-44">Phân hệ</th>
                      {['Xem', 'Tạo', 'Sửa', 'Xóa', 'Duyệt', 'Từ chối', 'Hoàn tiền', 'Xuất kho', 'Kiểm kê', 'Tạo phiếu', 'In', 'Hủy', 'Đối soát', 'Đối soát cước', 'Tạo vai trò', 'Phân quyền', 'Xuất báo cáo'].map(a => (
                        <th key={a} className="px-2 py-2.5 text-[10px] text-[#747878] font-medium whitespace-nowrap text-center">{a}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {modules.map(m => (
                      <tr key={m.module} className="border-b border-[#f4f3f1] hover:bg-[#faf9f7]">
                        <td className="px-4 py-2.5 font-medium text-[#1c1b1b] whitespace-nowrap">{m.module}</td>
                        {['Xem', 'Tạo', 'Sửa', 'Xóa', 'Duyệt', 'Từ chối', 'Hoàn tiền', 'Xuất kho', 'Kiểm kê', 'Tạo phiếu', 'In', 'Hủy', 'Đối soát', 'Đối soát cước', 'Tạo vai trò', 'Phân quyền', 'Xuất báo cáo'].map(action => {
                          const available = m.actions.includes(action);
                          const granted = available && (perms[selectedRole]?.[m.module] || []).includes(action);
                          const isSuperAdmin = selectedRole === 'superadmin';
                          return (
                            <td key={action} className="px-2 py-2.5 text-center">
                              {available ? (
                                <button
                                  onClick={() => !isSuperAdmin && togglePerm(selectedRole, m.module, action)}
                                  className={`w-5 h-5 flex items-center justify-center mx-auto border transition-colors ${granted ? (isSuperAdmin ? 'bg-[#c9a84c] border-[#c9a84c] cursor-default' : 'bg-[#1c1b1b] border-[#1c1b1b] cursor-pointer') : (isSuperAdmin ? 'cursor-default border-[#e9e8e6]' : 'border-[#e9e8e6] hover:border-[#1c1b1b] cursor-pointer')}`}
                                >
                                  {granted && <span className="material-icons text-white text-[10px]">check</span>}
                                </button>
                              ) : <span className="text-[#e9e8e6]">—</span>}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
