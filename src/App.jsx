import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from "./contexts/CartContext";
import Sidebar from "./components/Sidebar";
import Cart from "./components/Cart";
import Home from "./pages/Home";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="flex min-h-screen bg-gray-100">
          <Sidebar />
          <main className="flex-1 p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}