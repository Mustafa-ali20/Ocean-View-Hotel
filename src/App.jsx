import Navbar from "./components/layout/Navbar";
import AboutCarousel from "./pages/AboutCarousel/Aboutcarousel";
import Description from "./pages/description/Description";
import Hero from "./pages/Hero/Hero";
import Lenis from "lenis";
import Services from "./pages/Services/Services";
import Marquee from "./pages/Marquee/Marquee";
import Testimonials from "./pages/Testimonials/Testimonials";
import EventHall from "./pages/Event/EventHall";
import Footer from "./pages/Footer/Footer";

function App() {
  const lenis = new Lenis();

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  return (
    <>
      <Navbar />
      <Hero />
      <Description />
      <AboutCarousel />
      <Services />
      <Marquee />
      <Testimonials />
      <EventHall />
      <Footer />
    </>
  );
}

export default App;
