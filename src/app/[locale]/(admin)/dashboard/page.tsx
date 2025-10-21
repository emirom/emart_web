export default async function Dashboard() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 100 }).map((_, i) => (
        <div key={i} className="p-4 bg-gray-100 rounded">
          آیتم {i + 1}
        </div>
      ))}
    </div>
  );
}
