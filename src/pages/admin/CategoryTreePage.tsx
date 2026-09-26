import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

type Category = { id: string; name: string; slug: string; count: number; children?: Category[] };

const initialTree: Category[] = [
  {
    id: '1', name: 'Áo', slug: 'ao', count: 145, children: [
      { id: '1-1', name: 'Áo sơ mi & Blouse', slug: 'ao-so-mi', count: 48 },
      { id: '1-2', name: 'Áo khoác & Blazer', slug: 'ao-khoac', count: 62, children: [
        { id: '1-2-1', name: 'Trench Coat', slug: 'trench-coat', count: 18 },
        { id: '1-2-2', name: 'Blazer cao cấp', slug: 'blazer', count: 24 },
        { id: '1-2-3', name: 'Vest & Bộ suit', slug: 'vest', count: 20 },
      ]},
      { id: '1-3', name: 'Áo len & Knitwear', slug: 'ao-len', count: 35 },
    ],
  },
  {
    id: '2', name: 'Đầm & Váy', slug: 'dam-vay', count: 98, children: [
      { id: '2-1', name: 'Đầm dạ hội', slug: 'dam-da-hoi', count: 32 },
      { id: '2-2', name: 'Đầm midi & Maxi', slug: 'dam-midi', count: 41 },
      { id: '2-3', name: 'Chân váy', slug: 'chan-vay', count: 25 },
    ],
  },
  {
    id: '3', name: 'Quần', slug: 'quan', count: 56, children: [
      { id: '3-1', name: 'Quần tây cao cấp', slug: 'quan-tay', count: 28 },
      { id: '3-2', name: 'Quần ống rộng', slug: 'quan-ong-rong', count: 18 },
      { id: '3-3', name: 'Shorts & Bermuda', slug: 'shorts', count: 10 },
    ],
  },
  {
    id: '4', name: 'Phụ kiện', slug: 'phu-kien', count: 74, children: [
      { id: '4-1', name: 'Túi xách', slug: 'tui-xach', count: 34 },
      { id: '4-2', name: 'Khăn lụa', slug: 'khan-lua', count: 22 },
      { id: '4-3', name: 'Thắt lưng & Phụ kiện', slug: 'that-lung', count: 18 },
    ],
  },
];

function CategoryNode({ cat, depth = 0, onEdit, onDelete, onAdd }: { cat: Category; depth?: number; onEdit: (c: Category) => void; onDelete: (id: string) => void; onAdd: (parentId: string) => void; }) {
  const [open, setOpen] = useState(depth === 0);
  const hasChildren = cat.children && cat.children.length > 0;

  return (
    <div>
      <div className={`flex items-center gap-2 px-3 py-2 hover:bg-[#f4f3f1] transition-colors group rounded ${depth > 0 ? 'ml-' + (depth * 4) : ''}`} style={{marginLeft: depth * 16}}>
        <button onClick={() => setOpen(!open)} className="w-4 flex-shrink-0">
          {hasChildren ? (
            <span className="material-icons text-sm text-[#747878]">{open ? 'expand_more' : 'chevron_right'}</span>
          ) : <span className="w-4" />}
        </button>
        <span className="material-icons text-sm text-[#c9a84c]">{depth === 0 ? 'folder' : depth === 1 ? 'folder_open' : 'label'}</span>
        <span className="flex-1 text-sm font-medium text-[#1c1b1b]">{cat.name}</span>
        <span className="text-[10px] text-[#747878] font-mono">{cat.slug}</span>
        <span className="text-[10px] bg-[#f4f3f1] text-[#747878] px-1.5 py-0.5 rounded">{cat.count} SP</span>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => onAdd(cat.id)} title="Thêm danh mục con" className="w-6 h-6 flex items-center justify-center hover:text-[#c9a84c] transition-colors"><span className="material-icons text-sm">add</span></button>
          <button onClick={() => onEdit(cat)} title="Sửa" className="w-6 h-6 flex items-center justify-center hover:text-[#c9a84c] transition-colors"><span className="material-icons text-sm">edit</span></button>
          <button onClick={() => onDelete(cat.id)} title="Xóa" className="w-6 h-6 flex items-center justify-center hover:text-[#ba1a1a] transition-colors"><span className="material-icons text-sm">delete</span></button>
        </div>
      </div>
      {open && hasChildren && cat.children!.map(child => (
        <CategoryNode key={child.id} cat={child} depth={depth + 1} onEdit={onEdit} onDelete={onDelete} onAdd={onAdd} />
      ))}
    </div>
  );
}

export default function CategoryTreePage() {
  const [tree, setTree] = useState(initialTree);
  const [editCat, setEditCat] = useState<Category | null>(null);
  const [addParentId, setAddParentId] = useState<string | null>(null);
  const [newName, setNewName] = useState('');
  const [newSlug, setNewSlug] = useState('');

  const handleDelete = (id: string) => {
    const removeById = (cats: Category[]): Category[] =>
      cats.filter(c => c.id !== id).map(c => ({ ...c, children: c.children ? removeById(c.children) : undefined }));
    setTree(removeById(tree));
  };

  const handleSave = () => {
    if (editCat) {
      const update = (cats: Category[]): Category[] =>
        cats.map(c => c.id === editCat.id ? { ...c, name: newName, slug: newSlug } : { ...c, children: c.children ? update(c.children) : undefined });
      setTree(update(tree));
      setEditCat(null);
    } else if (addParentId) {
      const newCat: Category = { id: `new-${Date.now()}`, name: newName, slug: newSlug, count: 0 };
      const addTo = (cats: Category[]): Category[] =>
        cats.map(c => c.id === addParentId ? { ...c, children: [...(c.children || []), newCat] } : { ...c, children: c.children ? addTo(c.children) : undefined });
      setTree(addParentId === 'root' ? [...tree, newCat] : addTo(tree));
      setAddParentId(null);
    }
    setNewName(''); setNewSlug('');
  };

  return (
    <AdminLayout title="Cây danh mục">
      <div className="max-w-5xl mx-auto space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="font-serif text-xl text-[#1c1b1b]">Cây Danh Mục Sản Phẩm</h2>
            <p className="text-xs text-[#747878] mt-0.5">Quản lý cấu trúc phân cấp danh mục và bộ sưu tập</p>
          </div>
          <button onClick={() => { setAddParentId('root'); setNewName(''); setNewSlug(''); }} className="flex items-center gap-1.5 px-3 py-2 bg-[#c9a84c] text-white text-xs hover:bg-[#b8943f] transition-colors">
            <span className="material-icons text-sm">add</span> Thêm danh mục gốc
          </button>
        </div>

        <div className="bg-white border border-[#e9e8e6] p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] text-[#747878]">Tổng: <strong>{tree.length} danh mục gốc</strong>, {tree.reduce((s, c) => s + (c.children?.length || 0), 0)} danh mục con</p>
            <div className="relative">
              <span className="material-icons absolute left-2 top-1/2 -translate-y-1/2 text-[#747878] text-sm">search</span>
              <input className="pl-7 pr-3 py-1.5 text-xs border border-[#e9e8e6] outline-none focus:border-[#c9a84c] w-48" placeholder="Tìm danh mục..." />
            </div>
          </div>
          <div className="border border-[#f4f3f1] rounded">
            {tree.map(cat => (
              <CategoryNode key={cat.id} cat={cat} onEdit={(c) => { setEditCat(c); setNewName(c.name); setNewSlug(c.slug); }} onDelete={handleDelete} onAdd={(parentId) => { setAddParentId(parentId); setNewName(''); setNewSlug(''); }} />
            ))}
          </div>
        </div>
      </div>

      {/* Edit/Add modal */}
      {(editCat || addParentId) && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => { setEditCat(null); setAddParentId(null); }}>
          <div className="bg-white max-w-sm w-full p-6" onClick={e => e.stopPropagation()}>
            <h3 className="font-serif text-lg mb-4">{editCat ? 'Sửa danh mục' : 'Thêm danh mục mới'}</h3>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#747878] mb-1 block">Tên danh mục</label>
                <input value={newName} onChange={e => { setNewName(e.target.value); setNewSlug(e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')); }} className="w-full border border-[#e9e8e6] px-3 py-2 text-sm outline-none focus:border-[#c9a84c]" placeholder="Ví dụ: Áo khoác cao cấp" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#747878] mb-1 block">Slug URL</label>
                <input value={newSlug} onChange={e => setNewSlug(e.target.value)} className="w-full border border-[#e9e8e6] px-3 py-2 text-sm outline-none focus:border-[#c9a84c] font-mono" placeholder="ao-khoac-cao-cap" />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={handleSave} disabled={!newName} className="flex-1 py-2.5 bg-[#c9a84c] text-white text-xs tracking-wider hover:bg-[#b8943f] transition-colors disabled:opacity-50">Lưu</button>
              <button onClick={() => { setEditCat(null); setAddParentId(null); }} className="px-4 py-2.5 border border-[#e9e8e6] text-xs">Hủy</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
