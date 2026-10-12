import { useMemo, useState } from 'react'


const universities = [
  {
    id: 'asu',
    name: 'Arizona State University',
    location: 'Tempe, Arizona',
    description:
      'Explore study options in computing, engineering, business and other fields at Arizona State University.',
    programs: [
      { name: 'Computer Science, BS', level: 'Undergraduate', category: 'Technology' },
      { name: 'Software Engineering, BS', level: 'Undergraduate', category: 'Technology' },
      { name: 'Computer Systems Engineering, BSE', level: 'Undergraduate', category: 'Engineering' },
      { name: 'Engineering Management, BSE', level: 'Undergraduate', category: 'Engineering' },
      { name: 'Industrial Engineering, BSE', level: 'Undergraduate', category: 'Engineering' },
      { name: 'Informatics, BS', level: 'Undergraduate', category: 'Technology' },
    ],
    source: 'Official ASU degree listings',
  },
  {
    id: 'arizona',
    name: 'University of Arizona',
    location: 'Tucson, Arizona',
    description:
      'Explore programs across business, engineering, computing, health and many other academic areas.',
    programs: [
      { name: 'Accounting', level: 'Undergraduate', category: 'Business' },
      { name: 'Aerospace Engineering', level: 'Undergraduate', category: 'Engineering' },
      { name: 'Computer Science', level: 'Undergraduate', category: 'Technology' },
      { name: 'Architecture', level: 'Undergraduate', category: 'Architecture' },
      { name: 'Applied Mathematics', level: 'Undergraduate', category: 'Science' },
    ],
    source: 'Official University of Arizona program listings',
  },
  {
    id: 'usf',
    name: 'University of South Florida',
    location: 'Tampa, Florida',
    description:
      'Explore computing, artificial intelligence, cybersecurity, business and engineering opportunities at USF.',
    programs: [
      { name: 'Computer Science, BS', level: 'Undergraduate', category: 'Technology' },
      { name: 'Artificial Intelligence, BS', level: 'Undergraduate', category: 'Technology' },
      { name: 'Cybersecurity, BS', level: 'Undergraduate', category: 'Technology' },
      { name: 'Computer Engineering, BS', level: 'Undergraduate', category: 'Engineering' },
      { name: 'Computer Science, MS', level: 'Graduate', category: 'Technology' },
      { name: 'Artificial Intelligence, MS', level: 'Graduate', category: 'Technology' },
      { name: 'Cybersecurity, MS', level: 'Graduate', category: 'Technology' },
      { name: 'Data Science and AI, PhD', level: 'Doctorate', category: 'Technology' },
    ],
    source: 'Official USF academic listings',
  },
  {
    id: 'illinois',
    name: 'University of Illinois Urbana-Champaign',
    location: 'Champaign, Illinois',
    description:
      'Explore a broad selection of undergraduate and graduate study options, including computing, engineering and business.',
    programs: [
      { name: 'Computer Science, BS', level: 'Undergraduate', category: 'Technology' },
      { name: 'Accountancy, BS', level: 'Undergraduate', category: 'Business' },
      { name: 'Accountancy + Data Science, BS', level: 'Undergraduate', category: 'Business' },
      { name: 'Aerospace Engineering, BS', level: 'Undergraduate', category: 'Engineering' },
      { name: 'Agricultural & Biological Engineering, BS', level: 'Undergraduate', category: 'Engineering' },
      { name: 'Computer Science + Economics, BS', level: 'Undergraduate', category: 'Technology' },
    ],
    source: 'Official UIUC 2026–2027 catalog',
  },
]

const levels = ['All', 'Undergraduate', 'Graduate', 'Doctorate']
const categories = ['All', 'Business', 'Technology', 'Engineering', 'Architecture', 'Science']

function UnitedStates() {
  const [search, setSearch] = useState('')
  const [level, setLevel] = useState('All')
  const [category, setCategory] = useState('All')

  const filteredUniversities = useMemo(() => {
    const query = search.trim().toLowerCase()

    return universities
      .map((university) => {
        const universityMatches =
          !query ||
          university.name.toLowerCase().includes(query) ||
          university.location.toLowerCase().includes(query)

        const programs = university.programs.filter((program) => {
          const programMatches =
            !query ||
            program.name.toLowerCase().includes(query) ||
            universityMatches

          return (
            programMatches &&
            (level === 'All' || program.level === level) &&
            (category === 'All' || program.category === category)
          )
        })

        return { ...university, programs }
      })
      .filter((university) => university.programs.length > 0)
  }, [search, level, category])

  return (
    <div className="usa-page">
      <section className="usa-hero">
        <div className="usa-hero__content">
          <span className="usa-hero__eyebrow">🇺🇸 STUDY IN THE UNITED STATES</span>
          <h1>Find Your University in the United States</h1>
          <p>
            Explore selected universities and programs in the USA and find an
            academic option that fits your study goals.
          </p>
          <a href="#usa-universities" className="usa-hero__button">
            Explore Universities ↓
          </a>
        </div>
      </section>

      <section className="usa-section" id="usa-universities">
        <div className="usa-container">
          <div className="usa-heading">
            <span>USA UNIVERSITIES</span>
            <h2>Universities & Programs</h2>
            <p>
              Search by university or program, then filter by study level and
              academic field.
            </p>
          </div>

          <div className="usa-filters">
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search university or program..."
              aria-label="Search university or program"
            />

            <select value={level} onChange={(event) => setLevel(event.target.value)}>
              {levels.map((item) => (
                <option key={item} value={item}>
                  {item === 'All' ? 'All Study Levels' : item}
                </option>
              ))}
            </select>

            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item === 'All' ? 'All Fields' : item}
                </option>
              ))}
            </select>
          </div>

          <div className="usa-results-count">
            Showing {filteredUniversities.length} {filteredUniversities.length === 1 ? 'university' : 'universities'}
          </div>

          {filteredUniversities.length > 0 ? (
            <div className="usa-university-grid">
              {filteredUniversities.map((university) => (
                <article className="usa-university-card" key={university.id}>
                  <div className="usa-university-card__top">
                    <div className="usa-university-card__flag">🇺🇸</div>
                    <div>
                      <p className="usa-university-card__location">📍 {university.location}</p>
                      <h3>{university.name}</h3>
                    </div>
                  </div>

                  <p className="usa-university-card__description">
                    {university.description}
                  </p>

                  <div className="usa-program-header">
                    <h4>Programs</h4>
                    <span>{university.programs.length} shown</span>
                  </div>

                  <div className="usa-program-list">
                    {university.programs.map((program) => (
                      <div className="usa-program" key={`${university.id}-${program.name}`}>
                        <div>
                          <strong>{program.name}</strong>
                          <span>{program.level}</span>
                        </div>
                        <small>{program.category}</small>
                      </div>
                    ))}
                  </div>

                  <div className="usa-card-actions">
                    <a
                      href={`mailto:info@usbenconsults.com?subject=${encodeURIComponent(`${university.name} - Study Enquiry`)}`}
                      className="usa-button usa-button--primary"
                    >
                      Ask About This University
                    </a>
                  </div>

                  <p className="usa-source-note">{university.source}</p>
                </article>
              ))}
            </div>
          ) : (
            <div className="usa-empty">
              <h3>No matching programs found</h3>
              <p>Try a different search term or reset one of the filters.</p>
              <button
                type="button"
                onClick={() => {
                  setSearch('')
                  setLevel('All')
                  setCategory('All')
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="usa-cta">
        <div className="usa-cta__content">
          <span>NEED HELP CHOOSING?</span>
          <h2>Let Us Help You Find the Right University</h2>
          <p>
            Tell us your preferred course, study level and destination. We can
            help you explore suitable options and the next application steps.
          </p>
          <a
            href="mailto:info@usbenconsults.com?subject=USA%20Study%20Consultation"
            className="usa-cta__button"
          >
            Speak With Us →
          </a>
        </div>
      </section>
    </div>
  )
}

export default UnitedStates
