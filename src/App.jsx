import { useEffect, lazy, Suspense } from "react";
import lenis from "./lib/lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// ── static imports — load immediately ─────────────────────────
import Navbar from "./components/layout/Navbar";
import Loader from "./components/Loader/Loader";
import Hero from "./pages/Hero/Hero";

// ── lazy imports — load as user scrolls ───────────────────────
const Description = lazy(() => import("./pages/description/Description"));
const AboutCarousel = lazy(() => import("./pages/AboutCarousel/Aboutcarousel"));
const Rooms = lazy(() => import("./pages/Rooms/Rooms"));
const Services = lazy(() => import("./pages/Services/Services"));
const Marquee = lazy(() => import("./pages/Marquee/Marquee"));
const Testimonials = lazy(() => import("./pages/Testimonials/Testimonials"));
const EventHall = lazy(() => import("./pages/Event/EventHall"));
const Footer = lazy(() => import("./pages/Footer/Footer"));

function App() {
  useEffect(() => {
    // sync lenis with gsap ticker for smooth scroll + ScrollTrigger compatibility
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return (
    <>
     <Loader />
      <Navbar />
      <Hero />
      <Suspense fallback={null}>
        <Description />
        <AboutCarousel />
        <Rooms />
        <Services />
        <Marquee />
        <Testimonials />
        <EventHall />
        <Footer />
      </Suspense> 
    </>
  );
}

export default App;
