import CardContainer from './CardContainer';
import HeroSection from './HeroSection';
import OurProcess from './OurProcess';
import OurWork from './OurWork';
import Contact from './Contact';
import AboutUs from './ui/AboutUs';

function LandingPage() {
  return (
    <>
      <HeroSection />
      <CardContainer />
      <OurWork />
      <AboutUs />
      {/* <OurProcess /> */}
      <Contact />
    </>
  );
}

export default LandingPage;
