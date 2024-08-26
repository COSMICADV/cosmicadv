import CardContainer from './CardContainer';
import HeroSection from './HeroSection';
import NavigationBar from './ui/NavigationBar';
import OurProcess from './OurProcess';
import OurWork from './OurWork';
import Contact from './Contact';

function LandingPage() {
  return (
    <>
      <HeroSection />
      <OurWork />
      {/* <OurProcess /> */}
      <CardContainer />
      <Contact />
    </>
  );
}

export default LandingPage;
