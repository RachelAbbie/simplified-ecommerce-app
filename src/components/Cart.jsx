import { useCart } from "../contexts/CartContext";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, subtotal, grandTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Cart</h1>
        <p className="text-gray-700">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Cart</h1>
      <div className="space-y-4">
        {cart.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded border">
            <div className="flex items-center gap-4">
              <img src={item.image} alt={item.title} className="h-16 w-16 object-contain" />
              <div className="flex-1">
                <h3 className="font-bold">{item.title}</h3>
                <p className="text-gray-600">${item.price.toFixed(2)} each</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="bg-gray-200 px-2 py-1 rounded"
                  onClick={() => updateQuantity(item.id, Math.max(1, item.qty - 1))}
                >
                  -
                </button>
                <span className="px-2">{item.qty}</span>
                <button
                  className="bg-gray-200 px-2 py-1 rounded"
                  onClick={() => updateQuantity(item.id, item.qty + 1)}
                >
                  +
                </button>
              </div>
              <div className="text-right">
                <div className="font-bold">${(item.price * item.qty).toFixed(2)}</div>
                <button
                  className="text-red-500 text-sm"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="bg-white p-4 rounded border">
          <div className="flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>
          <button className="w-full bg-blue-500 text-white p-2 rounded mt-2 hover:bg-blue-600">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
