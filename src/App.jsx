import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// Google Analytics
import GoogleAnalytics from "./components/GoogleAnalytics";

// Existing Components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import HowItWorks from "./components/HowItWorks";
import WhyChooseUs from "./components/WhyChooseUs";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Book from "./components/Book";
import FlightBooking from "./components/FlightBooking";
import About from "./components/About";
import Destinations from "./components/Destinations";
import Programs from "./components/Programs";
import Career from "./components/Career";
import AnnouncementBar from "./components/AnnouncementBar";
import WhatsAppButton from "./components/WhatsAppButton";
import Testimonials from "./components/Testimonials";

// Destination Pages
import UnitedStates from "./components/UnitedStates";
import UnitedKingdom from "./components/UnitedKingdom";
import Canada from "./components/Canada.jsx";
import Australia from "./components/Australia.jsx";
import NewZealand from "./components/NewZealand.jsx";
import Ireland from "./components/Ireland.jsx";
import Europe from "./components/Europe.jsx";
import Asia from "./components/Asia.jsx";

// Blog pages
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import AdminBlog from "./pages/AdminBlog";
import AdminSlider from "./pages/AdminSlider";

function Home() {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const section = params.get("section");

    if (!section) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const timer = setTimeout(() => {
      const element = document.getElementById(section);
      if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);

    return () => clearTimeout(timer);
  }, [location.search]);

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main>
        <Hero />
        <div id="services" className="footer-section-target"><Services /></div>
        <HowItWorks />
        <WhyChooseUs />
        <div id="testimonials" className="footer-section-target"><Testimonials /></div>
        <div id="contact" className="footer-section-target"><Book /></div>
      </main>
      <Footer />
    </>
  );
}

function AboutPage() {
  return <><AnnouncementBar /><main><About /></main></>;
}

function UnitedStatesPage() {
  return <><AnnouncementBar /><Navbar /><main><UnitedStates /></main><Footer /></>;
}

function DestinationsPage() {
  return <><AnnouncementBar /><Navbar /><main><Destinations /></main><Footer /></>;
}

function UnitedKingdomPage() {
  return <><AnnouncementBar /><Navbar /><main><UnitedKingdom /></main><Footer /></>;
}

function ProgramsPage() {
  return <><AnnouncementBar /><Navbar /><main><Programs /></main><Footer /></>;
}

function ContactPage() {
  return <><AnnouncementBar /><Navbar /><main><Contact /></main><Footer /></>;
}

function FlightBookingPage() {
  return <><AnnouncementBar /><Navbar /><main><FlightBooking /></main><Footer /></>;
}

function BookPage() {
  return <><AnnouncementBar /><Navbar /><main><Book /></main><Footer /></>;
}

function CareerPage() {
  return <><AnnouncementBar /><Navbar /><main><Career /></main><Footer /></>;
}

function BlogPage() {
  return <><AnnouncementBar /><Navbar /><main><Blog /></main><Footer /></>;
}

function BlogArticlePage() {
  return <><AnnouncementBar /><Navbar /><main><BlogPost /></main><Footer /></>;
}

function AdminBlogPage() {
  // The admin page deliberately has no public navigation or footer.
  return <main><AdminBlog /></main>;
}

function App() {
  return (
    <BrowserRouter>
      <GoogleAnalytics />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/programs" element={<ProgramsPage />} />
        <Route path="/destinations" element={<DestinationsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/destinations/united-states" element={<UnitedStatesPage />} />
        <Route path="/destinations/united-kingdom" element={<UnitedKingdomPage />} />
        <Route path="/destinations/canada" element={<Canada />} />
        <Route path="/destinations/australia" element={<Australia />} />
        <Route path="/destinations/new-zealand" element={<NewZealand />} />
        <Route path="/destinations/ireland" element={<Ireland />} />
        <Route path="/destinations/europe" element={<Europe />} />
        <Route path="/destinations/asia" element={<Asia />} />
        <Route path="/flight-booking" element={<FlightBookingPage />} />
        <Route path="/book" element={<BookPage />} />
        <Route path="/career" element={<CareerPage />} />

        {/* Blog */}
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogArticlePage />} />
        <Route path="/admin/blog" element={<AdminBlogPage />} />
        <Route path="/admin/slider" element={<AdminSlider />} />
      </Routes>
      <WhatsAppButton />
    </BrowserRouter>
  );
}

export default App;
