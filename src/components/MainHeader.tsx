import Container from "./Container";
import DesktopPrimaryHeader from "./DesktopPrimayHeader";
import MainSearchContext from "./MainSearchContext";
import MobilePrimaryHeader from "./MobilePrimaryHeader";

export default function MainHeader() {
  return (
    <header className="py-2 pt-4 fixed top-0 right-0 left-0 z-50 bg-white">
      <Container>
        <MainSearchContext>
          {/* Mobile size */}
          <MobilePrimaryHeader />
          {/* Desktop size */}
          <DesktopPrimaryHeader />
        </MainSearchContext>
      </Container>
    </header>
  );
}
