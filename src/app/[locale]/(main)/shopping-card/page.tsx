import ProductShoppingList from "@/pages/home/shopping-card/ProductShoppingList";
import ShoppingStep from "@/pages/home/shopping-card/ShoppingStep";
import Container from "@components/Container";
import { queryClient } from "@lib/apis/queryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: {
    absolute: "سبد خرید",
  },
};
export default function ShoppingCard() {
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Container className="flex items-stretch h-full  gap-3">
        <ProductShoppingList />
        <ShoppingStep />
      </Container>
    </HydrationBoundary>
  );
}
