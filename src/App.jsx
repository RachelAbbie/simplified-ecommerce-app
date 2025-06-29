import { useState } from "react";
import Sidebar from "./components/Sidebar";

export default function App() {
  const [page, setPage] = useState("home");

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar page={page} setPage={setPage} />
      <main className="flex-1 p-4">
        {page === "home" && (
          <div>
            <p className="text-gray-700">Product list will go here.</p>
          </div>
        )}
        {page === "cart" && (
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Cart</h1>
            <p className="text-gray-700">Your cart is empty.</p>
          </div>
        )}
      </main>
    </div>
  );
}