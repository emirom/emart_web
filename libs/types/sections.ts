export interface SectionFormType {
  id: string;
  title: string;
  content: string;
  topImageId?: string;
  leftImageId?: string;
  rightImageId?: string;
}

export interface SectionState {
  topImage?: import("@lib/types/file-with-preview").FileWithPreview;
  leftImage?: import("@lib/types/file-with-preview").FileWithPreview;
  rightImage?: import("@lib/types/file-with-preview").FileWithPreview;
}

export interface SectionsStoreState {
  sections: Record<string, SectionState>;
  setSectionImage: (
    sectionId: string,
    side: "left" | "right" | "top",
    file: import("@lib/types/file-with-preview").FileWithPreview,
  ) => void;
  removeSectionImage: (
    sectionId: string,
    side: "left" | "right" | "top",
  ) => void;
  removeSection: (sectionId: string) => void;
  clearSectionImages: (sectionId: string) => void;
  clearAll: () => void;
}
