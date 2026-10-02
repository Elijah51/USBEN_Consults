import { destinations } from '../data/data.js'
import useScrollReveal from '../hooks/useScrollReveal.js'

function DestinationCard({ destination, index }) {
  const [ref, visible] = useScrollReveal()

  return (
    <div
      ref={ref}
      className={`destination-card ${visible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <img
        className="destination-card__image"
        src={destination.image}
        alt={`${destination.country} study destination`}
        loading="lazy"
      />
      <div className="destination-card__overlay" />
      <div className="destination-card__content">
        <img
  className="destination-card__flag"
  src={destination.flag}
  alt={`${destination.country} flag`}
/>
        <h3 className="destination-card__title">{destination.country}</h3>
        <p className="destination-card__description">{destination.description}</p>
        <a className="destination-card__button" href="#programs">
          Explore Destination
        </a>
      </div>
    </div>
  )
}

function Destinations() {
  return (
    <section id="destinations" className="section destinations">
      <div className="container">
        <div className="section__header">
          <p className="section__eyebrow">Where You Could Study</p>
          <h2 className="section__heading">Popular Study Destinations</h2>
        </div>

        <div className="destinations__grid">
          {destinations.map((destination, index) => (
            <DestinationCard destination={destination} key={destination.id} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Destinations
