import { Attribute, Category, GetAttributeValuesParams } from "@lib/schemas";
import { Store } from "@lib/types/store";
import { StateCreator } from "zustand";

type ExtendedGetAttributeValuesParams = GetAttributeValuesParams & {
  categoryId?: string | null;
};

type ICategory = {
  category: Category | null;
  attribute: Attribute[];
  parentId?: null | string;
};

type CategoryListState = {
  categoryList: ICategory;
  parentId: string | null;
  children: Category[];
  attributeParams: ExtendedGetAttributeValuesParams;
};

type CategoryListAction = {
  addCategory: (item: Category) => void;
  addAttribute: (item: Attribute) => void;
  setChildren: (items: Category[]) => void;
  removeCategory: () => void;
  removeAttribute: (id: string) => void;
  setParentId: (id: string) => void;
  setAttributeParams: (
    params: Partial<ExtendedGetAttributeValuesParams>,
  ) => void;
};

export type CategoryListSlice = CategoryListState & CategoryListAction;

export const createCategoryListSlice: StateCreator<
  Store,
  [["zustand/immer", never]],
  [],
  CategoryListSlice
> = (set) => ({
  categoryList: { category: null, attribute: [], parentId: null },
  parentId: null,
  children: [],
  attributeParams: {
    limit: 20,
    skip: 0,
    categoryId: null,
    value: null,
    attributeId: null,
  },

  addCategory: (item) =>
    set((state) => {
      state.categoryList.category = item;
    }),

  addAttribute: (item) =>
    set((state) => {
      state.categoryList.attribute = [...state.categoryList.attribute, item];
    }),

  setChildren: (items) =>
    set((state) => {
      if (items !== undefined) state.children = items;
    }),

  setParentId: (id) =>
    set((state) => {
      state.parentId = id;
    }),

  setAttributeParams: (params) =>
    set((state) => {
      if (params?.categoryId)
        state.attributeParams.categoryId = params.categoryId;
    }),

  removeCategory: () =>
    set((state) => {
      state.categoryList.category = null;
    }),

  removeAttribute: (id) =>
    set((state) => {
      state.categoryList.attribute = state.categoryList.attribute.filter(
        (item) => item.id !== id,
      );
    }),
});
