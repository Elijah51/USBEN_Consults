import { useMemo, useState } from 'react'
import { programFilters, programs } from '../data/data.js'

function Programs() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filteredPrograms = useMemo(() => {
    if (activeFilter === 'All') return programs
    return programs.filter((program) => program.category === activeFilter)
  }, [activeFilter])

  return (
    <section id="programs" className="section programs">
      <div className="container">
        <div className="section__header">
          <p className="section__eyebrow">Find Your Program</p>
          <h2 className="section__heading">Programs Built Around Your Goals</h2>
        </div>

        <div className="programs__filters" role="tablist" aria-label="Filter programs">
          {programFilters.map((filter) => (
            <button
              key={filter}
              role="tab"
              aria-selected={activeFilter === filter}
              className={`programs__filter-btn ${activeFilter === filter ? 'is-active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="programs__grid">
          {filteredPrograms.map((program) => (
            <div className="program-card" key={program.id}>
              <span className="program-card__tag">{program.category}</span>
              <h3 className="program-card__title">{program.title}</h3>
              <p className="program-card__description">{program.description}</p>
              <div className="program-card__footer">
                <span className="program-card__duration">{program.duration}</span>
                <a className="program-card__link" href="/book">
                  Apply Now
                </a>
              </div>
            </div>
          ))}

          {filteredPrograms.length === 0 && (
            <p className="programs__empty">No programs match this filter yet. Try another category.</p>
          )}
        </div>
      </div>
    </section>
  )
}

export default Programs
