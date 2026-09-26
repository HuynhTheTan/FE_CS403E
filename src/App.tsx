import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Storefront pages
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CollectionsPage from './pages/CollectionsPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import OrdersPage from './pages/OrdersPage';
import WishlistPage from './pages/WishlistPage';

// Admin pages
import DashboardPage from './pages/admin/DashboardPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import ProductsPage from './pages/admin/ProductsPage';
import StockCountPage from './pages/admin/StockCountPage';
import PromotionsPage from './pages/admin/PromotionsPage';
import RevenuePage from './pages/admin/RevenuePage';
import VietQRPage from './pages/admin/VietQRPage';
import ReturnsPage from './pages/admin/ReturnsPage';
import CategoryTreePage from './pages/admin/CategoryTreePage';
import GoodsReceiptPage from './pages/admin/GoodsReceiptPage';
import ShippingPage from './pages/admin/ShippingPage';
import RBACPage from './pages/admin/RBACPage';
import PickingPage from './pages/admin/PickingPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Storefront */}
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/new-arrivals" element={<ProductListPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />

        {/* Admin back-office */}
        <Route path="/admin" element={<DashboardPage />} />
        <Route path="/admin/orders" element={<AdminOrdersPage />} />
        <Route path="/admin/vietqr" element={<VietQRPage />} />
        <Route path="/admin/returns" element={<ReturnsPage />} />
        <Route path="/admin/categories" element={<CategoryTreePage />} />
        <Route path="/admin/products" element={<ProductsPage />} />
        <Route path="/admin/picking" element={<PickingPage />} />
        <Route path="/admin/goods-receipt" element={<GoodsReceiptPage />} />
        <Route path="/admin/stockcount" element={<StockCountPage />} />
        <Route path="/admin/revenue" element={<RevenuePage />} />
        <Route path="/admin/shipping" element={<ShippingPage />} />
        <Route path="/admin/rbac" element={<RBACPage />} />
        <Route path="/admin/promotions" element={<PromotionsPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}