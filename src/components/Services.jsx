// import { services } from '../data/data.js'
// import useScrollReveal from '../hooks/useScrollReveal.js'

import { Link } from 'react-router-dom'
import { services } from '../data/data.js'
import useScrollReveal from '../hooks/useScrollReveal.js'

function ServiceCard({ service, index }) {
  const [ref, visible] = useScrollReveal()

  return (
    <div
      ref={ref}
      className={`service-card ${visible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${index * 70}ms` }}
    >
      <span className="service-card__icon" aria-hidden="true">
        {service.icon}
      </span>
      <h3 className="service-card__title">{service.title}</h3>
      <p className="service-card__description">{service.description}</p>
      {/* <a className="service-card__link" href="#contact">
        Apply
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a> */}

      {/* ==============================
    BUTTON SECTION
============================== */}
<div className="service-card__button-box">
  <Link
    className="service-card__link"
    to={service.buttonLink || '#contact'}
  >
    {service.buttonText || 'Apply'}

    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </Link>
</div>
    </div>
  )
}

function Services() {
  return (
    <section id="services" className="section services">
      <div className="container">
        <div className="section__header">
          <p className="section__eyebrow">Our Services</p>
          <h2 className="section__heading">Helping You Every Step of the Way</h2>
        </div>

        <div className="services__grid">
          {services.map((service, index) => (
            <ServiceCard service={service} key={service.id} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}


export default Services
