"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import SectionItem from "@components/sections/SectionItem";

interface SectionFormData {
  id: string;
  title: string;
  content: string;
  leftImageId?: string;
  rightImageId?: string;
}

const SectionsEditorPage: React.FC = () => {
  const [sections, setSections] = useState<SectionFormData[]>([
    {
      id: Date.now().toString(),
      title: "",
      content: "",
    },
  ]);

  const addNewSection = () => {
    const newSection: SectionFormData = {
      id: Date.now().toString(),
      title: "",
      content: "",
    };
    setSections([...sections, newSection]);
  };

  const removeSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const updateSectionTitle = (index: number, title: string) => {
    const updatedSections = [...sections];
    updatedSections[index].title = title;
    setSections(updatedSections);
  };

  const updateSectionContent = (index: number, content: string) => {
    const updatedSections = [...sections];
    updatedSections[index].content = content;
    setSections(updatedSections);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sections data:", sections);
    alert("اطلاعات با موفقیت ذخیره شد!");
  };

  return (
    <div className="container mx-auto px-4 py-8" dir="rtl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          ویرایش بخش‌های توضیحات
        </h1>
        <p className="text-gray-600 mt-2">مدیریت بخش‌های توضیحات محصول</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {sections.map((section, index) => (
            <SectionItem
              key={section.id}
              sectionId={section.id}
              index={index}
              title={section.title}
              content={section.content}
              onTitleChange={(title) => updateSectionTitle(index, title)}
              onContentChange={(content) =>
                updateSectionContent(index, content)
              }
              onRemove={() => removeSection(index)}
              onAddSection={addNewSection}
            />
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <motion.button
            type="submit"
            className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            ذخیره تغییرات
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default SectionsEditorPage;
