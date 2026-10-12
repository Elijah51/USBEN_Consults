import { useMemo, useState } from 'react'


const universities = [
  {
    id: 1,
    name: 'University of Melbourne',
    location: 'Melbourne, Victoria',
    description:
      'A globally recognised Australian university offering a wide range of undergraduate and postgraduate programmes across many disciplines.',
    programs: [
      {
        name: 'Computer Science',
        level: 'Undergraduate',
        category: 'Technology',
      },
      {
        name: 'Business Administration',
        level: 'Undergraduate',
        category: 'Business',
      },
      {
        name: 'Data Science',
        level: 'Postgraduate',
        category: 'Technology',
      },
      {
        name: 'Engineering',
        level: 'Undergraduate',
        category: 'Engineering',
      },
      {
        name: 'Public Health',
        level: 'Postgraduate',
        category: 'Health',
      },
    ],
  },

  {
    id: 2,
    name: 'University of Sydney',
    location: 'Sydney, New South Wales',
    description:
      'One of Australia’s leading universities, offering internationally respected programmes and a diverse student community.',
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
        name: 'Data Science',
        level: 'Postgraduate',
        category: 'Technology',
      },
      {
        name: 'Health Sciences',
        level: 'Postgraduate',
        category: 'Health',
      },
    ],
  },

  {
    id: 3,
    name: 'Monash University',
    location: 'Melbourne, Victoria',
    description:
      'A major Australian university known for research, innovation and a broad selection of programmes for international students.',
    programs: [
      {
        name: 'Information Technology',
        level: 'Undergraduate',
        category: 'Technology',
      },
      {
        name: 'Business',
        level: 'Undergraduate',
        category: 'Business',
      },
      {
        name: 'Engineering',
        level: 'Undergraduate',
        category: 'Engineering',
      },
      {
        name: 'Public Health',
        level: 'Postgraduate',
        category: 'Health',
      },
      {
        name: 'Finance',
        level: 'Postgraduate',
        category: 'Business',
      },
    ],
  },

  {
    id: 4,
    name: 'University of Queensland',
    location: 'Brisbane, Queensland',
    description:
      'A research-focused university with programmes across technology, engineering, business, health and other fields.',
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
        name: 'Business Management',
        level: 'Undergraduate',
        category: 'Business',
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
    name: 'Australian National University',
    location: 'Canberra, Australian Capital Territory',
    description:
      'A highly respected Australian university offering a strong academic environment and internationally recognised programmes.',
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
        name: 'International Relations',
        level: 'Undergraduate',
        category: 'Social Sciences',
      },
      {
        name: 'Data Analytics',
        level: 'Postgraduate',
        category: 'Technology',
      },
      {
        name: 'Business',
        level: 'Postgraduate',
        category: 'Business',
      },
    ],
  },

  {
    id: 6,
    name: 'University of Western Australia',
    location: 'Perth, Western Australia',
    description:
      'A leading university offering diverse study opportunities and a strong research environment for international students.',
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
        name: 'Health Sciences',
        level: 'Postgraduate',
        category: 'Health',
      },
      {
        name: 'International Relations',
        level: 'Postgraduate',
        category: 'Social Sciences',
      },
    ],
  },
]

const levels = [
  'All',
  'Undergraduate',
  'Postgraduate',
]

const categories = [
  'All',
  'Business',
  'Technology',
  'Engineering',
  'Health',
  'Social Sciences',
]

function Australia() {
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
          university.location.toLowerCase().includes(searchTerm) ||
          university.description.toLowerCase().includes(searchTerm)

        const programs = university.programs.filter((program) => {
          const matchesLevel =
            level === 'All' || program.level === level

          const matchesCategory =
            category === 'All' ||
            program.category === category

          const matchesSearch =
            !searchTerm ||
            program.name.toLowerCase().includes(searchTerm) ||
            program.category.toLowerCase().includes(searchTerm)

          return (
            matchesLevel &&
            matchesCategory &&
            matchesSearch
          )
        })

        if (
          searchTerm &&
          !universityMatches &&
          programs.length === 0
        ) {
          return null
        }

        return {
          ...university,
          programs,
        }
      })
      .filter(Boolean)
      .filter(
        (university) =>
          university.programs.length > 0
      )
  }, [search, level, category])

  const resetFilters = () => {
    setSearch('')
    setLevel('All')
    setCategory('All')
  }

  return (
    <div className="australia-page">

      {/* HERO */}
      <section className="australia-hero">
        <div className="australia-hero__overlay" />

        <div className="australia-hero__content">

          <span className="australia-hero__eyebrow">
            🇦🇺 STUDY IN AUSTRALIA
          </span>

          <h1>
            Find Your University
            <br />
            in Australia
          </h1>

          <p>
            Explore Australian universities and study
            programmes and discover opportunities that
            match your academic and career goals.
          </p>

          <a
            href="#australia-universities"
            className="australia-hero__button"
          >
            Explore Universities ↓
          </a>

        </div>
      </section>

      {/* SEARCH */}
      <section
        className="australia-search-section"
        id="australia-universities"
      >
        <div className="australia-container">

          <div className="australia-section-heading">

            <span>
              AUSTRALIAN UNIVERSITIES
            </span>

            <h2>
              Find the Right Programme
              <br />
              for Your Future
            </h2>

            <p>
              Search universities and explore programmes
              available across different fields of study.
            </p>

          </div>

          <div className="australia-filters">

            <div className="australia-search">

              <span>⌕</span>

              <input
                type="text"
                placeholder="Search university or programme..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />

            </div>

            <select
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
                  {item === 'All'
                    ? 'All Study Levels'
                    : item}
                </option>
              ))}
            </select>

            <select
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
                  {item === 'All'
                    ? 'All Fields'
                    : item}
                </option>
              ))}
            </select>

          </div>
        </div>
      </section>

      {/* UNIVERSITIES */}
      <section className="australia-universities">

        <div className="australia-container">

          {filteredUniversities.length > 0 ? (
            filteredUniversities.map(
              (university) => (
                <article
                  className="australia-university"
                  key={university.id}
                >

                  <div className="australia-university__image">
                    
                  </div>

                  <div className="australia-university__body">

                    <div className="australia-university__location">
                      📍 {university.location}
                    </div>

                    <h3>
                      {university.name}
                    </h3>

                    <p className="australia-university__description">
                      {university.description}
                    </p>

                    <div className="australia-program-heading">
                      Available Programmes
                    </div>

                    <div className="australia-programs">

                      {university.programs.map(
                        (program) => (
                          <div
                            className="australia-program"
                            key={`${university.id}-${program.name}`}
                          >

                            <div>
                              <strong>
                                {program.name}
                              </strong>

                              <span>
                                {program.category}
                              </span>
                            </div>

                            <small>
                              {program.level}
                            </small>

                          </div>
                        )
                      )}

                    </div>

                    <div className="australia-university__actions">

                      <a
                        href={`mailto:info@usbenconsults.com?subject=${encodeURIComponent(
                          `Australia University Application - ${university.name}`
                        )}`}
                        className="australia-button australia-button--primary"
                      >
                        Apply / Contact Us
                      </a>

                      <a
                        href={`mailto:info@usbenconsults.com?subject=${encodeURIComponent(
                          `Australia Programme Enquiry - ${university.name}`
                        )}`}
                        className="australia-button australia-button--secondary"
                      >
                        Ask About Programmes
                      </a>

                    </div>

                  </div>

                </article>
              )
            )
          ) : (
            <div className="australia-no-results">

              <h3>
                No programmes found
              </h3>

              <p>
                Try changing your search or selecting
                a different study level or field.
              </p>

              <button
                type="button"
                onClick={resetFilters}
              >
                Reset Filters
              </button>

            </div>
          )}

        </div>
      </section>

      {/* HOW TO STUDY */}
      <section className="australia-info">

        <div className="australia-container">

          <div className="australia-section-heading">

            <span>
              YOUR AUSTRALIA STUDY JOURNEY
            </span>

            <h2>
              How to Study
              <br />
              in Australia
            </h2>

            <p>
              Our team can guide you through the major
              steps involved in planning your Australian
              education journey.
            </p>

          </div>

          <div className="australia-info__grid">

            <div className="australia-info__card">
              <div className="australia-info__number">
                01
              </div>

              <h3>
                Choose Your Programme
              </h3>

              <p>
                Select a university and programme that
                matches your academic background and
                career goals.
              </p>
            </div>

            <div className="australia-info__card">
              <div className="australia-info__number">
                02
              </div>

              <h3>
                Check Requirements
              </h3>

              <p>
                Review the academic, English-language
                and other admission requirements for
                your chosen programme.
              </p>
            </div>

            <div className="australia-info__card">
              <div className="australia-info__number">
                03
              </div>

              <h3>
                Prepare Your Application
              </h3>

              <p>
                Prepare your documents and submit your
                application with guidance from our
                consultants.
              </p>
            </div>

            <div className="australia-info__card">
              <div className="australia-info__number">
                04
              </div>

              <h3>
                Plan Your Next Steps
              </h3>

              <p>
                Once your admission process progresses,
                we can help you understand the next
                steps in your journey.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* INTERNATIONAL STUDENTS */}
      {/* <section className="australia-student-section">

        <div className="australia-container">

          <div className="australia-student-card">

            <div>

              <span className="australia-student-card__eyebrow">
                FOR INTERNATIONAL STUDENTS
              </span>

              <h2>
                Start Planning Your
                <br />
                Australian Education
              </h2>

              <p>
                From choosing a programme to preparing
                your application, Usben Consults can help
                you understand the process and make
                informed decisions about studying in
                Australia.
              </p>

            </div>

            <a
              href="mailto:info@usbenconsults.com?subject=Australia%20Study%20Consultation"
              className="australia-button australia-button--light"
            >
              Speak With a Consultant →
            </a>

          </div>

        </div>
      </section> */}

      {/* CTA */}
      <section className="australia-cta">

        <div className="australia-container">

          <div className="australia-cta__content">

            <span>
              READY TO GET STARTED?
            </span>

            <h2>
              Your Australian Education
              <br />
              Journey Starts Here.
            </h2>

            <p>
              Tell us about your study goals and let
              our team help you find the right pathway.
            </p>

            <a
              href="mailto:info@usbenconsults.com?subject=Australia%20Study%20Consultation"
              className="australia-cta__button"
            >
              Book a Consultation →
            </a>

          </div>

        </div>
      </section>

    </div>
  )
}

export default Australia