import ProductCard from "./ProductCard";

export default function ProductGrid({ products, onAdd }) {

  console.log('PRODUCTS >>> ', products)
  const cards = [];
  for (let i = 0; i < products.length; i++) {
    cards.push(
      <ProductCard
        key={products[i].id}
        product={products[i]}
        onAdd={onAdd}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {cards}
    </div>
  );
}
