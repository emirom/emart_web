import { FileWithPreview } from "@lib/types/file-with-preview";
import { Store } from "@lib/types/store";
import { StateCreator } from "zustand";

type FileState = {
  currentFile: FileWithPreview | null;
};

type FileActions = {
  setCurrentFile: (file: FileWithPreview | null) => void;
  updateFileProgress: (progress: number) => void;
  setFileUploading: (isUploading: boolean) => void;
  setFileAsCover: () => void;
  clearFile: () => void;
};

export type FileSlice = FileState & FileActions;

export const createFileSlice: StateCreator<
  Store,
  [["zustand/immer", never]],
  [],
  FileSlice
> = (set) => ({
  currentFile: null,

  setCurrentFile: (file) =>
    set((state) => {
      if (state.currentFile?.preview && state.currentFile !== file) {
        URL.revokeObjectURL(state.currentFile.preview);
      }
      state.currentFile = file;
    }),

  updateFileProgress: (progress) =>
    set((state) => {
      if (state.currentFile) {
        state.currentFile.progress = progress;
      }
    }),

  setFileUploading: (isUploading) =>
    set((state) => {
      if (state.currentFile) {
        state.currentFile.isUploading = isUploading;
      }
    }),

  setFileAsCover: () =>
    set((state) => {
      if (state.currentFile) {
        state.currentFile.isCover = true;
      }
    }),

  clearFile: () =>
    set((state) => {
      if (state.currentFile?.preview) {
        URL.revokeObjectURL(state.currentFile.preview);
      }
      state.currentFile = null;
    }),
});