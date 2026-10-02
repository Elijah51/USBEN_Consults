import { whyChooseUs } from '../data/data.js'

function WhyChooseUs() {
  return (
    <section className="section why-choose">
      <div className="container why-choose__grid">
        <div className="why-choose__image-wrap">
          <img
            className="why-choose__image"
            src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1000&q=80"
            alt="Advisor guiding a student through study abroad paperwork"
            loading="lazy"
          />
        </div>

        <div className="why-choose__content">
          <p className="section__eyebrow">Why Usben</p>
          <h2 className="section__heading">Why Choose Usben?</h2>
          <ul className="why-choose__list">
            {whyChooseUs.map((item) => (
              <li className="why-choose__item" key={item.id}>
                <span className="why-choose__check" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <div>
                  <h3 className="why-choose__item-title">{item.title}</h3>
                  <p className="why-choose__item-description">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
