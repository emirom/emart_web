export default function ProductDetails() {
  return (
    <ul className="flex flex-col mt-4">
      {Array.from({ length: 5 }, (_, index) => (
        <li
          key={index}
          className="flex justify-between items-center border-dashed border-b last:border-b-0"
        >
          <span className="text-sm py-2">نوع پردازنده - CPU :</span>
          <span className="text-xs font-light">۱۲۸ گیگابایت</span>
        </li>
      ))}
    </ul>
  );
}
