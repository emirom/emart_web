// Server-side type (used in API/backend)
export type MulterFile = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination?: string;
  filename?: string;
  path?: string;
  buffer?: Buffer;
  stream?: null;
};

// Client-side input type (used in React form)
export type CreateProductMediaInputClient = {
  file: File;
  productId: string;
  title?: string | null;
  altText?: string | null;
  caption?: string | null;
  order?: number | null;
};

// Server-side input type (used in NestJS/Express controller)
export type CreateProductMediaInput = {
  file: MulterFile;
  productId: string;
  title?: string | null;
  altText?: string | null;
  caption?: string | null;
  order?: number | null;
};
export type FileWithPreview = {
  file: File;
  preview: string;
  path?: string;
  relativePath?: string;
  progress?: number;
  isUploading?: boolean;
  isCover?: boolean;
  controller?: AbortController;
};
