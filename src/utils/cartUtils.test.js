import { describe, it, expect } from 'vitest';
import { addToCart, updateCartQuantity, removeItemFromCart, calculateSubtotal, calculateTotalDiscount } from './cartUtils';
import { getItemDiscount } from './couponUtils';

describe('cartUtils test', () => {
    it('should add a new product to the cart', () => {
        const cart = [];
        const product = { id: 1, price: 100, qty: 1 };
        const updatedCart = addToCart(cart, product, 2);

        expect(updatedCart).toHaveLength(1);
        expect(updatedCart[0]).toMatchObject({ id: 1, price: 100, qty: 2 });
    });

    it('should increment quantity if product already exists', () => {
        const cart = [{ id: 1, price: 100, qty: 2 }];
        const product = { id: 1, price: 100, qty: 2 };
        const updatedCart = addToCart(cart, product, 3);

        expect(updatedCart).toHaveLength(1);
        expect(updatedCart[0].qty).toBe(5);
    });

    it('should update product quantity', () => {
        const cart = [{ id: 1, price: 50, qty: 2 }];
        const updatedCart = updateCartQuantity(cart, 1, 5);

        expect(updatedCart[0].qty).toBe(5);
    });

    it('should remove a product from the cart', () => {
        const cart = [{ id: 1, price: 50, qty: 2 }];
        const updatedCart = removeItemFromCart(cart, 1);

        expect(updatedCart.length).toBe(0);
    });

    it('should calculate the subtotal correctly', () => {
        const cart = [
            { id: 1, price: 50, qty: 2 },
            { id: 2, price: 30, qty: 1 },
        ];
        const subtotal = calculateSubtotal(cart);

        expect(subtotal).toBe(130);
    });

    it('should calculate the total discount correctly with coupon', () => {
       const cart = [
            { id: 1, price: 200, qty: 1 }, // can use the SAVE10 coupon
            { id: 2, price: 80, qty: 2 },  // cannot use the coupon, doesnt meet the requirements/rule (below 100 per price per item)
        ];
        const coupon = 'SAVE10';

        const discount = calculateTotalDiscount(cart, coupon, getItemDiscount);

        expect(discount).toBe(20);

    });

    it('should return 0 discount if no coupon is applied', () => {
        const cart = [
            { id: 1, price: 100, qty: 2 },
            { id: 2, price: 50, qty: 1 },
        ];
        const totalDiscount = calculateTotalDiscount(cart, '', getItemDiscount);

        expect(totalDiscount).toBe(0);
    });
});
