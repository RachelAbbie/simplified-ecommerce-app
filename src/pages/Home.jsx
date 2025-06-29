import { useEffect, useState } from "react";
import { fetchProducts } from "../services/productService";
import ProductGrid from "../components/ProductGrid";

export default function Home({ onAddToCart }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const data = await fetchProducts();
                setProducts(data);
            } catch (err) {
                setError("Error loading products");
            } finally {
                setLoading(false);
            }
        };

        getProducts();
    }, []);

    if (loading) return <div className="text-center p-8 text-gray-700 text-lg">Loading...</div>;
    if (error) return <div className="text-center p-8 text-red-500 text-lg">{error}</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4 text-gray-900">Products</h1>
            <ProductGrid products={products} onAdd={onAddToCart} />
        </div>
    );
}