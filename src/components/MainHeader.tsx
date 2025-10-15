import Container from "./Container";
import DesktopPrimaryHeader from "./DesktopPrimayHeader";
import MainSearchContext from "./MainSearchContext";
import MobilePrimaryHeader from "./MobilePrimaryHeader";

export default function MainHeader() {
  return (
    <header className="py-2 pt-4">
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
