export default async function CustomerUserInfo() {
  return (
    <div className="bg-tint-blue-100 rounded-sm p-3 text-tint-blue-500 w-full md:py-4">
      <div className="flex flex-col gap-2 text-xs font-medium md:gap-3">
        <p className="flex items-center justify-between">
          <span>کاربر عادی</span>
          <span>Erfan safe</span>
        </p>
        <p className="flex items-center justify-between">
          <span>شماره تماس</span>
          <span>۰۹۱۸۱۲۳۴۵۶۷۸</span>
        </p>
        <p className="flex items-center justify-between">
          <span>ایمیل</span>
          <span>Rezahtms@gmail.com</span>
        </p>
      </div>
    </div>
  );
}
