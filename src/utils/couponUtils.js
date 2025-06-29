const COUPON_CODE = "SAVE10";
const COUPON_DISCOUNT = 0.1; // 10%
const COUPON_MIN_PRICE = 100;
const COUPON_MAX_DISCOUNT = 50;

export function getItemDiscount(item, coupon) {
    if (coupon === COUPON_CODE && item.price >= COUPON_MIN_PRICE) {
        const perUnitDiscount = Math.min(item.price * COUPON_DISCOUNT, COUPON_MAX_DISCOUNT);
        return perUnitDiscount * item.qty;
    }
    return 0;
}
