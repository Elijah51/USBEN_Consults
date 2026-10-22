
import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AUTOPLAY_DELAY = 2300

function Hero() {
  const navigate = useNavigate()

  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const touchStartX = useRef(null)

  // ==========================================
  // HERO SLIDES
  // ==========================================

  const slides = [
    {
      image: '/images/hero1.jpg',
      heading: 'Study Abroad With Confidence',
      text: 'Get expert guidance to study at top universities around the world.',
      buttonText: 'Get Started',
      buttonTarget: '/programs',
    },

    {
      image: '/images/hero2.jpg',
      heading: 'Your Future Starts Here',
      text: 'Discover international study opportunities that match your goals.',
      buttonText: 'Explore Programs',
      buttonTarget: '/destinations',
    },

    {
      image: '/images/Slider3.jpeg',
      heading: '.',
      text: '',
      buttonText: 'Explore Programs',
      buttonTarget: '/destinations',
    },

    // Add more slides here if needed.
  ]

  const total = slides.length

  // ==========================================
  // SLIDE NAVIGATION
  // ==========================================

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

  // ==========================================
  // AUTOMATIC SLIDING
  // ==========================================

  useEffect(() => {
    if (paused || total <= 1) return undefined

    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % total)
    }, AUTOPLAY_DELAY)

    return () => clearInterval(timer)
  }, [paused, total])

  // ==========================================
  // BUTTON ACTION
  // ==========================================

  const handleButtonClick = () => {
    const target = slides[current].buttonTarget

    if (!target) return

    // Navigate to another page, such as the Blog.
    if (target.startsWith('/')) {
      navigate(target)
      return
    }

    // Scroll to a section on the current page.
    const element = document.getElementById(target)

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  // ==========================================
  // MOBILE SWIPE
  // ==========================================

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

  // ==========================================
  // HERO SECTION
  // ==========================================

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
      {/* SLIDING IMAGES */}

      <div className="hero__track">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`hero__slide ${
              index === current ? 'is-active' : ''
            }`}
            aria-hidden={index !== current}
          >
            <img
              src={slide.image}
              alt={slide.heading || 'Study abroad opportunities'}
              className="hero__image"
            />

            <div className="hero__overlay" />
          </div>
        ))}
      </div>

      {/* HERO CONTENT */}

      {slides[current].heading && (
        <div className="hero__content">
          <h1 className="hero__heading">
            {slides[current].heading}
          </h1>

          {slides[current].text && (
            <p className="hero__text">
              {slides[current].text}
            </p>
          )}

          {slides[current].buttonText && (
            <div className="hero__actions">
              <button
                type="button"
                className="btn btn--primary btn--large"
                onClick={handleButtonClick}
              >
                {slides[current].buttonText}
              </button>
            </div>
          )}
        </div>
      )}

      {/* PREVIOUS SLIDE */}

      <button
        type="button"
        className="hero__nav hero__nav--prev"
        onClick={goPrev}
        aria-label="Previous slide"
      >
        ‹
      </button>

      {/* NEXT SLIDE */}

      <button
        type="button"
        className="hero__nav hero__nav--next"
        onClick={goNext}
        aria-label="Next slide"
      >
        ›
      </button>

      {/* SLIDE INDICATORS */}

      <div
        className="hero__dots"
        role="tablist"
        aria-label="Slide navigation"
      >
        {slides.map((slide, index) => (
          <button
            key={index}
            type="button"
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

      {/* SCROLL INDICATOR */}

      <div className="hero__scroll-cue" aria-hidden="true">
        <span />
      </div>
    </section>
  )
}

export default Hero

