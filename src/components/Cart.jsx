import { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { NavLink } from 'react-router-dom';

const Cart = () => {
    const {
        cart,
        removeFromCart,
        updateQuantity,
        coupon,
        setCoupon,
        getItemDiscount,
        subtotal,
        totalDiscount,
        grandTotal,
    } = useCart();

    const [couponInput, setCouponInput] = useState(coupon || "");
    const [couponMessage, setCouponMessage] = useState("");
    const [couponStatus, setCouponStatus] = useState(null);

    const handleApplyCoupon = (e) => {
        console.log('Coupon Input >>> ', couponInput)
        e.preventDefault();
        setCoupon(couponInput.trim());
        // Validate coupon
        if (couponInput.trim().toUpperCase() === "SAVE10") {
            setCouponMessage("Coupon applied");
            setCouponStatus("valid");
        } else {
            setCouponMessage("Invalid coupon code");
            setCouponStatus("invalid");
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4">
            <NavLink to="/" className="sm:hidden mb-4 text-blue-500 underline">
                Back to Home
            </NavLink>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">My Cart</h1>

            {cart.length === 0 ? (
                <div className="text-center py-16 text-gray-500">
                    Your cart is empty.
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Cart Items */}
                    <div className="space-y-4">
                        {cart.map((item) => {
                            const itemDiscount = getItemDiscount(item, coupon);
                            return (
                                <div
                                    key={item.id}
                                    className="bg-white border border-gray-200 p-4 rounded"
                                >
                                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 items-center">
                                        {/* Product Image */}
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-16 h-16 object-contain border border-gray-200 rounded justify-self-center"
                                        />

                                        {/* Product Title and Price */}
                                        <div>
                                            <h3 className="font-medium text-gray-900">{item.title}</h3>
                                            <p className="text-gray-500 text-sm">${item.price.toFixed(2)}</p>
                                        </div>

                                        {/* Quantity Field (Control quantity) */}
                                        <div className="flex items-center gap-2 justify-self-center">
                                            <button
                                                onClick={() => {
                                                    if (item.qty > 1) {
                                                        updateQuantity(item.id, item.qty - 1);
                                                    } else {
                                                        removeFromCart(item.id);
                                                    }
                                                }}
                                                className="w-8 h-8 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                                            >
                                                -
                                            </button>
                                            <span className="px-3 text-gray-700">{item.qty}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.qty + 1)}
                                                className="w-8 h-8 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                                            >
                                                +
                                            </button>
                                        </div>

                                        {/* Total Price with discount */}
                                        <div className={`flex flex-col ${itemDiscount > 0 ? "justify-start" : "justify-center"} items-center min-h-[48px] min-w-[90px] text-center`}>
                                            {/* Total price after discount */}
                                            <div className="font-bold text-gray-900">
                                                ${(item.price * item.qty - itemDiscount).toFixed(2)}
                                            </div>
                                            {/* Discount display if applicable */}
                                            {itemDiscount > 0 && (
                                                <div className="text-sm text-green-600">
                                                    -${itemDiscount.toFixed(2)} discount
                                                </div>
                                            )}
                                        </div>

                                        {/* Remove item from the cart/remove button */}
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-red-500 hover:text-red-700 text-sm justify-self-center"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>

                            );
                        })}
                    </div>

                    {/* Coupon Section */}
                    <div className="bg-white border border-gray-200 p-4 rounded">
                        <h3 className="font-medium text-gray-900 mb-2">Coupon Code</h3>
                        <form onSubmit={handleApplyCoupon} className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Enter coupon code"
                                value={couponInput}
                                onChange={(e) => {
                                    setCouponInput(e.target.value);
                                    setCouponMessage("");
                                    setCouponStatus(null);
                                }}
                                className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                            />
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Apply
                            </button>
                        </form>
                        {couponStatus === "valid" && (<div className="mt-2 text-green-600 text-sm">{couponMessage}</div>)}
                        {couponStatus === "invalid" && (<div className="mt-2 text-red-600 text-sm">{couponMessage}</div>)}
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white border border-gray-200 p-4 rounded">
                        <h3 className="font-medium text-gray-900 mb-4">Order Summary</h3>
                        <div className="space-y-2">
                            {/* Subtotal */}
                            <div className="flex justify-between">
                                <span className="text-gray-600">Subtotal:</span>
                                <span className="text-gray-900">${subtotal.toFixed(2)}</span>
                            </div>
                            {/* Discount if applicable */}
                            {totalDiscount > 0 && (
                                <div className="flex justify-between">
                                    <span className="text-green-600">Discount:</span>
                                    <span className="text-green-600">
                                        -${totalDiscount.toFixed(2)}
                                    </span>
                                </div>
                            )}
                            {/* Grand Total */}
                            <div className="flex justify-between border-t pt-2">
                                <span className="font-bold text-gray-900">Total:</span>
                                <span className="font-bold text-gray-900">
                                    ${grandTotal.toFixed(2)}
                                </span>
                            </div>
                        </div>
                        {/* Checkout Button */}
                        <button className="w-full bg-blue-500 text-white py-3 rounded mt-4 hover:bg-blue-600">
                            Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;

