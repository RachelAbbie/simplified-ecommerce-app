// adds a product to the cart or increments its quantity if it exists
export const addToCart = (cart, product, qty = 1) => {
    const productExists = cart.find(item => item.id === product.id);
    if (productExists) {
        return cart.map(item => item.id === product.id ? { ...item, qty: item.qty + qty } : item);
    } else {
        return [...cart, { ...product, qty }];
    }
};

// updates the quantity of product in cart
export const updateCartQuantity = (cart, productId, qty) => {
    return cart.map(item => item.id === productId ? { ...item, qty } : item);
};

// removes product from cart
export const removeItemFromCart = (cart, productId) => {
    return cart.filter(item => item.id !== productId);
};

// calculate subtotal
export const calculateSubtotal = (cart) => {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        total += cart[i].price * cart[i].qty;
    }
    return total;
};


// calculates total discount using getItemDiscount function.
export const calculateTotalDiscount = (cart, coupon, getItemDiscount) => {
    let totalDiscount = 0;
    for (let i = 0; i < cart.length; i++) {
        totalDiscount += getItemDiscount(cart[i], coupon);
    }
    return totalDiscount;
};
