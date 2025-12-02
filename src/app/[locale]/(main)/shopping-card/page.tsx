import ShoppingCardDesktopMode from "@/pages/home/shopping-card/ShoppingCardDesktopMode";
import ShoppingCardMobileMode from "@/pages/home/shopping-card/ShoppingCardMobileMode";
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
      <Container>
        <ShoppingCardMobileMode />
        <ShoppingCardDesktopMode />
      </Container>
    </HydrationBoundary>
  );
}
