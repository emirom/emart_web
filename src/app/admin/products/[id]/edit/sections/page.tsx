"use client";

import { SectionFormType } from "@/libs/types/sections";
import { useParams } from "next/navigation";
import React from "react";
import DynamicSectionsEditor from "@components/sections/DynamicSectionsEditor";

const AddExpertReviewProductPage: React.FC = () => {
  const params = useParams();
  const productId = (params?.id as string) || "";

  const initialSections = [
    {
      id: "1",
      title: "بررسی اجمالی",
      content:
        "<p>این محصول یکی از بهترین محصولات موجود در بازار است که با کیفیت بالا و قیمت مناسب ارائه شده است.</p>",
    },
    {
      id: "2",
      title: "ویژگی‌های کلیدی",
      content:
        "<ul><li>کیفیت عالی مواد اولیه</li><li>طراحی زیبا و کاربردی</li><li>دسترسی آسان به قطعات</li></ul>",
    },
  ];

  const handleSubmit = (data: { sections: SectionFormType[] }) => {
    console.log("Submitted sections:", data.sections);
    alert("بررسی تخصصی با موفقیت ذخیره شد!");
  };

  return (
    <div className="container mx-auto px-4 py-8" dir="rtl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          افزودن بررسی تخصصی محصول
        </h1>
        <p className="text-gray-600 mt-2">شماره محصول: {productId}</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <DynamicSectionsEditor
          initialSections={initialSections}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default AddExpertReviewProductPage;
