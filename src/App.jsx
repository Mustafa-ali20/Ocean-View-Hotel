import { useEffect } from "react";
import lenis from "./lib/lenis";
import Navbar from "./components/layout/Navbar";
import AboutCarousel from "./pages/AboutCarousel/Aboutcarousel";
import Description from "./pages/description/Description";
import Hero from "./pages/Hero/Hero";
import Services from "./pages/Services/Services";
import Marquee from "./pages/Marquee/Marquee";
import Testimonials from "./pages/Testimonials/Testimonials";
import EventHall from "./pages/Event/EventHall";
import Footer from "./pages/Footer/Footer";
import Loader from "./components/Loader/Loader";
import Rooms from "./pages/Rooms/Rooms";

function App() {
  useEffect(() => {
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const id = requestAnimationFrame(raf);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <>
      <Loader />
      <Navbar />
      <Hero />
      <Description />
      <AboutCarousel />
      <Rooms />
      <Services />
      <Marquee />
      <Testimonials />
      <EventHall />
      <Footer />
    </>
  );
}

export default App;
