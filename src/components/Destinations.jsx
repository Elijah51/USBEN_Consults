import { destinations } from '../data/data.js'
import { Link } from 'react-router-dom'
import useScrollReveal from '../hooks/useScrollReveal.js'
import SEO from '../components/SEO';

const destinationRoutes = {
  'United States': '/destinations/united-states',
  'United Kingdom': '/destinations/united-kingdom',
  'Canada': '/destinations/canada',
  'Australia': '/destinations/australia',
  'New Zealand': '/destinations/new-zealand',
  'Ireland': '/destinations/ireland',
  'Europe': '/destinations/europe',
  'Asia': '/destinations/asia',
}

function DestinationCard({ destination, index }) {
  const [ref, visible] = useScrollReveal()

  const country = destination.country.trim()
  const route = destinationRoutes[country]

  return (
    <div
      ref={ref}
      className={`destination-card ${
        visible ? 'is-visible' : ''
      }`}
      style={{
        transitionDelay: `${index * 60}ms`,
      }}
    >
      {/* DESTINATION IMAGE */}
      <img
        className="destination-card__image"
        src={destination.image}
        alt={`${country} study destination`}
        loading="lazy"
      />

      {/* OVERLAY */}
      <div className="destination-card__overlay" />

      {/* CONTENT */}
      <div className="destination-card__content">

        {/* FLAG */}
        <img
          className="destination-card__flag"
          src={destination.flag}
          alt={`${country} flag`}
        />

        {/* COUNTRY */}
        <h3 className="destination-card__title">
          {country}
        </h3>

        {/* DESCRIPTION */}
        <p className="destination-card__description">
          {destination.description}
        </p>

        {/* BUTTON */}
        {route ? (
          <Link
            className="destination-card__button"
            to={route}
          >
            Explore Destination
          </Link>
        ) : (
          <a
            className="destination-card__button"
            href="#programs"
          >
            Explore Destination
          </a>
        )}

      </div>
    </div>
  )
}

function Destinations() {
  return (
    <section
      id="destinations"
      className="section destinations"
    >

      <SEO
  title="Study Abroad Destinations | Usben Consults"
  description="Explore international study destinations and discover information about universities, admissions, and studying abroad."
  path="/destinations"
/>
      <div className="container">

        {/* SECTION HEADER */}
        <div className="section__header">
          <p className="section__eyebrow">
            Where You Could Study
          </p>

          <h2 className="section__heading">
            Popular Study Destinations
          </h2>
        </div>

        {/* DESTINATION GRID */}
        <div className="destinations__grid">
          {destinations.map((destination, index) => (
            <DestinationCard
              destination={destination}
              key={destination.id}
              index={index}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

export default Destinations