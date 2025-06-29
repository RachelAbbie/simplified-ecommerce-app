import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { getItemDiscount } from "../utils/couponUtils";
import { addToCart, updateCartQuantity, removeItemFromCart, calculateSubtotal, calculateTotalDiscount } from "../utils/cartUtils";

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

    // add to cart
    const onAddToCart = useCallback((product, qty = 1) => {
        setCart(prev => addToCart(prev, product, qty));
    }, []);

    // update quantity
    const updateQuantity = useCallback((productId, qty) => {
        setCart(prev => updateCartQuantity(prev, productId, qty));
    }, []);

    // remove from cart
    const removeFromCart = useCallback((productId) => {
       setCart(prev => removeItemFromCart(prev, productId));
    }, []);

    // Calculate subtotal 
    const subtotal = calculateSubtotal(cart);

    // Calculate total discount using getItemDiscount 
    const totalDiscount = calculateTotalDiscount(cart, coupon, getItemDiscount);

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
