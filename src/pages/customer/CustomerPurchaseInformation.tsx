export default function CustomerPurchaseInformation() {
  return (
    <div className="flex items-stretch justify-between gap-2 md:gap-10 md:w-fit">
      <div className="flex flex-col justify-center gap-2 items-center text-xs">
        <div className="flex flex-col items-center justify-center gap-2 bg-sky-400 text-white rounded-sm px-4 py-2">
          <span>0</span>
          <span>سفارش</span>
        </div>
        <p className="text-sm text-sky-400">جاری</p>
      </div>
      <div className="flex flex-col justify-center gap-2 items-center text-xs">
        <div className="flex flex-col items-center justify-center gap-2 bg-green-400 text-white rounded-sm px-4 py-2">
          <span>0</span>
          <span>سفارش</span>
        </div>
        <p className="text-sm text-green-400">تحویل شده</p>
      </div>
      <div className="flex flex-col justify-center gap-2 items-center text-xs">
        <div className="flex flex-col items-center justify-center gap-2 bg-warning-light text-white rounded-sm px-4 py-2">
          <span>0</span>
          <span>سفارش</span>
        </div>
        <p className="text-sm text-warning-light">مرجوع شده</p>
      </div>
    </div>
  );
}
