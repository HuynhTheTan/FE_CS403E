import { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

interface Props { children: React.ReactNode; title?: string; }

export default function AdminLayout({ children, title }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#f4f3f1]">
      {/* Mobile overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static z-40 h-full flex transition-transform duration-200`}>
        <AdminSidebar collapsed={collapsed} onCollapse={setCollapsed} />
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Topbar */}
        <header className="bg-white border-b border-[#e9e8e6] h-14 flex items-center px-4 gap-3 flex-shrink-0">
          <button className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <span className="material-icons text-[#747878]">menu</span>
          </button>
          {title && <h1 className="text-sm font-semibold text-[#1c1b1b] truncate">{title}</h1>}
          <div className="ml-auto flex items-center gap-3">
            <div className="relative hidden sm:block">
              <span className="material-icons absolute left-2 top-1/2 -translate-y-1/2 text-[#747878] text-lg">search</span>
              <input className="pl-8 pr-4 py-1.5 text-xs border border-[#e9e8e6] outline-none focus:border-[#c9a84c] w-40 lg:w-56 bg-[#faf9f7]" placeholder="Tìm kiếm..." />
            </div>
            <button className="relative">
              <span className="material-icons text-[#747878] text-xl">notifications</span>
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-[#ba1a1a] text-white text-[8px] rounded-full flex items-center justify-center">5</span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-[#e9e8e6] rounded-full flex items-center justify-center">
                <span className="material-icons text-sm text-[#747878]">person</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-medium text-[#1c1b1b]">Nguyễn Văn Admin</p>
                <p className="text-[10px] text-[#747878]">ADMIN</p>
              </div>
            </div>
            <Link to="/" className="text-[10px] text-[#c9a84c] border border-[#c9a84c44] px-2 py-1 hover:bg-[#c9a84c11] transition-colors hidden sm:block">
              ← Storefront
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
