import { useEffect } from "react"
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom"

import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Services from "./components/Services"
import HowItWorks from "./components/HowItWorks"
import WhyChooseUs from "./components/WhyChooseUs"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import Book from "./components/Book"
import FlightBooking from "./components/FlightBooking"
import About from "./components/About"
import Destinations from "./components/Destinations"
import Programs from "./components/Programs"
import Career from "./components/Career"
import AnnouncementBar from "./components/AnnouncementBar"
import WhatsAppButton from "./components/WhatsAppButton"


// =====================================================
// HOME PAGE SECTION SCROLL
// =====================================================

function Home() {
  const location = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const section = params.get("section")

    if (!section) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })

      return
    }

    // Give React a moment to render the page
    const timer = setTimeout(() => {
      const element = document.getElementById(section)

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [location.search])

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


        {/* TESTIMONIALS
            If your Testimonials section is inside
            WhyChooseUs, you can change the ID there.
        */}
        <div
          id="testimonials"
          className="footer-section-target"
        >
          {/* Testimonials section can be placed here if you have one */}
        </div>


        {/* CONTACT */}
        <div id="contact" className="footer-section-target">
          <Contact />
        </div>

      </main>

      <Footer />
    </>
  )
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
  )
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
  )
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
  )
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
  )
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
  )
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
  )
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
  )
}


// =====================================================
// APP
// =====================================================

function App() {
  return (
    <BrowserRouter>

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
  )
}

export default App