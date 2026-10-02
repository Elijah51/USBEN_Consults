import { howItWorks } from '../data/data.js'
import useScrollReveal from '../hooks/useScrollReveal.js'

function Step({ step, index }) {
  const [ref, visible] = useScrollReveal()

  return (
    <div
      ref={ref}
      className={`how-step ${visible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <span className="how-step__number">{step.number}</span>
      <h3 className="how-step__title">{step.title}</h3>
      <p className="how-step__description">{step.description}</p>
    </div>
  )
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="section how-it-works">
      <div className="container">
        <div className="section__header">
          <p className="section__eyebrow">The Process</p>
          <h2 className="section__heading">How It Works</h2>
        </div>

        <div className="how-it-works__steps">
          <div className="how-it-works__line" aria-hidden="true" />
          {howItWorks.map((step, index) => (
            <Step step={step} key={step.id} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
