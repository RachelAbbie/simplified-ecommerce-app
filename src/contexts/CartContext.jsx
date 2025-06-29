import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { getItemDiscount } from "../utils/couponUtils";

const CartContext = createContext();

export function useCart() {
    return useContext(CartContext);
}

export function CartProvider({ children }) {
    
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem("cart");
        return saved ? JSON.parse(saved) : [];
    });
    const [coupon, setCoupon] = useState(() => {
        const saved = localStorage.getItem("coupon");
        return saved ? saved : "";
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem("coupon", coupon);
    }, [coupon]);

    const onAddToCart = useCallback((product, qty = 1) => {
        setCart(prev => {
            const exists = prev.find(item => item.id === product.id);
            if (exists) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, qty: item.qty + qty }
                        : item
                );
            } else {
                return [...prev, { ...product, qty }];
            }
        });
    }, []);

    const updateQuantity = useCallback((productId, qty) => {
        setCart(prev =>
            prev.map(item =>
                item.id === productId ? { ...item, qty } : item
            )
        );
    }, []);

    const removeFromCart = useCallback((productId) => {
        setCart(prev => prev.filter(item => item.id !== productId));
    }, []);

    // Calculate subtotal 
    let subtotal = 0;
    for (let i = 0; i < cart.length; i++) {
        subtotal += cart[i].price * cart[i].qty;
    }

    // Calculate total discount using getItemDiscount 
    let totalDiscount = 0;
    for (let i = 0; i < cart.length; i++) {
        totalDiscount += getItemDiscount(cart[i], coupon);
    }

    let grandTotal = subtotal - totalDiscount;

    const value = {
        cart,
        onAddToCart,
        updateQuantity,
        removeFromCart,
        subtotal,
        totalDiscount,
        grandTotal,
        coupon,
        setCoupon,
        getItemDiscount
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}
