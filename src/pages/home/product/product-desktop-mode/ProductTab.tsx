"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import ProductReview from "../ProductReview";
import ProductDesktopComments from "./ProductDesktopComments";
import ProductSpecificationDesktop from "./ProductSpecificationDesktop";
import SelectedProduct from "./SelectedProduct";
const tabs = [
  {
    id: uuid(),
    label: " مشخصات محصول",
    value: "specification",
  },
  {
    id: uuid(),
    label: " نقد و بررسی",
    value: "review",
  },
  {
    id: uuid(),
    label: "نظرات کاربران",
    value: "comments",
  },
];

export default function ProductTab() {
  const [tabActive, setActiveTab] = useState("specification");
  return (
    <div className=" w-full ">
      <Tabs defaultValue="specification" style={{ direction: "rtl" }}>
        <div className="flex items-stretch gap-2">
          <TabsList className="bg-tint-blue-100 w-full flex items-center gap-2  ">
            {tabs.map((tab) => (
              <TabsTrigger
                onClick={() => setActiveTab(tab.value)}
                key={tab.id}
                value={tab.value}
                className="text-tint-blue-500 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-tint-blue-500 w-fit rounded-none py-3"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <SelectedProduct tabActive={tabActive} />
        </div>

        <TabsContent value="specification">
          <ProductSpecificationDesktop />
        </TabsContent>

        <TabsContent value="review">
          <ProductReview />
        </TabsContent>

        <TabsContent value="comments">
          <ProductDesktopComments />
        </TabsContent>
      </Tabs>
    </div>
  );
}
