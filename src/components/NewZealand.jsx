import { useMemo, useState } from 'react'


const universities = [
  {
    id: 1,
    name: 'University of Auckland',
    location: 'Auckland',
    description:
      'A leading New Zealand university offering a wide range of undergraduate and postgraduate study options for international students.',
    image:
      'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=1200&q=80',
    programs: [
      {
        name: 'Business and Management',
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
        name: 'Master of Business Administration',
        level: 'Postgraduate',
        category: 'Business',
      },
      {
        name: 'Master of Engineering',
        level: 'Postgraduate',
        category: 'Engineering',
      },
      {
        name: 'Master of Science',
        level: 'Postgraduate',
        category: 'Science',
      },
    ],
  },
  {
    id: 2,
    name: 'Auckland University of Technology',
    location: 'Auckland',
    description:
      'A modern university with practical, career-focused programmes across business, technology, health, engineering and other fields.',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
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
        name: 'Master of Business',
        level: 'Postgraduate',
        category: 'Business',
      },
      {
        name: 'Master of Computer and Information Sciences',
        level: 'Postgraduate',
        category: 'Technology',
      },
    ],
  },
  {
    id: 3,
    name: 'University of Otago',
    location: 'Dunedin',
    description:
      'One of New Zealand’s established universities, offering undergraduate and postgraduate study across a broad range of disciplines.',
    image:
      'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1200&q=80',
    programs: [
      {
        name: 'Business',
        level: 'Undergraduate',
        category: 'Business',
      },
      {
        name: 'Health Sciences',
        level: 'Undergraduate',
        category: 'Health',
      },
      {
        name: 'Computer Science',
        level: 'Undergraduate',
        category: 'Technology',
      },
      {
        name: 'Science',
        level: 'Undergraduate',
        category: 'Science',
      },
      {
        name: 'Master of Business',
        level: 'Postgraduate',
        category: 'Business',
      },
      {
        name: 'Master of Science',
        level: 'Postgraduate',
        category: 'Science',
      },
    ],
  },
  {
    id: 4,
    name: 'Victoria University of Wellington',
    location: 'Wellington',
    description:
      'A university in New Zealand’s capital city with study opportunities across business, technology, humanities, science and other disciplines.',
    image:
      'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80',
    programs: [
      {
        name: 'Business and Management',
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
        name: 'Science',
        level: 'Undergraduate',
        category: 'Science',
      },
      {
        name: 'Master of Business',
        level: 'Postgraduate',
        category: 'Business',
      },
      {
        name: 'Master of Science',
        level: 'Postgraduate',
        category: 'Science',
      },
    ],
  },
  {
    id: 5,
    name: 'University of Canterbury',
    location: 'Christchurch',
    description:
      'A research-focused university offering programmes across engineering, science, business, technology and other areas.',
    image:
      'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=80',
    programs: [
      {
        name: 'Civil Engineering',
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
        name: 'Science',
        level: 'Undergraduate',
        category: 'Science',
      },
      {
        name: 'Master of Engineering',
        level: 'Postgraduate',
        category: 'Engineering',
      },
      {
        name: 'Master of Computer Science',
        level: 'Postgraduate',
        category: 'Technology',
      },
    ],
  },
  {
    id: 6,
    name: 'Massey University',
    location: 'Auckland, Wellington & Palmerston North',
    description:
      'A multi-campus university offering a broad selection of programmes for students looking to study in New Zealand.',
    image:
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
    programs: [
      {
        name: 'Business',
        level: 'Undergraduate',
        category: 'Business',
      },
      {
        name: 'Information Technology',
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
        name: 'Master of Business',
        level: 'Postgraduate',
        category: 'Business',
      },
      {
        name: 'Master of Information Sciences',
        level: 'Postgraduate',
        category: 'Technology',
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
]

const levels = ['All', 'Undergraduate', 'Postgraduate']

function NewZealand() {
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
            category === 'All' || program.category === category

          return matchesSearch && matchesLevel && matchesCategory
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
    <main className="nz-page">
      {/* HERO */}
      <section className="nz-hero">
        <div className="nz-hero__overlay" />

        <div className="nz-container nz-hero__content">
          <p className="nz-hero__eyebrow">
            🇳🇿 STUDY IN NEW ZEALAND
          </p>

          <h1>Find Your University in New Zealand</h1>

          <p className="nz-hero__description">
            Explore universities, programmes and study opportunities in New
            Zealand. Let Usben Consults help you find the right pathway for
            your future.
          </p>

          <a href="#nz-universities" className="nz-button nz-button--hero">
            Explore Universities ↓
          </a>
        </div>
      </section>

      {/* INTRO */}
      <section className="nz-intro">
        <div className="nz-container nz-intro__grid">
          <div>
            <p className="nz-section__eyebrow">
              YOUR STUDY JOURNEY
            </p>

            <h2>
              Build Your Future in New Zealand
            </h2>
          </div>

          <div>
            <p>
              New Zealand offers international students a wide range of
              university options and qualifications. The official Study with
              New Zealand platform lists universities including the University
              of Auckland, Auckland University of Technology, University of
              Canterbury, Massey University, University of Otago and Victoria
              University of Wellington.
            </p>

            <p>
              At Usben Consults, we can help you explore suitable programmes,
              understand your application requirements and prepare for the
              next stage of your study journey.
            </p>
          </div>
        </div>
      </section>

      {/* SEARCH */}
      <section
        id="nz-universities"
        className="nz-search-section"
      >
        <div className="nz-container">
          <div className="nz-section-heading">
            <p className="nz-section__eyebrow">
              FIND YOUR PROGRAMME
            </p>

            <h2>Explore Universities & Programmes</h2>

            <p>
              Search by university, location or programme and filter your
              options according to your study level and area of interest.
            </p>
          </div>

          <div className="nz-filters">
            <div className="nz-search">
              <label htmlFor="nz-search">
                Search
              </label>

              <input
                id="nz-search"
                type="text"
                placeholder="Search university or programme..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            <div className="nz-filter">
              <label htmlFor="nz-level">
                Study Level
              </label>

              <select
                id="nz-level"
                value={level}
                onChange={(event) => setLevel(event.target.value)}
              >
                {levels.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="nz-filter">
              <label htmlFor="nz-category">
                Study Area
              </label>

              <select
                id="nz-category"
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
            <div className="nz-universities">
              {filteredUniversities.map((university) => (
                <article
                  className="nz-university"
                  key={university.id}
                >
                  <div className="nz-university__image-wrap">
                    {/* <img
                      className="nz-university__image"
                      src={university.image}
                      alt={`${university.name} campus`}
                      loading="lazy"
                    /> */}
                  </div>

                  <div className="nz-university__body">
                    <div className="nz-university__location">
                      📍 {university.location}
                    </div>

                    <h3>{university.name}</h3>

                    <p className="nz-university__description">
                      {university.description}
                    </p>

                    <h4 className="nz-program-heading">
                      Popular Study Areas
                    </h4>

                    <div className="nz-programs">
                      {university.programs.map(
                        (program, index) => (
                          <div
                            className="nz-program"
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

                    <div className="nz-university__actions">
                      <a
                        href={`mailto:info@usbenconsults.com?subject=${encodeURIComponent(
                          `New Zealand University Application - ${university.name}`
                        )}`}
                        className="nz-button nz-button--primary"
                      >
                        Ask About Programmes
                      </a>

                      {/* <a
                        href={`mailto:info@usbenconsults.com?subject=${encodeURIComponent(
                          `New Zealand Programme Enquiry - ${university.name}`
                        )}`}
                        className="nz-button nz-button--secondary"
                      >
                        Ask About Programmes
                      </a> */}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="nz-no-results">
              <h3>No programmes found</h3>

              <p>
                Try changing your search or selecting a different study
                level or study area.
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

      {/* HOW TO STUDY */}
      <section className="nz-how">
        <div className="nz-container">
          <div className="nz-section-heading">
            <p className="nz-section__eyebrow">
              HOW IT WORKS
            </p>

            <h2>How to Study in New Zealand</h2>

            <p>
              We can guide you through the major stages of your
              international study journey.
            </p>
          </div>

          <div className="nz-steps">
            <div className="nz-step">
              <span>01</span>
              <h3>Choose Your Programme</h3>
              <p>
                Explore universities and programmes that match your
                academic background and career goals.
              </p>
            </div>

            <div className="nz-step">
              <span>02</span>
              <h3>Prepare Your Documents</h3>
              <p>
                Prepare your academic documents and other supporting
                information required for your application.
              </p>
            </div>

            <div className="nz-step">
              <span>03</span>
              <h3>Apply to Your University</h3>
              <p>
                Submit your application and work towards receiving an
                offer of place from your chosen institution.
              </p>
            </div>

            <div className="nz-step">
              <span>04</span>
              <h3>Prepare for Your Journey</h3>
              <p>
                After receiving your offer, prepare for your visa,
                accommodation, travel and arrival in New Zealand.
              </p>
            </div>
          </div>
        </div>
      </section>

      
      {/* CTA */}
      <section className="nz-cta">
        <div className="nz-container">
          <div className="nz-cta__content">
            <p className="nz-section__eyebrow">
              READY TO START?
            </p>

            <h2>
              Your New Zealand Study Journey Starts Here
            </h2>

            <p>
              Tell us what you want to study and we will help you explore
              suitable university and programme options.
            </p>

            <a
              href="mailto:info@usbenconsults.com?subject=New%20Zealand%20Study%20Consultation"
              className="nz-button nz-button--cta"
            >
              Start Your Application
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

export default NewZealand