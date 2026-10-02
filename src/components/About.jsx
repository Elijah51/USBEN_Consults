import { useEffect, useRef, useState } from 'react'
import { stats } from '../data/data.js'

import Navbar from './Navbar'
import Footer from './Footer'


function Counter({ value, suffix }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true

            const duration = 1400
            const startTime = performance.now()

            const step = (now) => {
              const progress = Math.min(
                (now - startTime) / duration,
                1
              )

              const eased = 1 - Math.pow(1 - progress, 3)

              setCount(Math.round(eased * value))

              if (progress < 1) {
                requestAnimationFrame(step)
              }
            }

            requestAnimationFrame(step)
          }
        })
      },
      { threshold: 0.4 }
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [value])

  return (
    <span ref={ref} className="about__stat-value">
      {count}
      {suffix}
    </span>
  )
}


function About() {
  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      <main className="about-page">

        {/* ABOUT HERO */}
        <section className="about-page__hero">
          <div className="container">

            <p className="section__eyebrow">
              About Usben Consults Ltd
            </p>

            <h1>
              {/* Your Trusted Partner for Global Education */}
            </h1>

            <p>
              Helping ambitious students achieve their dreams
              of studying abroad.
            </p>

          </div>
        </section>


        {/* ABOUT CONTENT */}
        <section className="section about">
          <div className="container about__grid">

            {/* IMAGE */}
            <div className="about__image-wrap">
              <img
                className="about__image"
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80"
                alt="International students walking together on a university campus"
                loading="lazy"
              />
            </div>


            {/* CONTENT */}
            <div className="about__content">

              <p className="section__eyebrow">
                Who we are?
              </p>

              <h2 className="section__heading">
                Your Trusted Partner for Global Services including:
              </h2>

              <p className="about__paragraph">
                1. Study Abroad Consulting: Guidance and support for international education opportunities. <br />
2. Visa Application & Support: Assistance with processing travel and study visas, including proof of funds (POF) support. <br />
3. Travel Arrangements: Flight and accommodation reservation services.
4. Other Services: Information technology and finance-related consulting.
              </p>

              <p className="about__paragraph">
               
              </p>


              {/* STATISTICS */}
              {/* <div className="about__stats">

                {stats.map((stat) => (
                  <div
                    className="about__stat"
                    key={stat.id}
                  >

                    <Counter
                      value={stat.value}
                      suffix={stat.suffix}
                    />

                    <span className="about__stat-label">
                      {stat.label}
                    </span>

                  </div>
                ))}

              </div> */}

            </div>

          </div>
        </section>

      </main>

      {/* FOOTER */}
      <Footer />
    </>
  )
}


export default About