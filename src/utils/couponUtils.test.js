import { describe, it, expect } from 'vitest';
import { getItemDiscount } from './couponUtils';

describe('getItemDiscount test', () => {
    it('returns 0 if coupon does not match', () => {
        const item = { price: 150, qty: 2 };
        const discount = getItemDiscount(item, 'SAVE101');

        expect(discount).toBe(0);
    });

    it('returns 0 if item price is below minimum price', () => {
        const item = { price: 80, qty: 3 };
        const discount = getItemDiscount(item, 'SAVE10');

        expect(discount).toBe(0);
    });

    it('calculates 10% discount per unit correctly if within the max discount', () => {
        const item = { price: 200, qty: 2 }; // 10% = 20 per unit
        const discount = getItemDiscount(item, 'SAVE10');

        expect(discount).toBe(40); // 20 * 2 = 40
    });

    it('limit discount at max discount per unit if exceeded', () => {
        const item = { price: 600, qty: 1 }; // 10% = 60, maximum discount amount 50
        const discount = getItemDiscount(item, 'SAVE10');

        expect(discount).toBe(50);
    });

    it('applies capped discount per unit across quantity', () => {
        const item = { price: 600, qty: 3 }; // 10% = 60, maximum discount amount 50, qty = 3
        const discount = getItemDiscount(item, 'SAVE10');

        expect(discount).toBe(150); // 50 * 3 = 150
    });
});
