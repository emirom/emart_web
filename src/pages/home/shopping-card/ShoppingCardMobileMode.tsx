import MobileMethodReceipt from "./MobileMethodReceipt";
import MobileShoppingCardWrapper from "./MobileShoppingCardWrapper";

export default function ShoppingCardMobileMode() {
  return (
    <div className="lg:hidden">
      <MobileShoppingCardWrapper>
        {/* <MobileShoppingList /> */}
        <MobileMethodReceipt />
      </MobileShoppingCardWrapper>
    </div>
  );
}
