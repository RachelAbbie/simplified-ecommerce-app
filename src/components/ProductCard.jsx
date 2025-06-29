import { useState, useCallback } from "react";

export default function ProductCard({ product, onAdd }) {
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (isNaN(value) || value < 1) {
            setQuantity(1);
        } else {
            setQuantity(value);
        }
    };

    const handleAddToCart = useCallback(() => {
        onAdd(product, quantity);
        setQuantity(1);
    }, [onAdd, product, quantity]);

    return (
        <div className="bg-white border border-gray-200 rounded flex flex-col h-full min-h-[370px] items-center">
            <div className="flex-1 flex flex-col justify-between">
                <div className="p-2 flex flex-col items-center">
                    <div className="flex justify-center mb-4 mt-4">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="h-32 object-contain"
                        />
                    </div>
                    <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 min-h-[48px]">
                        {product.title}
                    </h3>
                    <div className="text-lg font-bold text-gray-900 mb-4">
                        ${product.price.toFixed(2)}
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                        <label className="text-sm text-gray-600">Quantity:</label>
                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={handleQuantityChange}
                            className="w-16 border border-gray-300 rounded px-2 py-1 text-center"
                        />
                    </div>
                </div>
            </div>
            <button
                onClick={handleAddToCart}
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mt-auto"
            >
                Add to Cart
            </button>
        </div>
    );
}
