export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log(id);
  return {
    title: {
      absolute: "محصول های ما",
    },
    description: "محصولات ما را با استفاده از سایت ما به شما ارائه دهید",
  };
}
export default function Layout({
  main,
  tabs,
}: {
  main: React.ReactNode;
  tabs: React.ReactNode;
}) {
  return (
    <>
      <section>{main}</section>
      <section>{tabs}</section>
    </>
  );
}
