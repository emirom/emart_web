import { extendZodWithOpenApi } from '@anatine/zod-openapi';
import { ZodObject, ZodRawShape, z } from 'zod';

export type MulterFile = {
  fieldname: string;
  originalname: string;
  mimetype: string;
  path: string;
  size: number;
};

export type ZodSchema = ZodObject<ZodRawShape>;
export const optionalUuid = () =>
  z.preprocess(
    (val) => (val === 'null' ? null : val),
    z.union([z.string().uuid(), z.literal(null), z.undefined()])
  );

export const optionalEnum = (
  keywords?: [string, ...string[]],
  defaultValue?: string
) => {
  if (!keywords) {
    return z.union([z.literal(null), z.undefined()]);
  }

  if (defaultValue && !keywords.includes(defaultValue)) {
    throw new Error(`Default value "${defaultValue}" is not a valid keyword.`);
  }

  return z.preprocess(
    (val) => (val === 'null' ? null : val),
    z.union([
      z.enum(keywords).default(defaultValue ?? keywords[0]),
      z.literal(null),
      z.undefined(),
    ])
  );
};

export const optionalString = (maxLength = 50) =>
  z.preprocess(
    (val) => (val === 'null' ? null : val),
    z.union([z.string().max(maxLength), z.literal(null), z.undefined()])
  );

export const optionalUrl = (maxLength = 1000) =>
  z.preprocess(
    (val) => (val === 'null' ? null : val),
    z.union([z.string().max(maxLength).url(), z.literal(null), z.undefined()])
  );

export const optionalRegex = (
  reg: RegExp,
  message: string,
  maxLength: number = 50
) =>
  z.preprocess(
    (val) => (val === 'null' ? null : val),
    z.union([
      z.string().max(maxLength).regex(reg, message),
      z.literal(null),
      z.undefined(),
    ])
  );

export const optionalDate = () =>
  z.preprocess(
    (val) => (val === 'null' ? null : val),
    z.union([z.coerce.string(), z.literal(null), z.undefined()])
  );

export const optionalBoolean = (defaultValue?: boolean) =>
  z.preprocess(
    (val) => (val === 'null' ? null : val),
    z.union([
      defaultValue ? z.boolean().default(defaultValue) : z.boolean(),
      z.literal(null),
      z.undefined(),
    ])
  );

export const optionalUuids = () =>
  z.union([
    z.undefined(),
    z.array(
      z.string().uuid().openapi({
        example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        format: 'uuid',
      })
    ),
  ]);

export const optionalNumber = (min?: number, max?: number) =>
  z.preprocess(
    (val) => (val === 'null' ? null : val),
    z.union([
      min && max ? z.number().min(min).max(max) : z.number(),
      z.literal(null),
      z.undefined(),
    ])
  );

export const optionalArray = (itemSchema: z.ZodObject) =>
  z.preprocess(
    (val) => (val === 'null' ? null : val),
    z.union([z.array(itemSchema), z.literal(null), z.undefined()])
  );

export const BaseSchema = z.object({
  id: z.string().uuid().openapi({
    description: 'Unique identifier (UUIDv4)',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
  }),
  createdAt: z.string().datetime().openapi({
    description: 'Creation timestamp (ISO 8601)',
    example: '2023-07-20T12:34:56.789Z',
    format: 'date-time',
  }),
  updatedAt: z.string().datetime().openapi({
    description: 'Last update timestamp (ISO 8601)',
    example: '2023-07-20T12:34:56.789Z',
    format: 'date-time',
  }),
});

export const BaseSoftSchema = z.object({
  id: z.string().uuid().openapi({
    description: 'Unique identifier (UUIDv4)',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
  }),
  createdAt: z.string().datetime().openapi({
    description: 'Creation timestamp (ISO 8601)',
    example: '2023-07-20T12:34:56.789Z',
    format: 'date-time',
  }),
  updatedAt: z.string().datetime().openapi({
    description: 'Last update timestamp (ISO 8601)',
    example: '2023-07-20T12:34:56.789Z',
    format: 'date-time',
  }),
  deletedAt: optionalDate().openapi({
    //
    description: 'Deletion timestamp (ISO 8601) when soft deleted',
    example: null,
  }),
});

export const CountedListSchema = z.object({
  rowNumber: z.number().openapi({
    //
    description: 'number of row in list table',
    example: 1,
  }),
});

export const BaseResponseSchema = z
  .object({
    success: optionalBoolean().openapi({ description: 'Operation status' }),
  })
  .openapi({
    $ref: 'BaseResponse',
    description: 'Standard API response format',
  });

const FilterSchema = z.object({
  service: z.string().openapi({
    description: 'The key representing the service associated with the filter.',
    example: 'search_txt',
  }),
  label: optionalString().openapi({
    description: 'A user-friendly label for the filter.',
    example: 'نام دسته بندی',
  }),
  open: z.boolean().openapi({
    description: 'Indicates whether the filter is currently open (active).',
    example: true,
  }),
  type: z.string().openapi({
    description: 'The type of filter, which determines how it behaves.',
    example: 'text', // or "datetime", "checkbox_multiselect", "number", chekbox
  }),
  model: optionalString().openapi({
    description: 'The name of the model to search in.',
    example: 'cateogry',
  }),
  field: optionalString().openapi({
    description:
      'The scope of the search for this filter, providing context for filtering.',
    example: 'name',
  }),
  advanced: optionalBoolean().openapi({
    description: 'Indicates if this filter is an advanced filter.',
    example: true,
  }),
  enumOptions: optionalString().openapi({
    description:
      'Indicates the filter options that are based on an enumeration.',
    example: 'colors',
  }),
});

export const BaseError = z
  .object({
    success: optionalBoolean().openapi({
      description: 'Operation status',
      example: false,
    }),
    error: optionalString()
      .optional()
      .openapi({ description: 'Error message' }),
  })
  .openapi({
    $ref: 'BaseError',
    description: 'Standard API error format',
  });

export const BadRequestErrorSchema = BaseError.extend({
  code: z.string().openapi({
    description: 'Error code',
    example: 'VALIDATION_ERROR',
  }),
}).openapi({ $ref: 'ErrorResponse' });

export const InternalErrorSchema = BaseError.extend({
  code: z.string().openapi({
    description: 'Error code',
    example: 'INTERNAL_ERROR',
  }),
  details: z.any().openapi({
    description: 'Error detials',
    example: 'zod error',
  }),
}).openapi({ $ref: 'InternalError' });

export const NotFoundErrorSchema = BaseError.extend({
  code: z.string().openapi({
    description: 'Error code',
    example: 'NOT_FOUND',
  }),
}).openapi({ $ref: 'NotfoundError' });

export const ConflictErrorSchema = BaseError.extend({
  code: z.string().openapi({
    description: 'Error code',
    example: 'CONFLICT',
  }),
  error: z.string().openapi({ example: 'Resource already exists' }),
  details: z.object({
    conflictField: z.string().openapi({ example: 'name' }),
  }),
}).openapi({ $ref: 'ConflictError' });

export const PaginateQuerySchema = z
  .object({
    skip: z.coerce.number().int().min(0).openapi({
      description: 'Number of records to skip',
      example: 0,
    }),
    limit: z.coerce.number().int().min(1).max(20).openapi({
      description: 'Maximum number of records to return',
      example: 10,
    }),
  })
  .openapi({ $ref: 'PaginateQuery' });

export const PaginateSoftQuerySchema = z
  .object({
    skip: z.coerce.number().int().min(0).openapi({
      description: 'Number of records to skip',
      example: 0,
    }),
    limit: z.coerce.number().int().min(1).max(20).openapi({
      description: 'Maximum number of records to return',
      example: 10,
    }),
    deletedAt: optionalDate().openapi({
      description: 'Optional date input, usually null',
    }),
  })
  .openapi({ $ref: 'PaginateSoftQuery' });

export const PaginatedResponse = BaseResponseSchema.extend({
  details: z
    .object({
      total: z
        .number()
        .int()
        .min(0)
        .openapi({
          description: 'Total number of categories matching the query',
          example: 2,
        })
        .optional(),
      pages: z
        .number()
        .int()
        .min(0)
        .openapi({
          description: 'Total number of categories matching the query',
          example: 2,
        })
        .optional(),
      skip: z.number().int().min(0).openapi({
        description: 'Number of records skipped for pagination',
        example: 0,
      }),
      limit: z.number().int().min(1).max(100).openapi({
        description: 'Maximum number of records returned per page',
        example: 10,
      }),
    })
    .openapi({
      description: 'Pagination metadata',
    })
    .optional(),
});

export const BaseListResponseSchema = PaginatedResponse.extend({
  filters: z.array(FilterSchema),
});

export type GeneralError = {
  success: boolean;
  code?: string;
  error?: string;
  details?: object;
};

export const IdSchema = z
  .object({
    id: z
      .string()
      .uuid()
      .openapi({
        description: 'Unique product identifier (UUIDv4)',
        example: '550e8400-e29b-41d4-a716-446655440000',
        format: 'uuid',
      }),
  })
  .openapi({
    $ref: 'IdSchema',
    description: 'model identifier parameters for URL paths',
    example: {
      id: '550e8400-e29b-41d4-a716-446655440000',
    },
  });

export const unauthorizedErrorSchema = BaseError.extend({
  code: z.string().openapi({
    description: 'Error code',
    example: 'UNAUTHORIZED_ERROR',
  }),
}).openapi({ $ref: 'UnauthorizedError' });

export type BaseResponse = z.infer<typeof BaseResponseSchema>;
export type FilterSchemaInput = z.infer<typeof FilterSchema>;

// File validation constants
const MAX_SINGLE_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const MAX_BULK_TOTAL_SIZE = 1000 * 1024 * 1024; // 200MB for bulk uploads

// File validation functions
const validateFileSize = (
  file: MulterFile,
  maxSize: number = MAX_SINGLE_FILE_SIZE
): boolean => {
  return file.size <= maxSize;
};

const validateMimeType = (mimetype: string): boolean => {
  return allowedMimeTypes.includes(mimetype as AllowedMimeType);
};

// Custom Zod refinements for file validation
const fileValidation = z
  .custom<MulterFile>()

const bulkFilesValidation = z
  .array(z.custom<MulterFile>())
  .min(1)
  .max(20)


extendZodWithOpenApi(z);

// Advanced examples for different media types
const imageMediaExample = {
  id: '550e8400-e29b-41d4-a716-446655440000',
  productId: '660e8400-e29b-41d4-a716-446655440000',
  url: '/public/products/660e8400-e29b-41d4-a716-446655440000/samsung-galaxy-s23-ultra-1703251234567.jpg',
  thumbnailUrl:
    '/public/products/660e8400-e29b-41d4-a716-446655440000/thumb_samsung-galaxy-s23-ultra-1703251234567.jpg',
  altText: 'Samsung Galaxy S23 Ultra front view showing the stunning display',
  caption:
    'High-resolution image showcasing the premium design and build quality',
  mimetype: 'image/jpeg',
  order: 0,
  uploadedById: '770e8400-e29b-41d4-a716-446655440000',
  createdAt: '2025-08-22T12:34:56.789Z',
  updatedAt: '2025-08-22T12:34:56.789Z',
  title: 'SamsungGalaxy.png',
};

// Comprehensive MIME type definitions with categories
export const allowedImageMimeTypes = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/avif',
  'image/svg+xml',
  'image/bmp',
  'image/tiff',
] as const;

export const allowedVideoMimeTypes = [
  'video/mp4',
  'video/webm',
  'video/ogg',
  'video/quicktime',
  'video/x-msvideo', // .avi
  'video/x-ms-wmv', // .wmv
] as const;

export const allowedMimeTypes = [
  ...allowedImageMimeTypes,
  ...allowedVideoMimeTypes,
] as const;

// MIME type enum with proper validation
export const MimeTypeEnum = z.enum(allowedMimeTypes).openapi({
  description: 'Comprehensive list of supported MIME types for product media',
  example: 'image/jpeg',
});

// Media type categorization enum
export const MediaTypeEnum = z.enum(['image', 'video']).openapi({
  description: 'Media type category for filtering and organization',
  example: 'image',
});

// Advanced ProductMedia schema with comprehensive validation
export const ProductMediaSchema = BaseSchema.extend({
  productId: z.string().uuid().openapi({
    description: 'UUID of the associated product',
    example: imageMediaExample.productId,
    format: 'uuid',
  }),
  url: z.string().min(1).max(2048).openapi({
    description: 'Relative or absolute URL path to the media file',
    example: imageMediaExample.url,
  }),
  thumbnailUrl: optionalString(2048).openapi({
    description:
      'Optional thumbnail URL for quick preview (auto-generated for videos)',
    example: imageMediaExample.thumbnailUrl,
  }),
  altText: optionalString(500).openapi({
    description: 'Alternative text for accessibility and SEO optimization',
    example: imageMediaExample.altText,
  }),
  caption: optionalString(1000).openapi({
    description: 'Detailed caption or description of the media content',
    example: imageMediaExample.caption,
  }),
  title: optionalString(100).openapi({
    description: 'Detailed caption or description of the media content',
    example: imageMediaExample.caption,
  }),
  mimetype: MimeTypeEnum,
  order: z.number().int().min(0).max(999).openapi({
    description:
      'Display order (0 = primary/main media, higher numbers for secondary)',
    example: imageMediaExample.order,
  }),
  uploadedById: optionalUuid().openapi({
    description: 'UUID of the user who uploaded this media (for audit trail)',
    example: imageMediaExample.uploadedById,
  }),
}).openapi({
  $ref: 'ProductMedia',
  description: 'Complete product media entity with comprehensive metadata',
});

// Advanced file upload schema with validation
export const CreateProductMediaSchema = z
  .object({
    file: fileValidation.openapi({
      description: 'Media file (image or video) with comprehensive validation',
      example: {
        fieldname: 'file',
        originalname: 'samsung-galaxy-s23-ultra-hero.jpg',
        mimetype: 'image/jpeg',
        path: '/public/temp/samsung-galaxy-s23-ultra-hero.jpg',
        size: 2048576,
      },
    }),
    title: optionalString(100).openapi({
      description: 'Detailed caption or description of the media content',
      example: imageMediaExample.caption,
    }),
    productId: z.string().uuid().openapi({
      description: 'UUID of the product this media belongs to',
      example: imageMediaExample.productId,
      format: 'uuid',
    }),
    altText: optionalString(500).openapi({
      description:
        'Alternative text for accessibility (auto-generated if not provided)',
      example: 'Samsung Galaxy S23 Ultra showcasing premium design',
    }),
    caption: optionalString(1000).openapi({
      description: 'Optional detailed caption or description',
      example: 'Professional product photography highlighting key features',
    }),
    order: optionalNumber().openapi({
      description: 'Display order (auto-assigned if not provided)',
      example: 0,
    }),
  })
  .openapi({
    $ref: 'CreateProductMedia',
    description: 'Schema for creating new product media with file upload',
  });

// Bulk upload schema for multiple files
export const CreateManyProductMediaSchema = z
  .object({
    files: bulkFilesValidation.openapi({
      description:
        'Array of media files (1-20 files supported) with comprehensive validation',
      example: [
        {
          fieldname: 'files',
          originalname: 'product-main.jpg',
          mimetype: 'image/jpeg',
          path: '/public/temp/product-main.jpg',
          size: 1024576,
        },
        {
          fieldname: 'files',
          originalname: 'product-demo.mp4',
          mimetype: 'video/mp4',
          path: '/public/temp/product-demo.mp4',
          size: 10485760,
        },
      ],
    }),
    productId: z.string().uuid().openapi({
      description: 'UUID of the product for all uploaded media',
      example: imageMediaExample.productId,
      format: 'uuid',
    }),
    altText: optionalString(500).openapi({
      description:
        'Default alternative text applied to all files (can be overridden per file)',
      example: 'Product media collection',
    }),
    caption: optionalString(1000).openapi({
      description:
        'Default caption applied to all files (can be overridden per file)',
      example: 'Comprehensive product media showcase',
    }),
    startOrder: optionalNumber().openapi({
      description:
        'Starting order number for the uploaded files (increments automatically)',
      example: 0,
    }),
  })
  .openapi({
    $ref: 'CreateManyProductMedia',
    description: 'Schema for bulk upload of multiple product media files',
  });

// Update schema with partial validation
export const UpdateProductMediaSchema = z
  .object({
    altText: optionalString(500).openapi({
      description: 'Update alternative text for accessibility',
      example: 'Updated alternative text for better SEO',
    }),
    caption: optionalString(1000).openapi({
      description: 'Update media caption or description',
      example: 'Enhanced caption with more detailed information',
    }),
    order: optionalNumber().openapi({
      description: 'Update display order',
      example: 5,
    }),
  })
  .openapi({
    $ref: 'UpdateProductMedia',
    description: 'Schema for updating existing product media metadata',
  });

// Advanced query schema with comprehensive filtering
export const ListProductMediaQuerySchema = PaginateQuerySchema.extend({
  productId: optionalUuid().openapi({
    description: "Filter by specific product UUID",
    // example: "660e8400-e29b-41d4-a716-446655440000"
  }),
  mimetype: optionalString().openapi({
    description: "Filter by specific MIME type",
    // example: "image/jpeg"
  }),
  mediaType: optionalEnum(['image', 'video']).openapi({
    description: "Filter by media category (image or video)",
    // example: "image"
  }),
  uploadedById: optionalUuid().openapi({
    description: "Filter by uploader user UUID",
    // example: "770e8400-e29b-41d4-a716-446655440000"
  }),
  minOrder: optionalNumber().openapi({
    description: 'Filter by minimum order value',
    example: 0,
  }),
  maxOrder: optionalNumber().openapi({
    description: 'Filter by maximum order value',
    example: 10,
  }),
  hasAltText: optionalBoolean().openapi({
    description: "Filter by presence of alternative text",
    // example: true
  }),
  hasCaption: optionalBoolean().openapi({
    description: "Filter by presence of caption",
    // example: false
  }),
  minFileSize: optionalNumber().openapi({
    description: "Filter by minimum file size in bytes",
    // example: 1024
  }),
  maxFileSize: optionalNumber().openapi({
    description: "Filter by maximum file size in bytes",
    // example: 10485760
  }),
  sortBy: optionalEnum(['createdAt', 'updatedAt', 'order', 'fileSize'], 'order').openapi({
    description: "Sort results by specified field",
    // example: "order"
  }),
  sortOrder: optionalEnum(['desc', 'asc'], 'asc').openapi({
    description: "Sort direction",
    // example: "asc"
  })
}).openapi({
  $ref: 'ListProductMediaQuery',
  // description: "Advanced query parameters for filtering and sorting product media"
});

// Parameter schemas for route validation
export const ProductMediaParamsSchema = z
  .object({
    id: z.string().uuid().openapi({
      description: 'Product media UUID identifier',
      example: '550e8400-e29b-41d4-a716-446655440000',
      format: 'uuid',
    }),
  })
  .openapi({ $ref: 'ProductMediaParams' });

export const BulkDeleteSchema = z
  .object({
    ids: z
      .array(z.string().uuid())
      .min(1)
      .max(50)
      .openapi({
        description: 'Array of product media UUIDs to delete (1-50 items)',
        example: [
          '550e8400-e29b-41d4-a716-446655440000',
          '551e8400-e29b-41d4-a716-446655440001',
        ],
      }),
  })
  .openapi({
    $ref: 'BulkDeleteProductMedia',
    description: 'Schema for bulk deletion of product media',
  });

// Response schemas with comprehensive examples
export const ProductMediaResponseSchema = BaseResponseSchema.extend({
  data: ProductMediaSchema.optional(),
}).openapi({
  $ref: 'ProductMediaResponse',
  description: 'Response schema for single product media operations',
});

export const ListProductMediaResponseSchema = BaseListResponseSchema.extend({
  data: z.array(ProductMediaSchema),
}).openapi({
  $ref: 'ProductMediaListResponse',
  description: 'Response schema for listing product media with pagination',
});

export const CreateManyProductMediaResponseSchema = BaseResponseSchema.extend({
  data: z.array(ProductMediaSchema),
}).openapi({
  $ref: 'CreateManyProductMediaResponse',
  description: 'Response schema for bulk creation of product media',
});

export const BulkDeleteResponseSchema = BaseResponseSchema.extend({
  data: z.object({
    deletedCount: z.number().int().min(0),
    deletedIds: z.array(z.string().uuid()),
  }),
}).openapi({
  $ref: 'BulkDeleteResponse',
  description: 'Response schema for bulk deletion operations',
});

// Advanced filter definitions for UI components
export const productMediaFilters = [
  {
    service: 'productId',
    label: 'شناسه محصول',
    open: true,
    type: 'uuid',
    model: 'productMedia',
    field: 'productId',
    validation: 'uuid',
  },
  {
    service: 'mediaType',
    label: 'نوع رسانه',
    open: false,
    type: 'select',
    model: 'productMedia',
    field: 'mediaType',
    options: [
      { value: 'image', label: 'تصویر' },
      { value: 'video', label: 'ویدیو' },
    ],
  },
  {
    service: 'mimetype',
    label: 'فرمت فایل',
    open: false,
    type: 'select',
    model: 'productMedia',
    field: 'mimetype',
    options: allowedMimeTypes.map((type) => ({ value: type, label: type })),
  },
  {
    service: 'uploadedById',
    label: 'آپلودکننده',
    open: false,
    type: 'uuid',
    model: 'productMedia',
    field: 'uploadedById',
    validation: 'uuid',
  },
  {
    service: 'hasAltText',
    label: 'دارای متن جایگزین',
    open: false,
    type: 'boolean',
    model: 'productMedia',
    field: 'hasAltText',
  },
  {
    service: 'hasCaption',
    label: 'دارای توضیحات',
    open: false,
    type: 'boolean',
    model: 'productMedia',
    field: 'hasCaption',
  },
  {
    service: 'order',
    label: 'ترتیب نمایش',
    open: false,
    type: 'number',
    model: 'productMedia',
    field: 'order',
    validation: 'integer',
  },
];

// Comprehensive type exports
export type ProductMedia = z.infer<typeof ProductMediaSchema>;
export type CreateProductMediaInput = z.infer<typeof CreateProductMediaSchema>;
export type CreateManyProductMediaInput = z.infer<
  typeof CreateManyProductMediaSchema
>;
export type UpdateProductMediaInput = z.infer<typeof UpdateProductMediaSchema>;
export type ListProductMediaQueryInput = z.infer<
  typeof ListProductMediaQuerySchema
>;
export type ProductMediaParams = z.infer<typeof ProductMediaParamsSchema>;
export type BulkDeleteInput = z.infer<typeof BulkDeleteSchema>;

// Response type exports
export type ProductMediaResponse = z.infer<typeof ProductMediaResponseSchema>;
export type ProductMediaListResponse = z.infer<
  typeof ListProductMediaResponseSchema
>;
export type CreateManyProductMediaResponse = z.infer<
  typeof CreateManyProductMediaResponseSchema
>;
export type BulkDeleteResponse = z.infer<typeof BulkDeleteResponseSchema>;

// Utility type exports
export type AllowedMimeType = (typeof allowedMimeTypes)[number];
export type AllowedImageMimeType = (typeof allowedImageMimeTypes)[number];
export type AllowedVideoMimeType = (typeof allowedVideoMimeTypes)[number];
export type MediaType = 'image' | 'video';
