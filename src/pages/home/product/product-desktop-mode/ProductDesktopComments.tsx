import Comments from "../Comments";
import ProductCommentFilter from "../ProductCommentFilter";
import RegisterComment from "../RegisterComment";

export default function ProductDesktopComments() {
  return (
    <>
      <section className="grid grid-cols-12 items-start gap-4 my-4">
        <div className="col-span-3">
          <RegisterComment />
        </div>
        <div className="col-span-6 ">
          <ProductCommentFilter />
          <Comments />
        </div>
      </section>
    </>
  );
}
