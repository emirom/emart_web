"use client";

import dynamic from "next/dynamic";
import { memo } from "react";

const DynamicRichTextEditor = dynamic(() => import("./RichTextEditor"), {
  ssr: false,
  loading: () => (
    <div className=" h-64 flex items-center justify-center">
      <p>در حال بارگذاری ویرایشگر...</p>
    </div>
  ),
});

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const QuillEditorWrapper = ({
  value,
  onChange,
  placeholder,
  className,
}: Props) => {
  return (
    <DynamicRichTextEditor
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
    />
  );
};

export default memo(QuillEditorWrapper);
