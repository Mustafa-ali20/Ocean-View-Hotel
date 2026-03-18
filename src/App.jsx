import Navbar from "./components/layout/Navbar";
import AboutCarousel from "./pages/AboutCarousel/Aboutcarousel";
import Description from "./pages/description/Description";
import Hero from "./pages/Hero/Hero";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Description />
      <AboutCarousel />
    </>
  );
}

export default App;
