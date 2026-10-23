import { useMemo, useState } from 'react'
import SEO from '../components/SEO';

const universities = [
  {
    id: 1,
    name: 'University of Toronto',
    location: 'Toronto, Ontario',
    description:
      'A globally recognised university offering a wide range of undergraduate and postgraduate programmes across many disciplines.',
    programs: [
      { name: 'Computer Science', level: 'Undergraduate', category: 'Technology' },
      { name: 'Business Administration', level: 'Undergraduate', category: 'Business' },
      { name: 'Data Science', level: 'Postgraduate', category: 'Technology' },
      { name: 'Engineering', level: 'Undergraduate', category: 'Engineering' },
      { name: 'Public Health', level: 'Postgraduate', category: 'Health' },
    ],
  },
  {
    id: 2,
    name: 'University of British Columbia',
    location: 'Vancouver, British Columbia',
    description:
      'A leading Canadian university known for innovative research, diverse programmes and an outstanding student experience.',
    programs: [
      { name: 'Computer Science', level: 'Undergraduate', category: 'Technology' },
      { name: 'Business', level: 'Undergraduate', category: 'Business' },
      { name: 'Engineering', level: 'Undergraduate', category: 'Engineering' },
      { name: 'International Relations', level: 'Postgraduate', category: 'Social Sciences' },
      { name: 'Data Science', level: 'Postgraduate', category: 'Technology' },
    ],
  },
  {
    id: 3,
    name: 'McGill University',
    location: 'Montreal, Quebec',
    description:
      'One of Canada’s best-known universities, offering internationally respected programmes in a wide variety of fields.',
    programs: [
      { name: 'Computer Science', level: 'Undergraduate', category: 'Technology' },
      { name: 'Management', level: 'Undergraduate', category: 'Business' },
      { name: 'Engineering', level: 'Undergraduate', category: 'Engineering' },
      { name: 'Public Health', level: 'Postgraduate', category: 'Health' },
      { name: 'Finance', level: 'Postgraduate', category: 'Business' },
    ],
  },
  {
    id: 4,
    name: 'University of Alberta',
    location: 'Edmonton, Alberta',
    description:
      'A research-intensive Canadian university with programmes spanning technology, engineering, business, health and more.',
    programs: [
      { name: 'Engineering', level: 'Undergraduate', category: 'Engineering' },
      { name: 'Computer Science', level: 'Undergraduate', category: 'Technology' },
      { name: 'Business Administration', level: 'Undergraduate', category: 'Business' },
      { name: 'Artificial Intelligence', level: 'Postgraduate', category: 'Technology' },
      { name: 'Public Health', level: 'Postgraduate', category: 'Health' },
    ],
  },
  {
    id: 5,
    name: 'University of Waterloo',
    location: 'Waterloo, Ontario',
    description:
      'A highly respected institution particularly known for technology, engineering, mathematics and career-focused education.',
    programs: [
      { name: 'Computer Science', level: 'Undergraduate', category: 'Technology' },
      { name: 'Software Engineering', level: 'Undergraduate', category: 'Technology' },
      { name: 'Engineering', level: 'Undergraduate', category: 'Engineering' },
      { name: 'Business Administration', level: 'Undergraduate', category: 'Business' },
      { name: 'Data Science', level: 'Postgraduate', category: 'Technology' },
    ],
  },
  {
    id: 6,
    name: 'York University',
    location: 'Toronto, Ontario',
    description:
      'A diverse university offering a broad selection of undergraduate and postgraduate programmes for international students.',
    programs: [
      { name: 'Business Administration', level: 'Undergraduate', category: 'Business' },
      { name: 'Computer Science', level: 'Undergraduate', category: 'Technology' },
      { name: 'International Relations', level: 'Undergraduate', category: 'Social Sciences' },
      { name: 'Finance', level: 'Postgraduate', category: 'Business' },
      { name: 'Health Studies', level: 'Postgraduate', category: 'Health' },
    ],
  },
]

const levels = ['All', 'Undergraduate', 'Postgraduate']

const categories = [
  'All',
  'Business',
  'Technology',
  'Engineering',
  'Health',
  'Social Sciences',
]

function Canada() {

  <SEO
  title="Study in Canada | Usben Consults"
  description="Explore opportunities to study in Canada, including university admissions information and guidance for international students."
  path="/destinations/canada"
/>

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
            category === 'All' || program.category === category

          const matchesSearch =
            !searchTerm ||
            program.name.toLowerCase().includes(searchTerm) ||
            program.category.toLowerCase().includes(searchTerm)

          return matchesLevel && matchesCategory && matchesSearch
        })

        if (searchTerm && !universityMatches && programs.length === 0) {
          return null
        }

        return {
          ...university,
          programs,
        }
      })
      .filter(Boolean)
      .filter((university) => university.programs.length > 0)
  }, [search, level, category])

  return (
    <div className="canada-page">

      {/* HERO */}
      <section className="canada-hero">
        <div className="canada-hero__overlay" />

        <div className="canada-hero__content">
          <span className="canada-hero__eyebrow">
            🇨🇦 STUDY IN CANADA
          </span>

          <h1>
            Find Your University
            <br />
            in Canada
          </h1>

          <p>
            Explore Canadian universities and study programmes
            and discover an education pathway that matches
            your academic and career goals.
          </p>

          <a
            href="#canada-universities"
            className="canada-hero__button"
          >
            Explore Universities ↓
          </a>
        </div>
      </section>

      {/* SEARCH */}
      <section
        className="canada-search-section"
        id="canada-universities"
      >
        <div className="canada-container">

          <div className="canada-section-heading">
            <span>CANADIAN UNIVERSITIES</span>

            <h2>
              Find the Right Programme
              <br />
              for Your Future
            </h2>

            <p>
              Search universities and explore programmes
              available in different fields of study.
            </p>
          </div>

          <div className="canada-filters">

            <div className="canada-search">
              <span>⌕</span>

              <input
                type="text"
                placeholder="Search university or programme..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            <select
              value={level}
              onChange={(event) => setLevel(event.target.value)}
            >
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
        </div>
      </section>

      {/* UNIVERSITIES */}
      <section className="canada-universities">
        <div className="canada-container">

          {filteredUniversities.length > 0 ? (
            filteredUniversities.map((university) => (
              <article
                className="canada-university"
                key={university.id}
              >

                <div className="canada-university__image">
                  
                </div>

                <div className="canada-university__body">

                  <div className="canada-university__location">
                    📍 {university.location}
                  </div>

                  <h3>{university.name}</h3>

                  <p className="canada-university__description">
                    {university.description}
                  </p>

                  <div className="canada-program-heading">
                    Available Programmes
                  </div>

                  <div className="canada-programs">
                    {university.programs.map((program) => (
                      <div
                        className="canada-program"
                        key={`${university.id}-${program.name}`}
                      >
                        <div>
                          <strong>{program.name}</strong>
                          <span>{program.category}</span>
                        </div>

                        <small>{program.level}</small>
                      </div>
                    ))}
                  </div>

                  <div className="canada-university__actions">

                    <a
                      href={`mailto:info@usbenconsults.com?subject=${encodeURIComponent(
                        `Canada University Application - ${university.name}`
                      )}`}
                      className="canada-button canada-button--primary"
                    >
                      Ask About Programmes
                    </a>

                    {/* <a
                      href={`mailto:info@usbenconsults.com?subject=${encodeURIComponent(
                        `Canada Programme Enquiry - ${university.name}`
                      )}`}
                      className="canada-button canada-button--secondary"
                    >
                      Ask About Programmes
                    </a> */}

                  </div>

                </div>
              </article>
            ))
          ) : (
            <div className="canada-no-results">
              <h3>No programmes found</h3>
              <p>
                Try changing your search or selecting a different
                study level or field.
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

      {/* INFORMATION */}
      <section className="canada-info">
        <div className="canada-container">

          <div className="canada-section-heading">
            <span>YOUR CANADA STUDY JOURNEY</span>

            <h2>
              How to Study
              <br />
              in Canada
            </h2>

            <p>
              Our team can guide you through the major steps
              involved in planning your Canadian education journey.
            </p>
          </div>

          <div className="canada-info__grid">

            <div className="canada-info__card">
              <div className="canada-info__number">01</div>
              <h3>Choose Your Programme</h3>
              <p>
                Select a university and programme that matches
                your academic background and career goals.
              </p>
            </div>

            <div className="canada-info__card">
              <div className="canada-info__number">02</div>
              <h3>Check Requirements</h3>
              <p>
                Review academic, English-language and other
                admission requirements for your chosen programme.
              </p>
            </div>

            <div className="canada-info__card">
              <div className="canada-info__number">03</div>
              <h3>Prepare Your Application</h3>
              <p>
                Prepare your documents and submit your application
                with guidance from our consultants.
              </p>
            </div>

            <div className="canada-info__card">
              <div className="canada-info__number">04</div>
              <h3>Plan Your Next Steps</h3>
              <p>
                Once your admission process progresses, we can
                help you understand the next steps in your journey.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* STUDENT INFORMATION */}
      <section className="canada-student-section">
        <div className="canada-container">

          <div className="canada-student-card">

            {/* <div>
              <span className="canada-student-card__eyebrow">
                FOR INTERNATIONAL STUDENTS
              </span>

              <h2>
                Start Planning Your
                <br />
                Canadian Education
              </h2>

              <p>
                From choosing a programme to preparing your
                application, Usben Consults can help you understand
                the process and make informed decisions about
                studying in Canada.
              </p>
            </div>

            <a
              href="mailto:info@usbenconsults.com?subject=Canada%20Study%20Consultation"
              className="canada-button canada-button--light"
            >
              Speak With a Consultant →
            </a> */}

          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="canada-cta">
        <div className="canada-container">

          <div className="canada-cta__content">

            <span>READY TO GET STARTED?</span>

            <h2>
              Your Canadian Education
              <br />
              Journey Starts Here.
            </h2>

            <p>
              Tell us about your study goals and let our team
              help you find the right pathway.
            </p>

            <a
              href="mailto:info@usbenconsults.com?subject=Canada%20Study%20Consultation"
              className="canada-cta__button"
            >
              Book a Consultation →
            </a>

          </div>

        </div>
      </section>

    </div>
  )
}

export default Canada