import { useState } from "react";
import { CartProvider } from "./contexts/CartContext";
import Sidebar from "./components/Sidebar";
import Cart from "./components/Cart";
import Home from "./pages/Home";


export default function App() {
  const [page, setPage] = useState("home");

  return (
    <CartProvider>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar page={page} setPage={setPage} />
        <main className="flex-1 p-4">
          {page === "home" && <Home />}
          {page === "cart" && <Cart />}
        </main>
      </div>
    </CartProvider>
  );
}