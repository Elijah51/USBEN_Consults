import { useMemo, useState } from 'react'


const universities = [
  {
    id: 1,
    name: 'National University of Singapore',
    country: 'Singapore',
    city: 'Singapore',
    description:
      'A leading Asian university offering a wide range of programmes across business, technology, engineering, health and social sciences.',
    image:
      'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80',
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
    id: 2,
    name: 'Nanyang Technological University',
    country: 'Singapore',
    city: 'Singapore',
    description:
      'An internationally recognised university with strong opportunities in technology, engineering, business and science.',
    image:
      'https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&w=1200&q=80',
    programs: [
      {
        name: 'Computer Engineering',
        level: 'Undergraduate',
        category: 'Engineering',
      },
      {
        name: 'Computer Science',
        level: 'Undergraduate',
        category: 'Technology',
      },
      {
        name: 'Business',
        level: 'Undergraduate',
        category: 'Business',
      },
      {
        name: 'Artificial Intelligence',
        level: 'Postgraduate',
        category: 'Technology',
      },
      {
        name: 'Engineering',
        level: 'Postgraduate',
        category: 'Engineering',
      },
    ],
  },

  {
    id: 3,
    name: 'University of Hong Kong',
    country: 'Hong Kong',
    city: 'Hong Kong',
    description:
      'A globally connected university offering international study opportunities across business, technology, health and social sciences.',
    image:
      'https://images.unsplash.com/photo-1536599018102-9f803c140fc1?auto=format&fit=crop&w=1200&q=80',
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
        name: 'Engineering',
        level: 'Undergraduate',
        category: 'Engineering',
      },
      {
        name: 'Finance',
        level: 'Postgraduate',
        category: 'Business',
      },
      {
        name: 'Data Science',
        level: 'Postgraduate',
        category: 'Technology',
      },
    ],
  },

  {
    id: 4,
    name: 'The University of Tokyo',
    country: 'Japan',
    city: 'Tokyo',
    description:
      'One of Asia’s leading universities, offering programmes across science, technology, engineering, business and social sciences.',
    image:
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80',
    programs: [
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
        name: 'Economics',
        level: 'Undergraduate',
        category: 'Business',
      },
      {
        name: 'Information Technology',
        level: 'Postgraduate',
        category: 'Technology',
      },
      {
        name: 'Engineering',
        level: 'Postgraduate',
        category: 'Engineering',
      },
    ],
  },

  {
    id: 5,
    name: 'Kyoto University',
    country: 'Japan',
    city: 'Kyoto',
    description:
      'A major Japanese research university with academic opportunities spanning technology, science, engineering, business and health.',
    image:
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    programs: [
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
        name: 'Biomedical Sciences',
        level: 'Postgraduate',
        category: 'Health',
      },
    ],
  },

  {
    id: 6,
    name: 'Seoul National University',
    country: 'South Korea',
    city: 'Seoul',
    description:
      'A leading South Korean university offering diverse academic opportunities in technology, engineering, business, science and social sciences.',
    image:
      'https://images.unsplash.com/photo-1538485399081-7c897b9f6e7b?auto=format&fit=crop&w=1200&q=80',
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
        name: 'Engineering',
        level: 'Undergraduate',
        category: 'Engineering',
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
    id: 7,
    name: 'University of Malaya',
    country: 'Malaysia',
    city: 'Kuala Lumpur',
    description:
      'A leading Malaysian university providing international students with study opportunities across business, technology, engineering and health.',
    image:
      'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80',
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
        name: 'Public Health',
        level: 'Postgraduate',
        category: 'Health',
      },
    ],
  },

  {
    id: 8,
    name: 'Hong Kong University of Science and Technology',
    country: 'Hong Kong',
    city: 'Hong Kong',
    description:
      'A technology-focused university with strong programmes in engineering, science, business and technology.',
    image:
      'https://images.unsplash.com/photo-1536599018102-9f803c140fc1?auto=format&fit=crop&w=1200&q=80',
    programs: [
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
        name: 'Business',
        level: 'Undergraduate',
        category: 'Business',
      },
      {
        name: 'Artificial Intelligence',
        level: 'Postgraduate',
        category: 'Technology',
      },
      {
        name: 'Finance',
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

function Asia() {
  const [search, setSearch] = useState('')
  const [country, setCountry] = useState('All')
  const [level, setLevel] = useState('All')
  const [category, setCategory] = useState('All')

  const countries = [
    'All',
    ...new Set(
      universities.map((university) => university.country)
    ),
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
          country === 'All' ||
          university.country === country

        const programs = university.programs.filter(
          (program) => {
            const matchesSearch =
              !searchTerm ||
              university.name
                .toLowerCase()
                .includes(searchTerm) ||
              university.city
                .toLowerCase()
                .includes(searchTerm) ||
              university.country
                .toLowerCase()
                .includes(searchTerm) ||
              program.name
                .toLowerCase()
                .includes(searchTerm)

            const matchesLevel =
              level === 'All' ||
              program.level === level

            const matchesCategory =
              category === 'All' ||
              program.category === category

            return (
              matchesSearch &&
              matchesLevel &&
              matchesCategory
            )
          }
        )

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
    <main className="asia-page">
      {/* HERO */}
      <section className="asia-hero">
        <div className="asia-hero__overlay" />

        <div className="asia-container asia-hero__content">
          <p className="asia-hero__eyebrow">
            🌏 STUDY IN ASIA
          </p>

          <h1>
            Find Your University in Asia
          </h1>

          <p className="asia-hero__description">
            Explore universities, programmes and study
            opportunities across Asia. Let Usben Consults
            help you find the right destination for your
            academic and career goals.
          </p>

          <a
            href="#asia-universities"
            className="asia-button asia-button--hero"
          >
            Explore Universities ↓
          </a>
        </div>
      </section>

      {/* INTRO */}
      <section className="asia-intro">
        <div className="asia-container asia-intro__grid">
          <div>
            <p className="asia-section__eyebrow">
              YOUR STUDY JOURNEY
            </p>

            <h2>
              Explore Your Future Across Asia
            </h2>
          </div>

          <div>
            <p>
              Asia is home to universities and
              institutions offering a wide range of
              academic opportunities for international
              students.
            </p>

            <p>
              From Singapore and Japan to South Korea,
              Malaysia and Hong Kong, you can explore
              destinations with programmes across
              business, technology, engineering, health
              and other fields.
            </p>
          </div>
        </div>
      </section>

      {/* SEARCH */}
      <section
        id="asia-universities"
        className="asia-search-section"
      >
        <div className="asia-container">
          <div className="asia-section-heading">
            <p className="asia-section__eyebrow">
              FIND YOUR PROGRAMME
            </p>

            <h2>
              Explore Asian Universities
            </h2>

            <p>
              Search by university, country, city or
              programme and filter your options according
              to your study level and area of interest.
            </p>
          </div>

          <div className="asia-filters">
            <div className="asia-search">
              <label htmlFor="asia-search">
                Search
              </label>

              <input
                id="asia-search"
                type="text"
                placeholder="Search university, city or programme..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />
            </div>

            <div className="asia-filter">
              <label htmlFor="asia-country">
                Country
              </label>

              <select
                id="asia-country"
                value={country}
                onChange={(event) =>
                  setCountry(event.target.value)
                }
              >
                {countries.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="asia-filter">
              <label htmlFor="asia-level">
                Study Level
              </label>

              <select
                id="asia-level"
                value={level}
                onChange={(event) =>
                  setLevel(event.target.value)
                }
              >
                {levels.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="asia-filter">
              <label htmlFor="asia-category">
                Study Area
              </label>

              <select
                id="asia-category"
                value={category}
                onChange={(event) =>
                  setCategory(event.target.value)
                }
              >
                {categories.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {filteredUniversities.length > 0 ? (
            <div className="asia-universities">
              {filteredUniversities.map(
                (university) => (
                  <article
                    className="asia-university"
                    key={university.id}
                  >
                    <div className="asia-university__image-wrap">
                      {/* <img
                        className="asia-university__image"
                        src={university.image}
                        alt={`${university.name} campus`}
                        loading="lazy"
                      /> */}
                    </div>

                    <div className="asia-university__body">
                      <div className="asia-university__location">
                        📍 {university.city},{' '}
                        {university.country}
                      </div>

                      <h3>{university.name}</h3>

                      <p className="asia-university__description">
                        {university.description}
                      </p>

                      <h4 className="asia-program-heading">
                        Popular Study Areas
                      </h4>

                      <div className="asia-programs">
                        {university.programs.map(
                          (program, index) => (
                            <div
                              className="asia-program"
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

                      <div className="asia-university__actions">
                        <a
                          href={`mailto:info@usbenconsults.com?subject=${encodeURIComponent(
                            `Asia University Application - ${university.name}`
                          )}`}
                          className="asia-button asia-button--primary"
                        >
                          Ask About Programmes
                        </a>

                        {/* <a
                          href={`mailto:info@usbenconsults.com?subject=${encodeURIComponent(
                            `Asia Programme Enquiry - ${university.name}`
                          )}`}
                          className="asia-button asia-button--secondary"
                        >
                          Ask About Programmes
                        </a> */}
                      </div>
                    </div>
                  </article>
                )
              )}
            </div>
          ) : (
            <div className="asia-no-results">
              <h3>
                No programmes found
              </h3>

              <p>
                Try changing your search, country,
                study level or study area.
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
      <section className="asia-how">
        <div className="asia-container">
          <div className="asia-section-heading">
            <p className="asia-section__eyebrow">
              HOW IT WORKS
            </p>

            <h2>
              How to Study in Asia
            </h2>

            <p>
              We can guide you through the major stages
              of your international study journey.
            </p>
          </div>

          <div className="asia-steps">
            <div className="asia-step">
              <span>01</span>

              <h3>
                Choose Your Destination
              </h3>

              <p>
                Explore Asian countries, universities
                and programmes that match your academic
                and career goals.
              </p>
            </div>

            <div className="asia-step">
              <span>02</span>

              <h3>
                Select Your Programme
              </h3>

              <p>
                Find a programme that matches your
                academic background, interests and
                future plans.
              </p>
            </div>

            <div className="asia-step">
              <span>03</span>

              <h3>
                Apply to Your University
              </h3>

              <p>
                Prepare your documents and submit your
                application to your chosen institution.
              </p>
            </div>

            <div className="asia-step">
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
      <section className="asia-cta">
        <div className="asia-container">
          <div className="asia-cta__content">
            <p className="asia-section__eyebrow">
              READY TO START?
            </p>

            <h2>
              Your Asian Study Journey Starts Here
            </h2>

            <p>
              Tell us where and what you want to study,
              and we will help you explore suitable
              university and programme options.
            </p>

            <a
              href="mailto:info@usbenconsults.com?subject=Asia%20Study%20Consultation"
              className="asia-button asia-button--cta"
            >
              Start Your Application
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Asia