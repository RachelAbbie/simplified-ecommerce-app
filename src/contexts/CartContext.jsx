import { createContext, useContext, useState, useCallback } from "react";

const CartContext = createContext();

export function useCart() {
    return useContext(CartContext);
}

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

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

    let subtotal = 0;
    for (let i = 0; i < cart.length; i++) {
        subtotal = subtotal + (cart[i].price * cart[i].qty);
    }

    let totalDiscount = 0; // For future discount logic
    let grandTotal = subtotal - totalDiscount;

    const value = {
        cart,
        onAddToCart,
        updateQuantity,
        removeFromCart,
        subtotal,
        totalDiscount,
        grandTotal,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}
