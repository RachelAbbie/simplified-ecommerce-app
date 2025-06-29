import { useCart } from "../contexts/CartContext";
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
    const { cart } = useCart();

    let cartCount = 0;
    for (let i = 0; i < cart.length; i++) {
        cartCount += cart[i].qty;
    }

    return (
        <aside className="hidden sm:block w-48 bg-blue-500 text-white p-6">
            <h1 className="text-xl font-bold mb-8">Shop</h1>
            <nav className="space-y-4">
                <NavLink to="/" end className={({ isActive }) => `w-full block text-left p-2 rounded ${isActive ? "bg-white text-blue-500" : "hover:bg-blue-600"}`}>
                    Home
                </NavLink>
                <NavLink to="/cart" className={({ isActive }) => `w-full block text-left p-2 rounded flex justify-between items-center ${isActive ? "bg-white text-blue-500" : "hover:bg-blue-600"}`}>
                    Cart
                    {cartCount > 0 && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                            {cartCount}
                        </span>
                    )}
                </NavLink>
            </nav>
        </aside>
    );
} 