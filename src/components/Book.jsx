import { useState } from 'react'
import { destinations } from '../data/data.js'
// import './Book.css'

const FORM_BOLD_URL = 'https://formbold.com/s/3KpLl'

const INITIAL_BOOKING = {
  fullName: '',
  email: '',
  phone: '',
  destination: '',
  program: '',
  message: '',
}

function validateBooking(form) {
  const errors = {}

  if (!form.fullName.trim()) {
    errors.fullName = 'Please enter your full name.'
  }

  if (!form.email.trim()) {
    errors.email = 'Please enter your email address.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email address.'
  }

  if (!form.phone.trim()) {
    errors.phone = 'Please enter your phone number.'
  } else if (!/^[+()\-\s\d]{7,20}$/.test(form.phone)) {
    errors.phone = 'Please enter a valid phone number.'
  }

  if (!form.destination) {
    errors.destination = 'Please select a destination.'
  }

  if (!form.program.trim()) {
    errors.program = 'Please tell us your preferred program.'
  }

  if (!form.message.trim()) {
    errors.message = 'Please add a short message.'
  }

  return errors
}

function Book() {
  const [form, setForm] = useState(INITIAL_BOOKING)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }))

    if (errors[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: undefined,
      }))
    }

    if (submitError) {
      setSubmitError('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate form first
    const validationErrors = validateBooking(form)

    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    setSubmitting(true)
    setSubmitError('')
    setSubmitted(false)

    try {
      /*
        Send form data to FormBold
      */
      const formData = new FormData()

      formData.append('fullName', form.fullName)
      formData.append('email', form.email)
      formData.append('phone', form.phone)
      formData.append('destination', form.destination)
      formData.append('program', form.program)
      formData.append('message', form.message)

      // Optional subject for the email notification
      formData.append(
        'subject',
        `New Booking Request from ${form.fullName}`
      )

      const response = await fetch(FORM_BOLD_URL, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(
          'We could not submit your request. Please try again.'
        )
      }

      // Successful submission
      setSubmitted(true)
      setForm(INITIAL_BOOKING)
      setErrors({})

      // Hide success message after 6 seconds
      setTimeout(() => {
        setSubmitted(false)
      }, 6000)
    } catch (error) {
      console.error('Form submission error:', error)

      setSubmitError(
        error.message ||
          'Something went wrong. Please try again or contact us directly.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main id="book-page">

      {/* =========================
          BOOKING HERO
      ========================== */}
      <section id="book-hero" className="book-hero">

        <div className="book-container">

          <div className="book-hero-content">

            <span className="book-hero-label">
              START YOUR JOURNEY
            </span>

            <h1 className="book-hero-title">
              Book a Consultation
            </h1>

            <p className="book-hero-description">
              Tell us about your study abroad plans and our experienced
              consultants will help you take the next step.
            </p>

          </div>

        </div>

      </section>


      {/* =========================
          BOOKING FORM SECTION
      ========================== */}
      <section
        id="book-form-section"
        className="book-form-section"
      >

        <div className="book-container">

          <div className="book-layout">

            {/* =========================
                LEFT INFORMATION
            ========================== */}
            <div
              id="book-info"
              className="book-info"
            >

              <span className="book-section-label">
                BOOKING REQUEST
              </span>

              <h2 className="book-info-title">
                Let's Plan Your Future Together
              </h2>

              <p className="book-info-text">
                Complete the form and provide some information about
                your study abroad goals. Our team will review your
                request and get back to you.
              </p>


              <div className="book-benefits">

                <div className="book-benefit">

                  <div className="book-benefit-icon">
                    ✓
                  </div>

                  <div>
                    <h3>
                      Expert Guidance
                    </h3>

                    <p>
                      Get guidance from experienced education consultants.
                    </p>
                  </div>

                </div>


                <div className="book-benefit">

                  <div className="book-benefit-icon">
                    ✓
                  </div>

                  <div>
                    <h3>
                      Personalized Support
                    </h3>

                    <p>
                      Receive advice based on your academic goals.
                    </p>
                  </div>

                </div>


                <div className="book-benefit">

                  <div className="book-benefit-icon">
                    ✓
                  </div>

                  <div>
                    <h3>
                      Clear Next Steps
                    </h3>

                    <p>
                      Understand what you need to do to move forward.
                    </p>
                  </div>

                </div>

              </div>

            </div>


            {/* =========================
                BOOKING FORM
            ========================== */}
            <div
              id="book-form-wrapper"
              className="book-form-wrapper"
            >

              <form
                id="book-form"
                className="book-form"
                onSubmit={handleSubmit}
                noValidate
              >

                {/* SUCCESS MESSAGE */}
                {submitted && (
                  <div
                    id="book-success"
                    className="book-success"
                    role="status"
                  >
                    <strong>
                      Request Submitted Successfully!
                    </strong>

                    <span>
                      Thank you. Our advisor will contact you shortly.
                    </span>
                  </div>
                )}


                {/* ERROR MESSAGE */}
                {submitError && (
                  <div
                    className="book-error book-submit-error"
                    role="alert"
                  >
                    {submitError}
                  </div>
                )}


                {/* =========================
                    FULL NAME
                ========================== */}
                <div className="book-field">

                  <label htmlFor="book-full-name">
                    Full Name
                  </label>

                  <input
                    id="book-full-name"
                    name="fullName"
                    type="text"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                  />

                  {errors.fullName && (
                    <span className="book-error">
                      {errors.fullName}
                    </span>
                  )}

                </div>


                {/* =========================
                    EMAIL + PHONE
                ========================== */}
                <div className="book-field-row">

                  <div className="book-field">

                    <label htmlFor="book-email">
                      Email Address
                    </label>

                    <input
                      id="book-email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                    />

                    {errors.email && (
                      <span className="book-error">
                        {errors.email}
                      </span>
                    )}

                  </div>


                  <div className="book-field">

                    <label htmlFor="book-phone">
                      Phone Number
                    </label>

                    <input
                      id="book-phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+234 800 000 0000"
                    />

                    {errors.phone && (
                      <span className="book-error">
                        {errors.phone}
                      </span>
                    )}

                  </div>

                </div>


                {/* =========================
                    DESTINATION + PROGRAM
                ========================== */}
                <div className="book-field-row">

                  <div className="book-field">

                    <label htmlFor="book-destination">
                      Preferred Destination
                    </label>

                    <select
                      id="book-destination"
                      name="destination"
                      value={form.destination}
                      onChange={handleChange}
                    >

                      <option value="">
                        Select a destination
                      </option>

                      {destinations.map((destination) => (
                        <option
                          key={destination.id}
                          value={destination.country}
                        >
                          {destination.country}
                        </option>
                      ))}

                    </select>

                    {errors.destination && (
                      <span className="book-error">
                        {errors.destination}
                      </span>
                    )}

                  </div>


                  <div className="book-field">

                    <label htmlFor="book-program">
                      Preferred Program
                    </label>

                    <input
                      id="book-program"
                      name="program"
                      type="text"
                      value={form.program}
                      onChange={handleChange}
                      placeholder="e.g. Computer Science"
                    />

                    {errors.program && (
                      <span className="book-error">
                        {errors.program}
                      </span>
                    )}

                  </div>

                </div>


                {/* =========================
                    MESSAGE
                ========================== */}
                <div className="book-field">

                  <label htmlFor="book-message">
                    Tell Us About Your Plans
                  </label>

                  <textarea
                    id="book-message"
                    name="message"
                    rows="6"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your study abroad goals, preferred course, questions or anything else we should know..."
                  />

                  {errors.message && (
                    <span className="book-error">
                      {errors.message}
                    </span>
                  )}

                </div>


                {/* =========================
                    SUBMIT BUTTON
                ========================== */}
                <button
                  id="book-submit"
                  type="submit"
                  className="book-submit"
                  disabled={submitting}
                >

                  <span>
                    {submitting
                      ? 'Submitting...'
                      : 'Submit Booking Request'}
                  </span>

                  {!submitting && (
                    <span className="book-submit-arrow">
                      →
                    </span>
                  )}

                </button>

              </form>

            </div>

          </div>

        </div>

      </section>

    </main>
  )
}

export default Book