import ChooseDeliveryAddress from "./ChooseDeliveryAddress";
import UserAddressForm from "./UserAddressForm";

export default function UserAddress() {
  return (
    <div className="w-full border border-[#0F4275]/40 p-2 rounded-lg">
      <ChooseDeliveryAddress />
      <UserAddressForm />
    </div>
  );
}
