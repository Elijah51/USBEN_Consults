import { useState } from 'react'
import { destinations } from '../data/data.js'

import Navbar from './Navbar'
import Footer from './Footer'

const FORMBOLD_URL = 'https://formbold.com/s/3KpLl'

const INITIAL_FORM = {
  fullName: '',
  email: '',
  phone: '',
  destination: '',
  program: '',
  message: '',
}

function validate(form) {
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

function Contact() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }

    if (submitError) {
      setSubmitError('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate the form first
    const validationErrors = validate(form)

    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    setSubmitting(true)
    setSubmitted(false)
    setSubmitError('')

    try {
      // Create FormBold submission data
      const formData = new FormData()

      formData.append('fullName', form.fullName)
      formData.append('email', form.email)
      formData.append('phone', form.phone)
      formData.append('destination', form.destination)
      formData.append('program', form.program)
      formData.append('message', form.message)

      // Email subject
      formData.append(
        'subject',
        `New Contact Enquiry from ${form.fullName}`
      )

      // Send to FormBold
      const response = await fetch(FORMBOLD_URL, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(
          'Your message could not be sent. Please try again.'
        )
      }

      // Successful submission
      setSubmitted(true)
      setForm(INITIAL_FORM)
      setErrors({})

      // Hide success message after 6 seconds
      setTimeout(() => {
        setSubmitted(false)
      }, 6000)

    } catch (error) {
      console.error('FormBold submission error:', error)

      setSubmitError(
        error.message ||
          'Something went wrong. Please try again.'
      )

    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      className="section contact"
    >

      <div className="container contact__grid">

        {/* =========================
            CONTACT INFORMATION
        ========================== */}
        <div className="contact__intro">

          <p className="section__eyebrow">
            Get In Touch
          </p>

          <h2 className="section__heading">
            Ready to Start Your Journey?
          </h2>

          <p className="contact__subheading">
            Talk to our education consultants today.
          </p>


          <ul className="contact__info-list">

            <li>

              <span className="contact__info-label">
                Phone
              </span>

              <a href="tel:+2348150994222">
                +2348150994222
              </a>

              <a href="tel:+2348100514784">
                +2348100514784
              </a>

            </li>


            <li>

              <span className="contact__info-label">
                Email
              </span>

              <a href="mailto:info@usbenconsults.com">
                info@usbenconsults.com
              </a>

              <a href="mailto:usbenconsults@gmail.com">
                usbenconsults@gmail.com
              </a>

            </li>


            <li>

              <span className="contact__info-label">
                Address
              </span>

              <span>
                No. 29b Wogu Street, opposite Mount Bethel
                Church, Port Harcourt, Rivers State,
                <br />
                500261 Nigeria
              </span>

            </li>

          </ul>


          <div
            className="contact__social"
            aria-label="Social media links"
          >

            <a
              href="https://web.facebook.com/profile.php?id=61566826940870"
              aria-label="Facebook"
            >
              f
            </a>

            <a
              href="#"
              aria-label="Instagram"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32">
              <path d="M10.202,2.098c-1.49,.07-2.507,.308-3.396,.657-.92,.359-1.7,.84-2.477,1.619-.776,.779-1.254,1.56-1.61,2.481-.345,.891-.578,1.909-.644,3.4-.066,1.49-.08,1.97-.073,5.771s.024,4.278,.096,5.772c.071,1.489,.308,2.506,.657,3.396,.359,.92,.84,1.7,1.619,2.477,.779,.776,1.559,1.253,2.483,1.61,.89,.344,1.909,.579,3.399,.644,1.49,.065,1.97,.08,5.771,.073,3.801-.007,4.279-.024,5.773-.095s2.505-.309,3.395-.657c.92-.36,1.701-.84,2.477-1.62s1.254-1.561,1.609-2.483c.345-.89,.579-1.909,.644-3.398,.065-1.494,.081-1.971,.073-5.773s-.024-4.278-.095-5.771-.308-2.507-.657-3.397c-.36-.92-.84-1.7-1.619-2.477s-1.561-1.254-2.483-1.609c-.891-.345-1.909-.58-3.399-.644s-1.97-.081-5.772-.074-4.278,.024-5.771,.096m.164,25.309c-1.365-.059-2.106-.286-2.6-.476-.654-.252-1.12-.557-1.612-1.044s-.795-.955-1.05-1.608c-.192-.494-.423-1.234-.487-2.599-.069-1.475-.084-1.918-.092-5.656s.006-4.18,.071-5.656c.058-1.364,.286-2.106,.476-2.6,.252-.655,.556-1.12,1.044-1.612s.955-.795,1.608-1.05c.493-.193,1.234-.422,2.598-.487,1.476-.07,1.919-.084,5.656-.092,3.737-.008,4.181,.006,5.658,.071,1.364,.059,2.106,.285,2.599,.476,.654,.252,1.12,.555,1.612,1.044s.795,.954,1.051,1.609c.193,.492,.422,1.232,.486,2.597,.07,1.476,.086,1.919,.093,5.656,.007,3.737-.006,4.181-.071,5.656-.06,1.365-.286,2.106-.476,2.601-.252,.654-.556,1.12-1.045,1.612s-.955,.795-1.608,1.05c-.493,.192-1.234,.422-2.597,.487-1.476,.069-1.919,.084-5.657,.092s-4.18-.007-5.656-.071M21.779,8.517c.002,.928,.755,1.679,1.683,1.677s1.679-.755,1.677-1.683c-.002-.928-.755-1.679-1.683-1.677,0,0,0,0,0,0-.928,.002-1.678,.755-1.677,1.683m-12.967,7.496c.008,3.97,3.232,7.182,7.202,7.174s7.183-3.232,7.176-7.202c-.008-3.97-3.233-7.183-7.203-7.175s-7.182,3.233-7.174,7.203m2.522-.005c-.005-2.577,2.08-4.671,4.658-4.676,2.577-.005,4.671,2.08,4.676,4.658,.005,2.577-2.08,4.671-4.658,4.676-2.577,.005-4.671-2.079-4.676-4.656h0"></path>
            </svg>
            </a>

            <a
              href="#"
              aria-label="LinkedIn"
            >
              in 
            </a>

            <a
              href="#"
              aria-label="X (Twitter)"
            >
              𝕏
            </a>
            <a
              href="https://www.tiktok.com/@usben_consults"
              aria-label="X (Tiktor)"
            >
              ᕷ
            </a>

          </div>

        </div>


        {/* =========================
            CONTACT FORM
        ========================== */}
        <form
          className="contact__form"
          onSubmit={handleSubmit}
          noValidate
        >

          {/* SUCCESS MESSAGE */}
          {submitted && (
            <div
              className="contact__success"
              role="status"
            >
              <strong>
                Thank you!
              </strong>

              <span>
                Your message has been sent successfully.
                An advisor will reach out shortly.
              </span>
            </div>
          )}


          {/* SUBMISSION ERROR */}
          {submitError && (
            <div
              className="contact__error"
              role="alert"
            >
              {submitError}
            </div>
          )}


          {/* =========================
              FULL NAME
          ========================== */}
          <div className="contact__field">

            <label htmlFor="fullName">
              Full Name
            </label>

            <input
              id="fullName"
              name="fullName"
              type="text"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Jane Doe"
            />

            {errors.fullName && (
              <span className="contact__error">
                {errors.fullName}
              </span>
            )}

          </div>


          {/* =========================
              EMAIL + PHONE
          ========================== */}
          <div className="contact__field-row">

            <div className="contact__field">

              <label htmlFor="email">
                Email Address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="jane@example.com"
              />

              {errors.email && (
                <span className="contact__error">
                  {errors.email}
                </span>
              )}

            </div>


            <div className="contact__field">

              <label htmlFor="phone">
                Phone Number
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="+234 800 000 0000"
              />

              {errors.phone && (
                <span className="contact__error">
                  {errors.phone}
                </span>
              )}

            </div>

          </div>


          {/* =========================
              DESTINATION + PROGRAM
          ========================== */}
          <div className="contact__field-row">

            <div className="contact__field">

              <label htmlFor="destination">
                Preferred Destination
              </label>

              <select
                id="destination"
                name="destination"
                value={form.destination}
                onChange={handleChange}
              >

                <option value="">
                  Select a destination
                </option>

                {destinations.map((d) => (
                  <option
                    key={d.id}
                    value={d.country}
                  >
                    {d.country}
                  </option>
                ))}

              </select>

              {errors.destination && (
                <span className="contact__error">
                  {errors.destination}
                </span>
              )}

            </div>


            <div className="contact__field">

              <label htmlFor="program">
                Preferred Program
              </label>

              <input
                id="program"
                name="program"
                type="text"
                value={form.program}
                onChange={handleChange}
                placeholder="e.g. Computer Science"
              />

              {errors.program && (
                <span className="contact__error">
                  {errors.program}
                </span>
              )}

            </div>

          </div>


          {/* =========================
              MESSAGE
          ========================== */}
          <div className="contact__field">

            <label htmlFor="message">
              Message
            </label>

            <textarea
              id="message"
              name="message"
              rows="4"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us about your study abroad goals..."
            />

            {errors.message && (
              <span className="contact__error">
                {errors.message}
              </span>
            )}

          </div>


          {/* =========================
              SUBMIT BUTTON
          ========================== */}
          <button
            type="submit"
            className="btn btn--primary btn--large contact__submit"
            disabled={submitting}
          >

            {submitting
              ? 'Sending...'
              : 'Send Message'}

          </button>

        </form>

      </div>

    </section>
  )
}

export default Contact