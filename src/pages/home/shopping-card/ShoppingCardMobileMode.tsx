import MobileShoppingCardWrapper from "./MobileShoppingCardWrapper";
import MobileShoppingList from "./MobileShoppingList";

export default function ShoppingCardMobileMode() {
  return (
    <div className="lg:hidden">
      <MobileShoppingCardWrapper>
        <MobileShoppingList />
      </MobileShoppingCardWrapper>
    </div>
  );
}
