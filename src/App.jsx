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

// Destination Pages
import UnitedStates from "./components/UnitedStates";
import UnitedKingdom from "./components/UnitedKingdom";
import Canada from "./components/Canada.jsx";
import Australia from "./components/Australia.jsx";
import NewZealand from "./components/NewZealand.jsx";
import Ireland from "./components/Ireland.jsx";
import Europe from "./components/Europe.jsx";
import Asia from "./components/Asia.jsx";


// =====================================================
// HOME PAGE SECTION SCROLL
// =====================================================

function Home() {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const section = params.get("section");

    if (!section) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    // Give React a moment to render the page
    const timer = setTimeout(() => {
      const element = document.getElementById(section);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [location.search]);

  return (
    <>
      <AnnouncementBar />

      <Navbar />

      <main>
        {/* HERO */}
        <Hero />

        {/* SERVICES */}
        <div id="services" className="footer-section-target">
          <Services />
        </div>

        {/* HOW IT WORKS */}
        <HowItWorks />

        {/* WHY CHOOSE US */}
        <WhyChooseUs />

        {/* TESTIMONIALS */}
        <div
          id="testimonials"
          className="footer-section-target"
        >
          {/* Testimonials section can be placed here if needed */}
        </div>

        {/* CONTACT / BOOKING SECTION */}
        <div id="contact" className="footer-section-target">
          <Book />
        </div>
      </main>

      <Footer />
    </>
  );
}


// =====================================================
// ABOUT PAGE
// =====================================================

function AboutPage() {
  return (
    <>
      <AnnouncementBar />

      <main>
        <About />
      </main>
    </>
  );
}


// =====================================================
// UNITED STATES PAGE
// =====================================================

function UnitedStatesPage() {
  return (
    <>
      <AnnouncementBar />

      <Navbar />

      <main>
        <UnitedStates />
      </main>

      <Footer />
    </>
  );
}


// =====================================================
// DESTINATIONS PAGE
// =====================================================

function DestinationsPage() {
  return (
    <>
      <AnnouncementBar />

      <Navbar />

      <main>
        <Destinations />
      </main>

      <Footer />
    </>
  );
}


// =====================================================
// UNITED KINGDOM PAGE
// =====================================================

function UnitedKingdomPage() {
  return (
    <>
      <AnnouncementBar />

      <Navbar />

      <main>
        <UnitedKingdom />
      </main>

      <Footer />
    </>
  );
}


// =====================================================
// PROGRAMS PAGE
// =====================================================

function ProgramsPage() {
  return (
    <>
      <AnnouncementBar />

      <Navbar />

      <main>
        <Programs />
      </main>

      <Footer />
    </>
  );
}


// =====================================================
// CONTACT PAGE
// =====================================================

function ContactPage() {
  return (
    <>
      <AnnouncementBar />

      <Navbar />

      <main>
        <Contact />
      </main>

      <Footer />
    </>
  );
}


// =====================================================
// FLIGHT BOOKING PAGE
// =====================================================

function FlightBookingPage() {
  return (
    <>
      <AnnouncementBar />

      <Navbar />

      <main>
        <FlightBooking />
      </main>

      <Footer />
    </>
  );
}


// =====================================================
// BOOKING PAGE
// =====================================================

function BookPage() {
  return (
    <>
      <AnnouncementBar />

      <Navbar />

      <main>
        <Book />
      </main>

      <Footer />
    </>
  );
}


// =====================================================
// CAREER PAGE
// =====================================================

function CareerPage() {
  return (
    <>
      <AnnouncementBar />

      <Navbar />

      <main>
        <Career />
      </main>

      <Footer />
    </>
  );
}


// =====================================================
// MAIN APP
// =====================================================

function App() {
  return (
    <BrowserRouter>

      {/* GOOGLE ANALYTICS */}
      <GoogleAnalytics />

      {/* WEBSITE ROUTES */}
      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* ABOUT */}
        <Route
          path="/about"
          element={<AboutPage />}
        />

        {/* PROGRAMS */}
        <Route
          path="/programs"
          element={<ProgramsPage />}
        />

        {/* DESTINATIONS */}
        <Route
          path="/destinations"
          element={<DestinationsPage />}
        />

        {/* CONTACT */}
        <Route
          path="/contact"
          element={<ContactPage />}
        />

        {/* UNITED STATES */}
        <Route
          path="/destinations/united-states"
          element={<UnitedStatesPage />}
        />

        {/* UNITED KINGDOM */}
        <Route
          path="/destinations/united-kingdom"
          element={<UnitedKingdomPage />}
        />

        {/* CANADA */}
        <Route
          path="/destinations/canada"
          element={<Canada />}
        />

        {/* AUSTRALIA */}
        <Route
          path="/destinations/australia"
          element={<Australia />}
        />

        {/* NEW ZEALAND */}
        <Route
          path="/destinations/new-zealand"
          element={<NewZealand />}
        />

        {/* IRELAND */}
        <Route
          path="/destinations/ireland"
          element={<Ireland />}
        />

        {/* EUROPE */}
        <Route
          path="/destinations/europe"
          element={<Europe />}
        />

        {/* ASIA */}
        <Route
          path="/destinations/asia"
          element={<Asia />}
        />

        {/* FLIGHT BOOKING */}
        <Route
          path="/flight-booking"
          element={<FlightBookingPage />}
        />

        {/* BOOK CONSULTATION */}
        <Route
          path="/book"
          element={<BookPage />}
        />

        {/* CAREER */}
        <Route
          path="/career"
          element={<CareerPage />}
        />

      </Routes>

      {/* FIXED WHATSAPP BUTTON */}
      <WhatsAppButton />

    </BrowserRouter>
  );
}

export default App;