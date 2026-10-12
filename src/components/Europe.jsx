import { useMemo, useState } from 'react'


const universities = [
  {
    id: 1,
    name: 'University of Amsterdam',
    country: 'Netherlands',
    city: 'Amsterdam',
    description:
      'A leading European university offering a wide range of undergraduate and postgraduate programmes in an international environment.',
    image:
      'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=1200&q=80',
    programs: [
      {
        name: 'Business Administration',
        level: 'Undergraduate',
        category: 'Business',
      },
      {
        name: 'Computer Science',
        level: 'Undergraduate',
        category: 'Technology',
      },
      {
        name: 'Economics',
        level: 'Undergraduate',
        category: 'Business',
      },
      {
        name: 'Artificial Intelligence',
        level: 'Postgraduate',
        category: 'Technology',
      },
      {
        name: 'Business Analytics',
        level: 'Postgraduate',
        category: 'Business',
      },
    ],
  },

  {
    id: 2,
    name: 'Technical University of Munich',
    country: 'Germany',
    city: 'Munich',
    description:
      'A major European university with strong study opportunities in engineering, technology, science, business and related fields.',
    image:
      'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=1200&q=80',
    programs: [
      {
        name: 'Mechanical Engineering',
        level: 'Undergraduate',
        category: 'Engineering',
      },
      {
        name: 'Computer Science',
        level: 'Undergraduate',
        category: 'Technology',
      },
      {
        name: 'Electrical Engineering',
        level: 'Undergraduate',
        category: 'Engineering',
      },
      {
        name: 'Data Engineering',
        level: 'Postgraduate',
        category: 'Technology',
      },
      {
        name: 'Management',
        level: 'Postgraduate',
        category: 'Business',
      },
    ],
  },

  {
    id: 3,
    name: 'KU Leuven',
    country: 'Belgium',
    city: 'Leuven',
    description:
      'A renowned European university providing international study opportunities across technology, engineering, business, science and other disciplines.',
    image:
      'https://images.unsplash.com/photo-1568792923760-d70635a89fdc?auto=format&fit=crop&w=1200&q=80',
    programs: [
      {
        name: 'Business Engineering',
        level: 'Undergraduate',
        category: 'Business',
      },
      {
        name: 'Engineering',
        level: 'Undergraduate',
        category: 'Engineering',
      },
      {
        name: 'Computer Science',
        level: 'Undergraduate',
        category: 'Technology',
      },
      {
        name: 'Artificial Intelligence',
        level: 'Postgraduate',
        category: 'Technology',
      },
      {
        name: 'Engineering Technology',
        level: 'Postgraduate',
        category: 'Engineering',
      },
    ],
  },

  {
    id: 4,
    name: 'University of Copenhagen',
    country: 'Denmark',
    city: 'Copenhagen',
    description:
      'An established European university offering study opportunities across science, health, business, social sciences and other fields.',
    image:
      'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=1200&q=80',
    programs: [
      {
        name: 'Computer Science',
        level: 'Undergraduate',
        category: 'Technology',
      },
      {
        name: 'Economics',
        level: 'Undergraduate',
        category: 'Business',
      },
      {
        name: 'Health Sciences',
        level: 'Undergraduate',
        category: 'Health',
      },
      {
        name: 'Data Science',
        level: 'Postgraduate',
        category: 'Technology',
      },
      {
        name: 'Public Health',
        level: 'Postgraduate',
        category: 'Health',
      },
    ],
  },

  {
    id: 5,
    name: 'University of Helsinki',
    country: 'Finland',
    city: 'Helsinki',
    description:
      'A research-focused European university with programmes spanning science, technology, business, health and social sciences.',
    image:
      'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=1200&q=80',
    programs: [
      {
        name: 'Computer Science',
        level: 'Undergraduate',
        category: 'Technology',
      },
      {
        name: 'Social Sciences',
        level: 'Undergraduate',
        category: 'Social Sciences',
      },
      {
        name: 'Science',
        level: 'Undergraduate',
        category: 'Science',
      },
      {
        name: 'Data Science',
        level: 'Postgraduate',
        category: 'Technology',
      },
      {
        name: 'Life Sciences',
        level: 'Postgraduate',
        category: 'Science',
      },
    ],
  },

  {
    id: 6,
    name: 'University of Warsaw',
    country: 'Poland',
    city: 'Warsaw',
    description:
      'A major European university offering a broad range of academic programmes and an international student environment.',
    image:
      'https://images.unsplash.com/photo-1519197924294-4ba991a11128?auto=format&fit=crop&w=1200&q=80',
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
        name: 'International Relations',
        level: 'Undergraduate',
        category: 'Social Sciences',
      },
      {
        name: 'Data Science',
        level: 'Postgraduate',
        category: 'Technology',
      },
      {
        name: 'International Business',
        level: 'Postgraduate',
        category: 'Business',
      },
    ],
  },

  {
    id: 7,
    name: 'University of Lisbon',
    country: 'Portugal',
    city: 'Lisbon',
    description:
      'A large European university offering programmes across business, engineering, technology, health, science and the humanities.',
    image:
      'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1200&q=80',
    programs: [
      {
        name: 'Business Management',
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
        name: 'Data Science',
        level: 'Postgraduate',
        category: 'Technology',
      },
      {
        name: 'Business Analytics',
        level: 'Postgraduate',
        category: 'Business',
      },
    ],
  },

  {
    id: 8,
    name: 'University of Barcelona',
    country: 'Spain',
    city: 'Barcelona',
    description:
      'A prominent Spanish university offering diverse study opportunities across business, technology, health, science and social sciences.',
    image:
      'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1200&q=80',
    programs: [
      {
        name: 'Business Administration',
        level: 'Undergraduate',
        category: 'Business',
      },
      {
        name: 'Computer Science',
        level: 'Undergraduate',
        category: 'Technology',
      },
      {
        name: 'Economics',
        level: 'Undergraduate',
        category: 'Business',
      },
      {
        name: 'Data Science',
        level: 'Postgraduate',
        category: 'Technology',
      },
      {
        name: 'International Business',
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
  'Science',
  'Social Sciences',
]

const levels = [
  'All',
  'Undergraduate',
  'Postgraduate',
]

function Europe() {
  const [search, setSearch] = useState('')
  const [country, setCountry] = useState('All')
  const [level, setLevel] = useState('All')
  const [category, setCategory] = useState('All')

  const countries = [
    'All',
    ...new Set(universities.map((university) => university.country)),
  ]

  const filteredUniversities = useMemo(() => {
    const searchTerm = search.trim().toLowerCase()

    return universities
      .map((university) => {
        const universityMatches =
          !searchTerm ||
          university.name.toLowerCase().includes(searchTerm) ||
          university.city.toLowerCase().includes(searchTerm) ||
          university.country.toLowerCase().includes(searchTerm)

        const countryMatches =
          country === 'All' || university.country === country

        const programs = university.programs.filter((program) => {
          const matchesSearch =
            !searchTerm ||
            university.name.toLowerCase().includes(searchTerm) ||
            university.city.toLowerCase().includes(searchTerm) ||
            university.country.toLowerCase().includes(searchTerm) ||
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

        if (
          universityMatches &&
          countryMatches &&
          !searchTerm
        ) {
          return {
            ...university,
            programs:
              level === 'All' && category === 'All'
                ? university.programs
                : programs,
          }
        }

        if (
          universityMatches &&
          countryMatches &&
          programs.length > 0
        ) {
          return {
            ...university,
            programs,
          }
        }

        return null
      })
      .filter(Boolean)
  }, [search, country, level, category])

  return (
    <main className="europe-page">
      {/* HERO */}
      <section className="europe-hero">
        <div className="europe-hero__overlay" />

        <div className="europe-container europe-hero__content">
          <p className="europe-hero__eyebrow">
            🇪🇺 STUDY IN EUROPE
          </p>

          <h1>
            Find Your University in Europe
          </h1>

          <p className="europe-hero__description">
            Explore universities, programmes and study opportunities
            across Europe. Let Usben Consults help you find the right
            destination for your academic and career goals.
          </p>

          <a
            href="#europe-universities"
            className="europe-button europe-button--hero"
          >
            Explore Universities ↓
          </a>
        </div>
      </section>

      {/* INTRO */}
      <section className="europe-intro">
        <div className="europe-container europe-intro__grid">
          <div>
            <p className="europe-section__eyebrow">
              YOUR STUDY JOURNEY
            </p>

            <h2>
              Explore Your Future Across Europe
            </h2>
          </div>

          <div>
            <p>
              Europe offers international students a wide variety
              of universities, academic systems, programmes and
              study destinations.
            </p>

            <p>
              From Germany and the Netherlands to Spain, Portugal,
              Finland, Poland, Belgium and Denmark, Usben Consults
              can help you explore options that fit your academic
              background and future plans.
            </p>
          </div>
        </div>
      </section>

      {/* SEARCH */}
      <section
        id="europe-universities"
        className="europe-search-section"
      >
        <div className="europe-container">
          <div className="europe-section-heading">
            <p className="europe-section__eyebrow">
              FIND YOUR PROGRAMME
            </p>

            <h2>
              Explore European Universities
            </h2>

            <p>
              Search by university, country, city or programme
              and filter your options according to your study
              level and area of interest.
            </p>
          </div>

          <div className="europe-filters">
            <div className="europe-search">
              <label htmlFor="europe-search">
                Search
              </label>

              <input
                id="europe-search"
                type="text"
                placeholder="Search university, city or programme..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />
            </div>

            <div className="europe-filter">
              <label htmlFor="europe-country">
                Country
              </label>

              <select
                id="europe-country"
                value={country}
                onChange={(event) =>
                  setCountry(event.target.value)
                }
              >
                {countries.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="europe-filter">
              <label htmlFor="europe-level">
                Study Level
              </label>

              <select
                id="europe-level"
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

            <div className="europe-filter">
              <label htmlFor="europe-category">
                Study Area
              </label>

              <select
                id="europe-category"
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
            <div className="europe-universities">
              {filteredUniversities.map((university) => (
                <article
                  className="europe-university"
                  key={university.id}
                >
                  <div className="europe-university__image-wrap">
                    {/* <img
                      className="europe-university__image"
                      src={university.image}
                      alt={`${university.name} campus`}
                      loading="lazy"
                    /> */}
                  </div>

                  <div className="europe-university__body">
                    <div className="europe-university__location">
                      📍 {university.city}, {university.country}
                    </div>

                    <h3>{university.name}</h3>

                    <p className="europe-university__description">
                      {university.description}
                    </p>

                    <h4 className="europe-program-heading">
                      Popular Study Areas
                    </h4>

                    <div className="europe-programs">
                      {university.programs.map(
                        (program, index) => (
                          <div
                            className="europe-program"
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

                    <div className="europe-university__actions">
                      <a
                        href={`mailto:info@usbenconsults.com?subject=${encodeURIComponent(
                          `Europe University Application - ${university.name}`
                        )}`}
                        className="europe-button europe-button--primary"
                      >
                        Ask About Programmes
                      </a>

                      {/* <a
                        href={`mailto:info@usbenconsults.com?subject=${encodeURIComponent(
                          `Europe Programme Enquiry - ${university.name}`
                        )}`}
                        className="europe-button europe-button--secondary"
                      >
                        Ask About Programmes
                      </a> */}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="europe-no-results">
              <h3>No programmes found</h3>

              <p>
                Try changing your search, country, study level
                or study area.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch('')
                  setCountry('All')
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
      <section className="europe-how">
        <div className="europe-container">
          <div className="europe-section-heading">
            <p className="europe-section__eyebrow">
              HOW IT WORKS
            </p>

            <h2>
              How to Study in Europe
            </h2>

            <p>
              We can guide you through the major stages of
              your international study journey.
            </p>
          </div>

          <div className="europe-steps">
            <div className="europe-step">
              <span>01</span>

              <h3>
                Choose Your Destination
              </h3>

              <p>
                Explore European countries, universities and
                programmes that match your academic and career
                goals.
              </p>
            </div>

            <div className="europe-step">
              <span>02</span>

              <h3>
                Select Your Programme
              </h3>

              <p>
                Find a programme that matches your academic
                background, interests and future plans.
              </p>
            </div>

            <div className="europe-step">
              <span>03</span>

              <h3>
                Apply to Your University
              </h3>

              <p>
                Prepare your documents and submit your
                application to your chosen institution.
              </p>
            </div>

            <div className="europe-step">
              <span>04</span>

              <h3>
                Prepare for Your Journey
              </h3>

              <p>
                After admission, prepare for your visa,
                accommodation, travel and arrival.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* CTA */}
      <section className="europe-cta">
        <div className="europe-container">
          <div className="europe-cta__content">
            <p className="europe-section__eyebrow">
              READY TO START?
            </p>

            <h2>
              Your European Study Journey Starts Here
            </h2>

            <p>
              Tell us where and what you want to study, and
              we will help you explore suitable university
              and programme options.
            </p>

            <a
              href="mailto:info@usbenconsults.com?subject=Europe%20Study%20Consultation"
              className="europe-button europe-button--cta"
            >
              Start Your Application
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Europe