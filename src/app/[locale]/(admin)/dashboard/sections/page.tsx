import React, { use } from "react";
import SectionsForm from "./SectionsForm";

interface SectionsEditorPageProps {
  searchParams: Promise<{
    id?: string;
  }>;
}

const SectionsEditorPage: React.FC<SectionsEditorPageProps> = ({
  searchParams,
}) => {
  const { id = "" } = use(searchParams);
  const productId = id;

  return (
    <div className="container mx-auto px-4 py-8" dir="rtl">
      <div className="mb-8">
        <h1 className=" font-bold text-gray-900">افزودن توضیحات تخصصی محصول</h1>
        <p className="text-gray-600 mt-2">مدیریت بخش‌های توضیحات محصول</p>
      </div>

      <SectionsForm productId={productId} />
    </div>
  );
};

export default SectionsEditorPage;
