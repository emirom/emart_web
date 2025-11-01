import { FOOTER_ITEMS } from "@lib/constants/footer";
import Container from "./Container";
import CustomImage from "./CustomImage";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function MainFooter() {
  return (
    <footer
      className="main-footer mt-5 bg-tint-blue-100 py-10 pb-5"
      role="contentinfo"
      aria-labelledby="footer-heading"
      dir="rtl"
      itemScope
      itemType="https://schema.org/Organization"
    >
      <Container className="flex flex-col lg:flex-row gap-6">
        <div className="order-1 w-full lg:w-2/3">
          <h2 id="footer-heading" className="sr-only">
            اطلاعات و پیوندهای پایانی سایت
          </h2>
          <nav aria-label="پیوندهای فوتر">
            <div className="grid w-full gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {FOOTER_ITEMS.map((section) => (
                <FooterSection key={section.id} section={section} />
              ))}
            </div>
          </nav>
        </div>

        <div className="order-2 w-full lg:w-1/3 mt-2 lg:mt-0 flex flex-col">
          <section
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6"
            aria-label="مجوزها و کارت‌های محصول"
            dir="rtl"
          >
            {Array.from({ length: 4 }, (_, i) => (
              <article
                key={i}
                className="border bg-white border-gray-100 rounded-lg flex items-center justify-center p-4"
                itemProp="itemOffered"
                itemScope
                itemType="https://schema.org/Product"
              >
                <figure className="flex-shrink-0">
                  <CustomImage
                    className="rounded-lg"
                    src="/images/related-porduct.png"
                    alt="آیفون 13 پرو مکس – تصویر محصول"
                    width={84}
                    height={84}
                    loading="lazy"
                    itemProp="image"
                  />
                </figure>
                <meta itemProp="name" content="آیفون 13 پرو مکس" />
              </article>
            ))}
          </section>

          <form
            className="bg-white p-2 rounded-lg flex items-stretch my-6"
            aria-label="فرم عضویت خبرنامه"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              ایمیل برای عضویت در خبرنامه
            </label>
            <Input
              id="newsletter-email"
              type="email"
              placeholder="ایمیل خود را وارد نمایید..."
              className="flex-1 border-0 p-1 text-tint-blue-500 text-xs shadow-none"
            />
            <Button type="submit" className="bg-green-100 text-green-200">
              عضویت در خبرنامه
            </Button>
          </form>

          <div className="grid grid-cols-2 text-tint-blue-500 font-bold text-xs gap-y-4 items-center py-4 border-b border-white">
            <p>تلفن ثابت: ۰۲۱-۸۰۸۵۰۰۱</p>
            <p>پشتیبانی واتس‌اپ: ۰۲۱-۸۰۸۵۰۰۱</p>
            <p>ایمیل: info@mahourhamrah.ir</p>
          </div>

          <section
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 items-stretch mt-6 lg:mt-auto"
            aria-label="شبکه‌های اجتماعی"
          >
            {Array.from({ length: 4 }, (_, i) => (
              <article
                key={i}
                className="border bg-white border-gray-100 rounded-lg flex items-center justify-center p-4"
              >
                <figure className="flex-shrink-0">
                  <CustomImage
                    className="rounded-lg"
                    src="/images/related-porduct.png"
                    alt="آیکون شبکه اجتماعی"
                    width={40}
                    height={40}
                    loading="lazy"
                  />
                </figure>
              </article>
            ))}
          </section>
        </div>
      </Container>

      <div className="mt-6">
        <small
          className="block text-center text-sm text-tint-blue-500 font-bold"
          itemProp="copyrightNotice"
        >
          تمامی حقوق مادی و معنوی این سایت متعلق به ماهور همراه می‌باشد. ۱۴۰۴
        </small>
      </div>
    </footer>
  );
}

function FooterSection({
  section,
}: {
  section: {
    id: string;
    title: string;
    footerItems: { id: string; href: string; subTitle: string }[];
  };
}) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-[#0F4275] w-fit font-bold text-base border-b border-[#0F4275]">
        {section.title}
      </h3>
      <ul className="flex flex-col gap-3">
        {section.footerItems.map((item) => (
          <li key={item.id}>
            <a
              href={item.href}
              className="text-sm text-[#0F4275] hover:text-green-200"
            >
              {item.subTitle}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
