import { useMemo, useState } from 'react'

const universities = [
  {
    id: 1,
    name: 'Trinity College Dublin',
    location: 'Dublin',
    description:
      'A historic Irish university offering a broad range of undergraduate and postgraduate study opportunities for international students.',
    image:
      'https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?auto=format&fit=crop&w=1200&q=80',
    programs: [
      {
        name: 'Business',
        level: 'Undergraduate',
        category: 'Business',
      },
      {
        name: 'Computer Science',
        level: 'Undergraduate',
        category: 'Technology',
      },
      {
        name: 'Engineering',
        level: 'Undergraduate',
        category: 'Engineering',
      },
      {
        name: 'Law',
        level: 'Undergraduate',
        category: 'Law',
      },
      {
        name: 'MSc Computer Science',
        level: 'Postgraduate',
        category: 'Technology',
      },
      {
        name: 'MSc Business Analytics',
        level: 'Postgraduate',
        category: 'Business',
      },
    ],
  },

  {
    id: 2,
    name: 'University College Dublin',
    location: 'Dublin',
    description:
      'A major Irish university with a wide selection of programmes across business, engineering, technology, health, science and other disciplines.',
    image:
      'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
    programs: [
      {
        name: 'Business',
        level: 'Undergraduate',
        category: 'Business',
      },
      {
        name: 'Computer Science',
        level: 'Undergraduate',
        category: 'Technology',
      },
      {
        name: 'Engineering',
        level: 'Undergraduate',
        category: 'Engineering',
      },
      {
        name: 'Health Sciences',
        level: 'Undergraduate',
        category: 'Health',
      },
      {
        name: 'MSc Business Analytics',
        level: 'Postgraduate',
        category: 'Business',
      },
      {
        name: 'MSc Computer Science',
        level: 'Postgraduate',
        category: 'Technology',
      },
    ],
  },

  {
    id: 3,
    name: 'University College Cork',
    location: 'Cork',
    description:
      'A leading university in Cork offering international students study opportunities across business, science, technology, health and the humanities.',
    image:
      'https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1200&q=80',
    programs: [
      {
        name: 'Business',
        level: 'Undergraduate',
        category: 'Business',
      },
      {
        name: 'Computer Science',
        level: 'Undergraduate',
        category: 'Technology',
      },
      {
        name: 'Engineering',
        level: 'Undergraduate',
        category: 'Engineering',
      },
      {
        name: 'Health Sciences',
        level: 'Undergraduate',
        category: 'Health',
      },
      {
        name: 'MSc Business Analytics',
        level: 'Postgraduate',
        category: 'Business',
      },
      {
        name: 'MSc Data Science',
        level: 'Postgraduate',
        category: 'Technology',
      },
    ],
  },

  {
    id: 4,
    name: 'University of Galway',
    location: 'Galway',
    description:
      'A university on Ireland’s west coast offering programmes across business, engineering, science, health, technology and the arts.',
    image:
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
    programs: [
      {
        name: 'Business',
        level: 'Undergraduate',
        category: 'Business',
      },
      {
        name: 'Computer Science',
        level: 'Undergraduate',
        category: 'Technology',
      },
      {
        name: 'Engineering',
        level: 'Undergraduate',
        category: 'Engineering',
      },
      {
        name: 'Health Sciences',
        level: 'Undergraduate',
        category: 'Health',
      },
      {
        name: 'MSc Computer Science',
        level: 'Postgraduate',
        category: 'Technology',
      },
      {
        name: 'MSc Business Analytics',
        level: 'Postgraduate',
        category: 'Business',
      },
    ],
  },

  {
    id: 5,
    name: 'Dublin City University',
    location: 'Dublin',
    description:
      'A modern Irish university with career-focused programmes across business, computing, engineering, health and other areas.',
    image:
      'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1200&q=80',
    programs: [
      {
        name: 'Business Studies',
        level: 'Undergraduate',
        category: 'Business',
      },
      {
        name: 'Computer Science',
        level: 'Undergraduate',
        category: 'Technology',
      },
      {
        name: 'Engineering',
        level: 'Undergraduate',
        category: 'Engineering',
      },
      {
        name: 'Health and Society',
        level: 'Undergraduate',
        category: 'Health',
      },
      {
        name: 'MSc Computing',
        level: 'Postgraduate',
        category: 'Technology',
      },
      {
        name: 'MSc Business Analytics',
        level: 'Postgraduate',
        category: 'Business',
      },
    ],
  },

  {
    id: 6,
    name: 'University of Limerick',
    location: 'Limerick',
    description:
      'An Irish university offering a broad range of undergraduate and postgraduate programmes with a strong focus on practical learning and careers.',
    image:
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    programs: [
      {
        name: 'Business',
        level: 'Undergraduate',
        category: 'Business',
      },
      {
        name: 'Computer Science',
        level: 'Undergraduate',
        category: 'Technology',
      },
      {
        name: 'Engineering',
        level: 'Undergraduate',
        category: 'Engineering',
      },
      {
        name: 'Health Sciences',
        level: 'Undergraduate',
        category: 'Health',
      },
      {
        name: 'MSc Artificial Intelligence',
        level: 'Postgraduate',
        category: 'Technology',
      },
      {
        name: 'Master of Business Administration',
        level: 'Postgraduate',
        category: 'Business',
      },
    ],
  },
]

const categories = [
  'All',
  'Business',
  'Technology',
  'Engineering',
  'Health',
  'Law',
]

const levels = [
  'All',
  'Undergraduate',
  'Postgraduate',
]

function Ireland() {
  const [search, setSearch] = useState('')
  const [level, setLevel] = useState('All')
  const [category, setCategory] = useState('All')

  const filteredUniversities = useMemo(() => {
    const searchTerm = search.trim().toLowerCase()

    return universities
      .map((university) => {
        const universityMatches =
          !searchTerm ||
          university.name.toLowerCase().includes(searchTerm) ||
          university.location.toLowerCase().includes(searchTerm)

        const programs = university.programs.filter((program) => {
          const matchesSearch =
            !searchTerm ||
            university.name.toLowerCase().includes(searchTerm) ||
            university.location.toLowerCase().includes(searchTerm) ||
            program.name.toLowerCase().includes(searchTerm)

          const matchesLevel =
            level === 'All' || program.level === level

          const matchesCategory =
            category === 'All' ||
            program.category === category

          return (
            matchesSearch &&
            matchesLevel &&
            matchesCategory
          )
        })

        if (universityMatches && !searchTerm) {
          return {
            ...university,
            programs:
              level === 'All' && category === 'All'
                ? university.programs
                : programs,
          }
        }

        if (programs.length > 0) {
          return {
            ...university,
            programs,
          }
        }

        return null
      })
      .filter(Boolean)
  }, [search, level, category])

  return (
    <main className="ireland-page">
      {/* HERO */}
      <section className="ireland-hero">
        <div className="ireland-hero__overlay" />

        <div className="ireland-container ireland-hero__content">
          <p className="ireland-hero__eyebrow">
            🇮🇪 STUDY IN IRELAND
          </p>

          <h1>
            Find Your University in Ireland
          </h1>

          <p className="ireland-hero__description">
            Explore universities, programmes and study opportunities
            in Ireland. Let Usben Consults help you find the right
            pathway for your academic and career goals.
          </p>

          <a
            href="#ireland-universities"
            className="ireland-button ireland-button--hero"
          >
            Explore Universities ↓
          </a>
        </div>
      </section>

      {/* INTRO */}
      <section className="ireland-intro">
        <div className="ireland-container ireland-intro__grid">
          <div>
            <p className="ireland-section__eyebrow">
              YOUR STUDY JOURNEY
            </p>

            <h2>
              Build Your Future in Ireland
            </h2>
          </div>

          <div>
            <p>
              Ireland offers international students a wide range
              of higher education opportunities across business,
              technology, engineering, health, law, science and
              other disciplines.
            </p>

            <p>
              From Dublin to Cork, Galway and Limerick, Usben
              Consults can help you explore suitable universities
              and programmes for your academic background and
              future ambitions.
            </p>
          </div>
        </div>
      </section>

      {/* SEARCH */}
      <section
        id="ireland-universities"
        className="ireland-search-section"
      >
        <div className="ireland-container">
          <div className="ireland-section-heading">
            <p className="ireland-section__eyebrow">
              FIND YOUR PROGRAMME
            </p>

            <h2>
              Explore Universities & Programmes
            </h2>

            <p>
              Search by university, city or programme and
              filter your options by study level and area.
            </p>
          </div>

          <div className="ireland-filters">
            <div className="ireland-search">
              <label htmlFor="ireland-search">
                Search
              </label>

              <input
                id="ireland-search"
                type="text"
                placeholder="Search university or programme..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />
            </div>

            <div className="ireland-filter">
              <label htmlFor="ireland-level">
                Study Level
              </label>

              <select
                id="ireland-level"
                value={level}
                onChange={(event) =>
                  setLevel(event.target.value)
                }
              >
                {levels.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="ireland-filter">
              <label htmlFor="ireland-category">
                Study Area
              </label>

              <select
                id="ireland-category"
                value={category}
                onChange={(event) =>
                  setCategory(event.target.value)
                }
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {filteredUniversities.length > 0 ? (
            <div className="ireland-universities">
              {filteredUniversities.map((university) => (
                <article
                  className="ireland-university"
                  key={university.id}
                >
                  <div className="ireland-university__image-wrap">
                    {/* <img
                      className="ireland-university__image"
                      src={university.image}
                      alt={`${university.name} campus`}
                      loading="lazy"
                    /> */}
                  </div>

                  <div className="ireland-university__body">
                    <div className="ireland-university__location">
                      📍 {university.location}
                    </div>

                    <h3>{university.name}</h3>

                    <p className="ireland-university__description">
                      {university.description}
                    </p>

                    <h4 className="ireland-program-heading">
                      Popular Study Areas
                    </h4>

                    <div className="ireland-programs">
                      {university.programs.map(
                        (program, index) => (
                          <div
                            className="ireland-program"
                            key={`${university.id}-${program.name}-${index}`}
                          >
                            <div>
                              <strong>
                                {program.name}
                              </strong>

                              <span>
                                {program.level}
                              </span>
                            </div>

                            <small>
                              {program.category}
                            </small>
                          </div>
                        )
                      )}
                    </div>

                    <div className="ireland-university__actions">
                      <a
                        href={`mailto:info@usbenconsults.com?subject=${encodeURIComponent(
                          `Ireland University Application - ${university.name}`
                        )}`}
                        className="ireland-button ireland-button--primary"
                      >
                         Ask About Programmes
                      </a>

                      {/* <a
                        href={`mailto:info@usbenconsults.com?subject=${encodeURIComponent(
                          `Ireland Programme Enquiry - ${university.name}`
                        )}`}
                        className="ireland-button ireland-button--secondary"
                      >
                        Ask About Programmes
                      </a> */}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="ireland-no-results">
              <h3>No programmes found</h3>

              <p>
                Try changing your search or selecting a
                different study level or study area.
              </p>

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

      {/* HOW IT WORKS */}
      <section className="ireland-how">
        <div className="ireland-container">
          <div className="ireland-section-heading">
            <p className="ireland-section__eyebrow">
              HOW IT WORKS
            </p>

            <h2>
              How to Study in Ireland
            </h2>

            <p>
              We can guide you through the major stages of
              your international study journey.
            </p>
          </div>

          <div className="ireland-steps">
            <div className="ireland-step">
              <span>01</span>

              <h3>
                Choose Your Programme
              </h3>

              <p>
                Explore universities and programmes that
                match your academic background and career
                goals.
              </p>
            </div>

            <div className="ireland-step">
              <span>02</span>

              <h3>
                Prepare Your Documents
              </h3>

              <p>
                Prepare your academic records and other
                supporting documents required for your
                application.
              </p>
            </div>

            <div className="ireland-step">
              <span>03</span>

              <h3>
                Apply to Your University
              </h3>

              <p>
                Submit your application and work towards
                receiving an offer from your chosen
                institution.
              </p>
            </div>

            <div className="ireland-step">
              <span>04</span>

              <h3>
                Prepare for Your Journey
              </h3>

              <p>
                Once your admission is secured, prepare
                for your visa, accommodation, travel and
                arrival in Ireland.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* CTA */}
      <section className="ireland-cta">
        <div className="ireland-container">
          <div className="ireland-cta__content">
            <p className="ireland-section__eyebrow">
              READY TO START?
            </p>

            <h2>
              Your Ireland Study Journey Starts Here
            </h2>

            <p>
              Tell us what you want to study and we will
              help you explore suitable university and
              programme options.
            </p>

            <a
              href="mailto:info@usbenconsults.com?subject=Ireland%20Study%20Consultation"
              className="ireland-button ireland-button--cta"
            >
              Start Your Application
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Ireland