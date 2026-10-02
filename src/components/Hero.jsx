// import { useCallback, useEffect, useRef, useState } from 'react'
// import { heroSlides } from '../data/data.js'

// const AUTOPLAY_DELAY = 5000

// function Hero() {
//   const [current, setCurrent] = useState(0)
//   const [paused, setPaused] = useState(false)
//   const touchStartX = useRef(null)

//   const total = heroSlides.length

//   const goTo = useCallback((index) => {
//     setCurrent(((index % total) + total) % total)
//   }, [total])

//   const goNext = useCallback(() => goTo(current + 1), [current, goTo])
//   const goPrev = useCallback(() => goTo(current - 1), [current, goTo])

//   useEffect(() => {
//     if (paused) return undefined
//     const timer = setInterval(() => {
//       setCurrent((c) => (c + 1) % total)
//     }, AUTOPLAY_DELAY)
//     return () => clearInterval(timer)
//   }, [paused, total])

//   const scrollToSection = (id) => {
//     const el = document.getElementById(id)
//     if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
//   }

//   const handleTouchStart = (e) => {
//     touchStartX.current = e.touches[0].clientX
//   }

//   const handleTouchEnd = (e) => {
//     if (touchStartX.current === null) return
//     const delta = e.changedTouches[0].clientX - touchStartX.current
//     if (Math.abs(delta) > 50) {
//       if (delta < 0) goNext()
//       else goPrev()
//     }
//     touchStartX.current = null
//   }

//   return (
//     <section
//       id="hero"
//       className="hero"
//       onMouseEnter={() => setPaused(true)}
//       onMouseLeave={() => setPaused(false)}
//       onTouchStart={handleTouchStart}
//       onTouchEnd={handleTouchEnd}
//       aria-roledescription="carousel"
//       aria-label="Featured study abroad highlights"
//     >
//       <div className="hero__track">
//         {heroSlides.map((slide, index) => (
//           <div
//             key={slide.id}
//             className={`hero__slide ${index === current ? 'is-active' : ''}`}
//             style={{ backgroundImage: `url(${slide.image})` }}
//             aria-hidden={index !== current}
//           >
//             <div className="hero__overlay" />
//           </div>
//         ))}
//       </div>

//       <div className="hero__content">
//         {/* <p className="hero__eyebrow">GlobalStudy Education Consultants</p> */}
//         <h1 className="hero__heading">{heroSlides[current].heading}</h1>
//         <p className="hero__text">{heroSlides[current].text}</p>
//         <div className="hero__actions">
//           <button
//             className="btn btn--primary btn--large"
//             onClick={() => scrollToSection(heroSlides[current].buttonTarget)}
//           >
//             {heroSlides[current].buttonText}
//           </button>
//         </div>
//       </div>

//       <button className="hero__nav hero__nav--prev" onClick={goPrev} aria-label="Previous slide">
//         <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
//           <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//         </svg>
//       </button>
//       <button className="hero__nav hero__nav--next" onClick={goNext} aria-label="Next slide">
//         <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
//           <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//         </svg>
//       </button>

//       <div className="hero__dots" role="tablist" aria-label="Slide navigation">
//         {heroSlides.map((slide, index) => (
//           <button
//             key={slide.id}
//             className={`hero__dot ${index === current ? 'is-active' : ''}`}
//             onClick={() => goTo(index)}
//             role="tab"
//             aria-selected={index === current}
//             aria-label={`Go to slide ${index + 1}`}
//           />
//         ))}
//       </div>

//       <div className="hero__scroll-cue" aria-hidden="true">
//         <span />
//       </div>
//     </section>
//   )
// }

// export default Hero


import { useCallback, useEffect, useRef, useState } from 'react'

const AUTOPLAY_DELAY = 2300

function Hero() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const touchStartX = useRef(null)

  // =====================================================
  // ADD YOUR SLIDING IMAGES HERE
  // =====================================================
  //
  // Put your images inside:
  //
  // public/images/
  //
  // Then write the image path inside src.
  //
  // Example:
  // <img src="/images/hero1.jpg" />
  //
  // =====================================================

  const slides = [
    {
      image: '/images/hero1.jpg',
      heading: 'Study Abroad With Confidence',
      text: 'Get expert guidance to study at top universities around the world.',
      buttonText: 'Get Started',
      buttonTarget: 'contact',
    },

    {
      image: '/images/hero2.jpg',
      heading: 'Your Future Starts Here',
      text: 'Discover international study opportunities that match your goals.',
      buttonText: 'Explore Programs',
      buttonTarget: '/programs',
    },

    {
      image: '/images/hero2.jpg',
      heading: 'Turn Your Dreams Into Reality',
      text: 'From application to admission, we are here to guide you every step of the way.',
      buttonText: 'Contact Us',
      buttonTarget: 'contact',
    },

    // ADD MORE SLIDES HERE
    //
    // {
    //   image: '/images/hero4.jpg',
    //   heading: 'Study In Your Dream Country',
    //   text: 'Start your international education journey today.',
    //   buttonText: 'Learn More',
    //   buttonTarget: 'contact',
    // },
  ]

  const total = slides.length

  // =====================================================
  // GO TO SLIDE
  // =====================================================

  const goTo = useCallback(
    (index) => {
      setCurrent(((index % total) + total) % total)
    },
    [total]
  )

  const goNext = useCallback(() => {
    goTo(current + 1)
  }, [current, goTo])

  const goPrev = useCallback(() => {
    goTo(current - 1)
  }, [current, goTo])

  // =====================================================
  // AUTOMATIC SLIDING
  // =====================================================

  useEffect(() => {
    if (paused || total <= 1) return

    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % total)
    }, AUTOPLAY_DELAY)

    return () => clearInterval(timer)
  }, [paused, total])

  // =====================================================
  // SCROLL TO SECTION
  // =====================================================

  const scrollToSection = (id) => {
    const element = document.getElementById(id)

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  // =====================================================
  // MOBILE SWIPE
  // =====================================================

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return

    const delta =
      e.changedTouches[0].clientX - touchStartX.current

    if (Math.abs(delta) > 50) {
      if (delta < 0) {
        goNext()
      } else {
        goPrev()
      }
    }

    touchStartX.current = null
  }

  // =====================================================
  // HERO
  // =====================================================

  return (
    <section
      id="hero"
      className="hero"

      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}

      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}

      aria-roledescription="carousel"
      aria-label="Featured study abroad highlights"
    >

      {/* ===============================================
          SLIDING IMAGES
      ================================================ */}

      <div className="hero__track">

        {slides.map((slide, index) => (
          <div
            key={index}
            className={`hero__slide ${
              index === current ? 'is-active' : ''
            }`}
            aria-hidden={index !== current}
          >

            {/* YOUR IMAGE */}
            <img
              src={slide.image}
              alt={slide.heading}
              className="hero__image"
            />

            {/* DARK OVERLAY */}
            <div className="hero__overlay" />

          </div>
        ))}

      </div>


      {/* ===============================================
          HERO CONTENT
      ================================================ */}

      <div className="hero__content">

        <h1 className="hero__heading">
          {slides[current].heading}
        </h1>

        <p className="hero__text">
          {slides[current].text}
        </p>

        <div className="hero__actions">

          <button
            className="btn btn--primary btn--large"
            onClick={() =>
              scrollToSection(
                slides[current].buttonTarget
              )
            }
          >
            {slides[current].buttonText}
          </button>

        </div>

      </div>


      {/* ===============================================
          PREVIOUS BUTTON
      ================================================ */}

      <button
        className="hero__nav hero__nav--prev"
        onClick={goPrev}
        aria-label="Previous slide"
      >
        ‹
      </button>


      {/* ===============================================
          NEXT BUTTON
      ================================================ */}

      <button
        className="hero__nav hero__nav--next"
        onClick={goNext}
        aria-label="Next slide"
      >
        ›
      </button>


      {/* ===============================================
          SLIDE DOTS
      ================================================ */}

      <div
        className="hero__dots"
        role="tablist"
        aria-label="Slide navigation"
      >

        {slides.map((slide, index) => (
          <button
            key={index}
            className={`hero__dot ${
              index === current ? 'is-active' : ''
            }`}
            onClick={() => goTo(index)}
            role="tab"
            aria-selected={index === current}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}

      </div>


      {/* ===============================================
          SCROLL INDICATOR
      ================================================ */}

      <div
        className="hero__scroll-cue"
        aria-hidden="true"
      >
        <span />
      </div>

    </section>
  )
}

export default Hero


