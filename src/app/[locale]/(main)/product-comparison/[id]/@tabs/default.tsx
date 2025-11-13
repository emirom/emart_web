import ProductItem from "@components/ProductItem";

export default function DefaultTabs() {
  return (
    <div className="px-1 py-2 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 15 }, (_, index) => (
        <ProductItem key={index} />
      ))}
    </div>
  );
}
