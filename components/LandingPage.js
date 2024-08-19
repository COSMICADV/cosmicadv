import DigitalExperienceDesign from '@/app/our-solutions/digital-experience-design/page';
import CardContainer from './CardContainer';
import HeroSection from './HeroSection';
import NavigationBar from './NavigationBar';
import OurProcess from './OurProcess';
import OurWork from './OurWork';
import BrandIdentity from '@/app/our-solutions/brand-identity/page';

function LandingPage() {
  return (
    <>
      <HeroSection />
      <OurWork />
      <OurProcess />
      <CardContainer />
    </>
  );
}

export default LandingPage;
