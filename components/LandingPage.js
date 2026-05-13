import CardContainer from './CardContainer';
import HeroSection from './HeroSection';
import OurProcess from './OurProcess';
import OurWork from './OurWork';
import Contact from './Contact';
import AboutUs from './ui/AboutUs';
import ReviewsSection from './ReviewsSection';
import TeamSection from './TeamSection';

function LandingPage() {
  return (
    <>
      <HeroSection />
      <CardContainer />
      <OurWork />
      <AboutUs />
      <TeamSection />
      <ReviewsSection />
      {/* <OurProcess /> */}
      <Contact />
    </>
  );
}

export default LandingPage;
