import { SectionsStoreState } from "@/libs/types/sections";
import { FileWithPreview } from "@lib/types/file-with-preview";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSectionImagesStore = create<SectionsStoreState>()(
  persist(
    (set) => ({
      sections: {},

      setSectionImage: (
        sectionId: string,
        side: "left" | "right" | "top",
        file: FileWithPreview,
      ) =>
        set((state) => {
          const section = state.sections[sectionId] || {};
          const newSection = { ...section, [`${side}Image`]: file };

          return {
            sections: {
              ...state.sections,
              [sectionId]: newSection,
            },
          };
        }),

      removeSectionImage: (sectionId: string, side: "left" | "right" | "top") =>
        set((state) => {
          const section = state.sections[sectionId];
          if (!section) return state;

          const newState = { ...section };
          delete newState[`${side}Image`];

          const updatedSections = { ...state.sections };
          if (Object.keys(newState).length > 0) {
            updatedSections[sectionId] = newState;
          } else {
            delete updatedSections[sectionId];
          }

          return {
            sections: updatedSections,
          };
        }),

      removeSection: (sectionId: string) =>
        set((state) => {
          const newState = { ...state.sections };
          delete newState[sectionId];
          return { sections: newState };
        }),

      clearSectionImages: (sectionId: string) =>
        set((state) => {
          const newState = { ...state.sections };
          // Remove the section completely, which clears all images for that section
          delete newState[sectionId];
          return { sections: newState };
        }),

      clearAll: () => set({ sections: {} }),
    }),
    {
      name: "section-images-storage",
      partialize: (state) => ({ sections: state.sections }),
    },
  ),
);
