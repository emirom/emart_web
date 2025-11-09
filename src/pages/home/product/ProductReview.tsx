import CustomImage from "@components/CustomImage";
import { cn } from "@components/lib/utils";

const rawDataFromDb = [
  {
    title: "معرفی محصول",
    description:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است...",
    image: "/images/product.webp",
  },
  {
    title: "صفحه نمایش",
    description:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است...",
    image: "/images/product.webp",
  },
  {
    title: "باتری و عملکرد",
    description:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است...",
    image: "/images/product.webp",
  },
];

export default function ProductReview() {
  return (
    <section
      className={cn("my-4")}
      aria-labelledby="product-review-title"
      role="region"
      tabIndex={0}
      id="review"
    >
      <h3
        id="product-review-title"
        className="text-sm font-medium text-tint-blue-500 mb-4 lg:hidden"
      >
        نقد و بررسی محصول
      </h3>

      {rawDataFromDb.map((section, index) => (
        <article
          key={index}
          className={`border-b pb-5 border-b-sky-blue ${
            index === rawDataFromDb.length - 1 ? "mb-0" : "mb-6"
          }`}
          aria-labelledby={`review-section-${index}`}
          role="article"
        >
          {index === 0 ? (
            <>
              <figure
                className={cn(
                  "aspect-[10/7] w-full mb-3 ",
                  "flex items-center justify-center lg:aspect-[23/15] lg:w-[40%] lg:h-[40%] mx-auto",
                )}
              >
                <CustomImage
                  src={section.image}
                  alt={`تصویر بخش ${section.title}`}
                  className="w-full h-full object-contain rounded-md"
                  fill
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
                <figcaption className="sr-only">{section.title}</figcaption>
              </figure>

              <h4
                id={`review-section-${index}`}
                className="bg-sky-blue text-sm font-medium px-2 py-2 flex items-center justify-center w-fit text-tint-blue-500 rounded-lg mb-3"
              >
                {section.title}
              </h4>

              <p className="text-sm text-tint-blue-500 text-justify leading-relaxed">
                {section.description}
              </p>
            </>
          ) : (
            <div
              className={`flex gap-4 items-center ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              }`}
            >
              <div className="w-1/3 flex flex-col gap-2">
                <h4
                  id={`review-section-${index}`}
                  className={cn(
                    "bg-sky-blue text-sm font-medium px-2 py-2 flex items-center justify-center w-fit text-tint-blue-500 rounded-lg ",
                    index % 2 === 0 ? "self-start" : "self-end",
                  )}
                >
                  {section.title}
                </h4>

                <figure
                  className={cn(
                    "aspect-[3/4] w-full",
                    "lg:aspect-[3/2] lg:w-[100%] h-[100%] lg:mr-auto ",
                  )}
                >
                  <CustomImage
                    src={section.image}
                    alt={`تصویر بخش ${section.title}`}
                    className="w-full h-full object-cover rounded-lg"
                    fill
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption className="sr-only">{section.title}</figcaption>
                </figure>
              </div>

              <div className="w-2/3">
                <p className="text-sm text-tint-blue-500 text-justify leading-relaxed">
                  {section.description}
                </p>
              </div>
            </div>
          )}
        </article>
      ))}
    </section>
  );
}
