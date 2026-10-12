import { useMemo, useState } from "react"


const universities = [
  {
    id: 1,
    name: "The University of Manchester",
    location: "Manchester, England",
    description:
      "The University of Manchester offers undergraduate, postgraduate and research programmes across a wide range of academic disciplines and has a large international student community.",
    programs: [
      {
        name: "Computer Science",
        level: "Undergraduate",
        category: "Technology",
      },
      {
        name: "Business & Management",
        level: "Undergraduate",
        category: "Business",
      },
      {
        name: "Engineering",
        level: "Undergraduate",
        category: "Engineering",
      },
      {
        name: "Data Science",
        level: "Postgraduate",
        category: "Technology",
      },
      {
        name: "International Business",
        level: "Postgraduate",
        category: "Business",
      },
      {
        name: "Life Sciences",
        level: "Undergraduate",
        category: "Science",
      },
    ],
  },

  {
    id: 2,
    name: "University of Birmingham",
    location: "Birmingham, England",
    description:
      "The University of Birmingham is a Russell Group research university offering undergraduate and postgraduate study across business, engineering, computer science, law, health and other disciplines.",
    programs: [
      {
        name: "Computer Science",
        level: "Undergraduate",
        category: "Technology",
      },
      {
        name: "Artificial Intelligence",
        level: "Undergraduate",
        category: "Technology",
      },
      {
        name: "Business Management",
        level: "Undergraduate",
        category: "Business",
      },
      {
        name: "Mechanical Engineering",
        level: "Undergraduate",
        category: "Engineering",
      },
      {
        name: "International Business",
        level: "Postgraduate",
        category: "Business",
      },
      {
        name: "Law",
        level: "Undergraduate",
        category: "Law",
      },
    ],
  },

  {
    id: 3,
    name: "University of Leeds",
    location: "Leeds, England",
    description:
      "The University of Leeds is a Russell Group research university with undergraduate, Masters and postgraduate research opportunities for international students.",
    programs: [
      {
        name: "Computer Science",
        level: "Undergraduate",
        category: "Technology",
      },
      {
        name: "Business & Management",
        level: "Undergraduate",
        category: "Business",
      },
      {
        name: "Civil Engineering",
        level: "Undergraduate",
        category: "Engineering",
      },
      {
        name: "Data Science",
        level: "Postgraduate",
        category: "Technology",
      },
      {
        name: "International Business",
        level: "Postgraduate",
        category: "Business",
      },
      {
        name: "Architecture",
        level: "Undergraduate",
        category: "Architecture",
      },
    ],
  },

  {
    id: 4,
    name: "University of Nottingham",
    location: "Nottingham, England",
    description:
      "The University of Nottingham provides a broad range of undergraduate, postgraduate and research programmes across science, engineering, business, health, law and humanities.",
    programs: [
      {
        name: "Computer Science",
        level: "Undergraduate",
        category: "Technology",
      },
      {
        name: "Business Economics",
        level: "Undergraduate",
        category: "Business",
      },
      {
        name: "Electrical Engineering",
        level: "Undergraduate",
        category: "Engineering",
      },
      {
        name: "Artificial Intelligence",
        level: "Postgraduate",
        category: "Technology",
      },
      {
        name: "Finance",
        level: "Postgraduate",
        category: "Business",
      },
      {
        name: "Pharmacy",
        level: "Undergraduate",
        category: "Health",
      },
    ],
  },
]

function UnitedKingdom() {
  const [search, setSearch] = useState("")
  const [level, setLevel] = useState("All")
  const [category, setCategory] = useState("All")

  const filteredUniversities = useMemo(() => {
    const searchText = search.toLowerCase().trim()

    return universities
      .map((university) => {
        const matchingPrograms = university.programs.filter((program) => {
          const matchesSearch =
            !searchText ||
            university.name.toLowerCase().includes(searchText) ||
            program.name.toLowerCase().includes(searchText)

          const matchesLevel =
            level === "All" || program.level === level

          const matchesCategory =
            category === "All" || program.category === category

          return matchesSearch && matchesLevel && matchesCategory
        })

        const universityMatches =
          !searchText ||
          university.name.toLowerCase().includes(searchText)

        return {
          ...university,
          programs: universityMatches
            ? matchingPrograms.length
              ? matchingPrograms
              : university.programs
            : matchingPrograms,
        }
      })
      .filter((university) => university.programs.length > 0)
  }, [search, level, category])

  return (
    <div className="uk-page">

      {/* HERO */}
      <section className="uk-hero">
        <div className="uk-hero__overlay" />

        <div className="uk-hero__content">
          <span className="uk-hero__eyebrow">
            🇬🇧 STUDY IN THE UNITED KINGDOM
          </span>

          <h1>
            Find Your University
            <br />
            in the United Kingdom
          </h1>

          <p>
            Explore universities and study programmes across the UK
            and discover opportunities that match your academic goals.
          </p>

          <a href="#uk-universities" className="uk-hero__button">
            Explore Universities ↓
          </a>
        </div>
      </section>

      {/* UNIVERSITIES */}
      <section
        className="uk-search-section"
        id="uk-universities"
      >
        <div className="uk-container">

          <div className="uk-section-heading">
            <span>UK UNIVERSITIES</span>

            <h2>
              Explore Universities & Programmes
            </h2>

            <p>
              Search universities or programmes and filter your
              options by study level and field.
            </p>
          </div>

          {/* FILTERS */}
          <div className="uk-filters">

            <div className="uk-search">
              <input
                type="text"
                placeholder="Search university or programme..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="All">All Levels</option>
              <option value="Undergraduate">
                Undergraduate
              </option>
              <option value="Postgraduate">
                Postgraduate
              </option>
            </select>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="All">All Fields</option>
              <option value="Business">Business</option>
              <option value="Technology">Technology</option>
              <option value="Engineering">Engineering</option>
              <option value="Architecture">Architecture</option>
              <option value="Science">Science</option>
              <option value="Health">Health</option>
              <option value="Law">Law</option>
            </select>

          </div>

          {/* UNIVERSITY CARDS */}
          <div className="uk-universities">

            {filteredUniversities.length === 0 ? (

              <div className="uk-no-results">
                <h3>
                  No universities or programmes found
                </h3>

                <p>
                  Try another university, programme or field.
                </p>
              </div>

            ) : (

              filteredUniversities.map((university) => (

                <article
                  className="uk-university"
                  key={university.id}
                >

                  <div className="uk-university__image">

                    {/* <div className="uk-university__image-placeholder">
                      <span>🇬🇧</span>
                      <strong>{university.name}</strong>
                    </div>

                    <span className="uk-university__flag">
                      🇬🇧
                    </span> */}

                  </div>

                  <div className="uk-university__body">

                    <div className="uk-university__location">
                      📍 {university.location}
                    </div>

                    <h3>
                      {university.name}
                    </h3>

                    <p className="uk-university__description">
                      {university.description}
                    </p>

                    <div className="uk-program-heading">
                      <h4>
                        Available Programmes
                      </h4>

                      <span>
                        {university.programs.length} programmes
                      </span>
                    </div>

                    <div className="uk-programs">

                      {university.programs.map(
                        (program, index) => (

                          <div
                            className="uk-program"
                            key={`${university.id}-${index}`}
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

                    <div className="uk-university__actions">

                      <a
                        href={`mailto:info@usbenconsults.com?subject=${encodeURIComponent(
                          `UK University Application - ${university.name}`
                        )}`}
                        className="uk-button uk-button--primary"
                      >
                        Ask About Programmes
                      </a>
                      

                      {/* <a
                        href={`mailto:info@usbenconsults.com?subject=${encodeURIComponent(
                          `UK Programme Enquiry - ${university.name}`
                        )}`}
                        className="uk-button uk-button--secondary"
                      >
                        Ask About Programmes
                      </a> */}

                    </div>

                  </div>

                </article>

              ))

            )}

          </div>

        </div>
      </section>

      {/* UK STUDY INFORMATION */}
      <section className="uk-info">

        <div className="uk-container">

          <div className="uk-info__grid">

            <div>
              <span>WHY THE UK?</span>

              <h2>
                Start Your UK Education Journey
              </h2>

              <p>
                From undergraduate degrees to postgraduate study,
                the UK offers a wide range of academic pathways for
                international students.
              </p>
            </div>

            <div className="uk-info__cards">

              <div className="uk-info__card">
                <span>01</span>
                <h3>Choose a University</h3>
                <p>
                  Explore universities and find programmes
                  that match your academic goals.
                </p>
              </div>

              <div className="uk-info__card">
                <span>02</span>
                <h3>Choose a Programme</h3>
                <p>
                  Select the undergraduate or postgraduate
                  programme that suits your future plans.
                </p>
              </div>

              <div className="uk-info__card">
                <span>03</span>
                <h3>Apply With Us</h3>
                <p>
                  Get guidance with your application and
                  prepare for your international study journey.
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="uk-cta">

        <div className="uk-cta__content">

          <span>NEED HELP CHOOSING?</span>

          <h2>
            Let Us Help You Find
            <br />
            the Right UK University
          </h2>

          <p>
            Tell us your preferred course, study level and
            academic background and our team can help you
            identify suitable UK study options.
          </p>

          <a
            href="mailto:info@usbenconsults.com?subject=UK%20Study%20Consultation"
            className="uk-cta__button"
          >
            Speak With Us →
          </a>

        </div>

      </section>

    </div>
  )
}

export default UnitedKingdom