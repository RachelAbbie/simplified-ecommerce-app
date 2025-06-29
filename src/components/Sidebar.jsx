import { useCart } from "../contexts/CartContext";

export default function Sidebar({ page, setPage }) {
    const { cart } = useCart();

    let cartCount = 0;
    for (let i = 0; i < cart.length; i++) {
        cartCount += cart[i].qty;
    }

    return (
        <aside className="w-48 bg-blue-500 text-white flex flex-col items-center py-8 min-h-screen">
            <div className="text-2xl font-bold mb-8">Shop</div>
            <nav className="flex flex-col gap-4 w-full">
                <button
                    className={`w-full p-2 text-lg rounded ${page === "home" ? "bg-white text-blue-500" : ""}`}
                    onClick={() => setPage("home")}
                >
                    Home
                </button>
                <button
                    className={`w-full p-2 text-lg rounded flex justify-between items-center ${page === "cart" ? "bg-white text-blue-500" : ""}`}
                    onClick={() => setPage("cart")}
                >
                    Cart
                    {cartCount > 0 && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                            {cartCount}
                        </span>
                    )}
                </button>
            </nav>
        </aside>
    );
}